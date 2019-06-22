import { influxDb } from '@api/db/influxdb';

interface HealthCheckStatus {
  website: string;
  location: string;
  isAlive: boolean;
  duration?: number;
  time?: string;
}

export const getHealthcheckStatus = async (websiteId: string): Promise<HealthCheckStatus[]> => {
  return influxDb.db.query(`
   select * from status_checks
   where website = '${websiteId}'
   order by time desc
   limit 100
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
