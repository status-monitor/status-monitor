import { ConsumeMessage } from 'amqplib';
import { rabbitMQ } from '@api/db/rabbitmq';
import { findOneWebsiteById } from '@api/modules/websites/dao';
import { checkWebsite } from '@api/modules/healthcheck/services';
// import { findOneBuildById } from '@api/modules/builds/dao';
// import { continueWorkflow } from '@api/modules/builds/service';

export const watchWebsiteIntervalQueueName = 'websiteInterval';

export const assertQueue = async () => {
  await rabbitMQ.db.assertQueue(watchWebsiteIntervalQueueName, { durable: true });
};

const listen = async () => {
  await assertQueue();

  rabbitMQ.db.consume(watchWebsiteIntervalQueueName, async (message: ConsumeMessage) => {
    const content = JSON.parse(message.content.toString('utf-8'));

    const findAndCheckWebsite = async () => {
      const website = await findOneWebsiteById(content.websiteId);
      if (!website) {
        rabbitMQ.db.ack(message);
        clearInterval(interval);
        return;
      }
      checkWebsite(website);
    };

    findAndCheckWebsite();
    const interval = setInterval(findAndCheckWebsite, 10000);
  });

  console.debug(`Worker started`);
};

export const loadWebsiteIntervalWatcher = async () => {
  rabbitMQ.onReconnect(() => listen());

  await rabbitMQ.waitReady();
  listen();
};

export const sendWebsiteIntervalToQueue = async (websiteId: string) => {
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
