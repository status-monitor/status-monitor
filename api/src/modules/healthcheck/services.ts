import request from 'request-promise-native';
import * as moment from 'moment';
import { getLastFailedHealthcheckStatus, getFirstHealthcheckStatus, writeHealthcheckStatus } from './dao';
import { Website } from '@common/models/website';
import { getWebsiteUrl } from '@common/utils/website';

export const checkWebsite = async (website: Website): Promise<boolean> => {
  const websiteUrl = getWebsiteUrl(website);
  try {
    const healthCheck = await httpCallCheck(websiteUrl);
    if (healthCheck.status !== 200) {
      throw new Error(`${healthCheck.status}`);
    }
    writeHealthcheckStatus({ website: website._id, location: 'Self hosted', isAlive: true, duration: healthCheck.ms });
    console.log(healthCheck);
    return true;
  } catch (e) {
    console.log(e.message);
    writeHealthcheckStatus({ website: website._id, location: 'Self hosted', isAlive: false });
    return false;
  }
};

export const httpCallCheck = async (url: string): Promise<{ status: number; ms: number }> => {
  const startTime = new Date().getTime();
  const res = await request({
    url,
    strictSSL: url.indexOf('https://') === 0,
    resolveWithFullResponse: true,
  });

  const endTime = new Date().getTime();
  return {
    status: res.statusCode,
    ms: endTime - startTime,
  };
};

export const getUptime = async (websiteId: string): Promise<Date> => {
  let healthCheck = await getLastFailedHealthcheckStatus(websiteId);
  if (!healthCheck) {
    healthCheck = await getFirstHealthcheckStatus(websiteId);
  }
  if (!healthCheck) {
    return new Date();
  }

  return moment(new Date(healthCheck.time.toString())).toDate();
};
