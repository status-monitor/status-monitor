import { ConsumeMessage } from 'amqplib';
import { rabbitMQ } from '@api/db/rabbitmq';
import { findOneWebsiteById, patchOneWebsite } from '@api/modules/websites/dao';
import { checkWebsite } from '@api/modules/healthcheck/services';
import { notifyStatusChange } from '@api/modules/notify/service';
// import { findOneBuildById } from '@api/modules/builds/dao';
// import { continueWorkflow } from '@api/modules/builds/service';

export const watchWebsiteIntervalQueueName = 'websiteInterval';

export const assertQueue = async (): Promise<void> => {
  await rabbitMQ.db.assertQueue(watchWebsiteIntervalQueueName, { durable: true });
};

const listen = async (): Promise<void> => {
  await assertQueue();

  rabbitMQ.db.consume(
    watchWebsiteIntervalQueueName,
    async (message: ConsumeMessage): Promise<void> => {
      const content = JSON.parse(message.content.toString('utf-8'));

      const findAndCheckWebsite = async (): Promise<void> => {
        const website = await findOneWebsiteById(content.websiteId);
        if (!website) {
          rabbitMQ.db.ack(message);
          clearInterval(interval);
          return;
        }
        const isAlive = await checkWebsite(website);
        if (website.isAlive !== isAlive) {
          patchOneWebsite(website._id, {
            isAlive,
          });
          notifyStatusChange(isAlive, website);
        }
      };

      findAndCheckWebsite();
      const interval = setInterval(findAndCheckWebsite, 10000);
    },
  );

  console.debug(`Worker started`);
};

export const loadWebsiteIntervalWatcher = async (): Promise<void> => {
  rabbitMQ.onReconnect(() => listen());

  await rabbitMQ.waitReady();
  listen();
};

export const sendWebsiteIntervalToQueue = async (websiteId: string): Promise<bollean> => {
  return rabbitMQ.db.sendToQueue(
    watchWebsiteIntervalQueueName,
    Buffer.from(
      JSON.stringify({
        websiteId,
      }),
    ),
    {
      persistent: true,
    },
  );
};
