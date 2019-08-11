import * as Influx from 'influx';
import { config } from '@api/config';

class InfluxDb {
  public db = new Influx.InfluxDB({
    host: config.influxDb.host,
    database: config.influxDb.database,
    schema: [
      {
        measurement: 'statusChecks',
        fields: {
          isAlive: Influx.FieldType.INTEGER,
          duration: Influx.FieldType.FLOAT,
        },
        tags: ['websiteId', 'zoneId'],
      },
    ],
  });

  public constructor() {
    this.db.createDatabase(config.influxDb.database);
  }
}

export const influxDb = new InfluxDb();
