import * as Influx from 'influx';
import { config } from '@api/config';

class InfluxDb {
  public db = new Influx.InfluxDB({
    host: config.influxDb.host,
    database: config.influxDb.database,
    schema: [
      {
        measurement: 'status_checks',
        fields: {
          website: Influx.FieldType.STRING,
          isAlive: Influx.FieldType.BOOLEAN,
          duration: Influx.FieldType.FLOAT,
          location: Influx.FieldType.STRING,
        },
        tags: ['host'],
      },
    ],
  });

  public constructor() {
    this.db.createDatabase(config.influxDb.database);
  }
}

export const influxDb = new InfluxDb();
