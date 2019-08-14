import { influxDb } from '@api/db/influxdb';
import { HealthCheckStatusFields, HealthCheckStatusTags } from '@common/models/healthcheck-status';

export const getHealthcheckStatus = async (websiteId: string): Promise<HealthCheckStatusFields[]> => {
  return influxDb.db.query(`
   select count("duration") as count, mean("duration") as "duration", sum("isAlive") as isAlive from status_checks
   where websiteId = '${websiteId}' and time > now() - 18h
   group by time(1m), *fill(0)
   order by time desc
   LIMIT 10
   `);
};

export const getLastHealthcheckStatus = async (websiteId: string): Promise<HealthCheckStatusFields> => {
  const results = await influxDb.db.query(`
  select * from status_checks
  where websiteId = '${websiteId}'
  order by time desc
  limit 1
 `);
  return results && (results[0] as HealthCheckStatusFields);
};

export const getLastFailedHealthcheckStatus = async (websiteId: string): Promise<HealthCheckStatusFields> => {
  const results = await influxDb.db.query(`
  select * from status_checks
  where websiteId = '${websiteId}' and isAlive = 0
  order by time desc
  limit 1
 `);
  return results && (results[0] as HealthCheckStatusFields);
};

export const getFirstHealthcheckStatus = async (websiteId: string): Promise<HealthCheckStatusFields> => {
  const results = await influxDb.db.query(`
  select * from status_checks
  where websiteId = '${websiteId}'
  order by time asc
  limit 1
 `);
  return results && (results[0] as HealthCheckStatusFields);
};

export const writeHealthcheckStatus = async (
  fields: HealthCheckStatusFields,
  tags: HealthCheckStatusTags,
): Promise<void> => {
  await influxDb.db.writePoints([
    {
      measurement: 'status_checks',
      fields,
      tags,
    },
  ]);
};
