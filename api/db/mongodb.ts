import { Db, MongoClient, MongoClientOptions } from 'mongodb';

import { config } from '@api/config';

class Mongo {
  public db: Db;

  private indexes: { collection: string; index: any }[] = [];
  private promises: any[] = [];

  public constructor() {
    this.init();
  }

  public async init() {
    const url = config.mongo.srv
      ? config.mongo.srv
      : config.mongo.user
      ? `mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.host}:${config.mongo.port}`
      : `mongodb://${config.mongo.host}:${config.mongo.port}`;

    const clientConfig: MongoClientOptions = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
    };

    try {
      const client = await MongoClient.connect(url, clientConfig);

      console.debug('MongoDB client connected');
      this.db = client.db(config.mongo.database);

      this.indexes.forEach(({ collection, index }) => {
        this.db.collection(collection).createIndex(index);
      });
      this.promises.forEach(resolve => resolve());
    } catch (e) {
      console.warn('MongoDB client connect failed. Retrying...');
      // console.warn(e);
      await sleep(1500);
      this.init();
    }
  }

  public addIndex(collection: string, index: any) {
    this.indexes.push({ collection, index });
  }
  public async waitReady() {
    if (this.db) {
      return Promise.resolve();
    }
    return new Promise(resolve => this.promises.push(resolve));
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mongo = new Mongo();
