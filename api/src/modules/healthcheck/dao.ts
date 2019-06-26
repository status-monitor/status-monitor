import { influxDb } from '@api/db/influxdb';
import { HealthCheckStatus } from '@common/models/healthcheck-status';

export const getHealthcheckStatus = async (websiteId: string): Promise<HealthCheckStatus[]> => {
  // SELECT sum(“bytes_per_5min”)*8/300 as ‘bitrate’ FROM “SomeMeasurement” WHERE $timeFilter GROUP BY time(5m),“device” fill(null)
  return influxDb.db.query(`
   select count("duration") as count, mean("duration") as "duration", sum("isAlive") as isAlive from status_checks
   where website = '${websiteId}' and time > now() - 18h
   group by time(1m)
   order by time desc
   LIMIT 10
   `);
};

export const getLastHealthcheckStatus = async (websiteId: string): Promise<HealthCheckStatus> => {
  const results = await influxDb.db.query(`
  select * from status_checks
  where website = '${websiteId}'
  order by time desc
  limit 1
 `);
  return results && (results[0] as HealthCheckStatus);
};

export const getLastFailedHealthcheckStatus = async (websiteId: string): Promise<HealthCheckStatus> => {
  const results = await influxDb.db.query(`
  select * from status_checks
  where website = '${websiteId}' and isAlive = false
  order by time desc
  limit 1
 `);
  return results && (results[0] as HealthCheckStatus);
};

export const getFirstHealthcheckStatus = async (websiteId: string): Promise<HealthCheckStatus> => {
  const results = await influxDb.db.query(`
  select * from status_checks
  where website = '${websiteId}'
  order by time asc
  limit 1
 `);
  return results && (results[0] as HealthCheckStatus);
};

export const writeHealthcheckStatus = (fields: HealthCheckStatus) => {
  influxDb.db.writePoints([
    {
      measurement: 'status_checks',
      fields,
    },
  ]);
};
