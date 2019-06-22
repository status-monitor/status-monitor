import { insertOneWebsite } from './dao';
import { sendWebsiteIntervalToQueue } from '@api/queue/website-interval';
import { Website } from '@common/models/website';

export const createWebsite = async (website: Website) => {
  const result = await insertOneWebsite(website);
  sendWebsiteIntervalToQueue(result._id);
  return result;
};
