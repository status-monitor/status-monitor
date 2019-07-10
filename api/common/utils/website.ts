import { Website } from '@common/models/website';

export const getWebsiteUrl = (website: Website) => {
  return `${website.protocol}://${website.host}${website.path}`;
};
