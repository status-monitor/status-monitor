import amqplib from 'amqplib';
import { config } from '@api/config';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class RabbitMQ {
  public db: amqplib.Channel;

  private isConnected: boolean = false;
  private promises: any[] = [];
  private reconnectCb: any[] = [];

  public constructor() {
    this.init();
  }

  public async init(firstConnection = true) {
    try {
      const url = `amqp://${config.rabbitmq.user}:${config.rabbitmq.password}@${config.rabbitmq.host}:${config.rabbitmq.port}`;

      const connection = await amqplib.connect(url);
      connection.on('error', async (err: Error) => {
        this.isConnected = false;
        console.error(err);
        await sleep(1500);
        this.init(false);
      });

      this.db = await connection.createChannel();
      // this.db.prefetch(5);
      this.isConnected = true;

      console.debug('RabbitMQ connected');

      this.promises.forEach(resolve => resolve());
      if (!firstConnection) {
        this.reconnectCb.forEach(cb => cb());
      }
    } catch (e) {
      console.warn('RabbitMQ client connect failed. Retrying...');
      await sleep(1500);
      this.init(firstConnection);
    }
  }

  public onReconnect(cb: (...args: any[]) => void) {
    this.reconnectCb.push(cb);
  }

  public async waitReady() {
    if (this.isConnected) {
      return Promise.resolve();
    }
    return new Promise(resolve => this.promises.push(resolve));
  }
}

export const rabbitMQ = new RabbitMQ();
