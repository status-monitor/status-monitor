interface Config {
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
  influxDb: {
    database: 'db32',
    host: 'localhost',
  },
  rabbitmq: {
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: process.env.RABBITMQ_PORT ? Number(process.env.RABBITMQ_PORT) : 5672,
    user: process.env.RABBITMQ_USER || 'guest',
    password: process.env.RABBITMQ_PASSWORD || 'guest',
  },
  mongo: {
    srv: process.env.MONGO_SRV,
    host: process.env.MONGO_HOST || 'localhost',
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    database: process.env.MONGO_DB || 'default',
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  },
};
