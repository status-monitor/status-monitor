import { ConsumeMessage } from 'amqplib';
import { rabbitMQ } from '@api/db/rabbitmq';
import { findOneWebsiteById, patchOneWebsite } from '@api/modules/websites/dao';
import { checkWebsite } from '@api/modules/healthcheck/services';
import { notifyStatusChange } from '@api/modules/notify/service';
import { findOneScenarioById } from '@api/modules/scenarios/dao';
import moment from 'moment';
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
        const scenario = await findOneScenarioById(website.scenarioId);
        if (!scenario || moment().unix() % scenario.interval !== 0) {
          return;
        }
        const isAliveCalls = await Promise.all(scenario.zones.map(zone => checkWebsite(website, zone)));
        const isAlive = isAliveCalls.every(call => call === true);
        let reason: string;
        if (!isAlive) {
          reason = isAliveCalls.find(call => call !== true) as string;
        }
        if (website.isAlive !== isAlive) {
          patchOneWebsite(website._id, {
            isAlive,
          });
          notifyStatusChange(isAlive, website, reason);
        }
      };

      findAndCheckWebsite();
      const interval = setInterval(findAndCheckWebsite, 1000);
    },
  );

  console.debug(`Worker started`);
};

export const loadWebsiteIntervalWatcher = async (): Promise<void> => {
  rabbitMQ.onReconnect(() => listen());

  await rabbitMQ.waitReady();
  listen();
};

export const sendWebsiteIntervalToQueue = async (websiteId: string): Promise<boolean> => {
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
