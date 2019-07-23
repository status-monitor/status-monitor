interface Config {
  encryptionKey: string;
  app: {
    env: string;
  };
  rabbitmq: {
    host: string;
    port: number;
    user: string;
    password: string;
  };
  mongo: {
    srv?: string;
    host: string;
    port: number;
    database: string;
    user?: string;
    password?: string;
  };
  influxDb: {
    host: string;
    database: string;
  };
}

export const config: Config = {
  app: {
    env: process.env.ENV || 'development',
  },
  encryptionKey: process.env.ENCRYPTION_KEY || 'jN8JTgTii_!HRQWqyDT*rCaK6r.dXXpp',
  influxDb: {
    database: 'checks',
    host: 'localhost',
  },
  rabbitmq: {
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: process.env.RABBITMQ_PORT ? Number(process.env.RABBITMQ_PORT) : 5673,
    user: process.env.RABBITMQ_USER || 'guest',
    password: process.env.RABBITMQ_PASSWORD || 'guest',
  },
  mongo: {
    srv: process.env.MONGO_SRV,
    host: process.env.MONGO_HOST || 'localhost',
    port: parseInt(process.env.MONGO_PORT, 10) || 27018,
    database: process.env.MONGO_DB || 'default',
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  },
};
