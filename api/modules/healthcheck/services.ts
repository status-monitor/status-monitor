import request from 'request-promise-native';
import moment from 'moment';
import { getLastFailedHealthcheckStatus, getFirstHealthcheckStatus, writeHealthcheckStatus } from './dao';
import { Website } from '@common/models/website';
import { getWebsiteUrl } from '@common/utils/website';
import { ScenarioZone } from '@common/models/scenario';
import { AwsZone } from '../aws/models';
import { getAwsClient, LambdaFunctionName } from '../aws/services';
import { getUniqueStringFromZone } from '@common/utils/zone';

export const checkWebsite = async (website: Website, zone: ScenarioZone): Promise<true | string> => {
  const zoneId = getUniqueStringFromZone(zone);
  try {
    const healthCheck =
      zone.type === 'aws'
        ? await awsCallCheck(website.protocol, website.host, website.path, zone.id)
        : await httpCallCheck(website);
    if (healthCheck.status !== 200) {
      throw new Error(`${healthCheck.status}`);
    }
    writeHealthcheckStatus(
      { isAlive: 1, duration: healthCheck.ms },
      { websiteId: website._id, websiteName: website.name, zoneId },
    );
    console.log(getWebsiteUrl(website), healthCheck);
    return true;
  } catch (e) {
    console.log(e.message);
    writeHealthcheckStatus({ isAlive: 0 }, { websiteId: website._id, websiteName: website.name, zoneId });
    return e.message;
  }
};

export const httpCallCheck = async (website: Website): Promise<{ status: number; ms: number }> => {
  const url = getWebsiteUrl(website);
  const startTime = new Date().getTime();

  // @ts-ignore
  const { method, data } = website.httpParameters || {};
  let json;
  if (data) {
    try {
      json = JSON.parse(data);
    } catch {}
  }
  const res = await request({
    method: method || 'GET',
    json,
    url,
    strictSSL: website.protocol === 'https',
    resolveWithFullResponse: true,
  });

  const endTime = new Date().getTime();
  return {
    status: res.statusCode,
    ms: endTime - startTime,
  };
};

export const awsCallCheck = async (
  protocol: string,
  host: string,
  path: string,
  zone: AwsZone,
): Promise<{ status: number; ms: number }> => {
  const client = await getAwsClient(zone);

  return new Promise((resolve, reject) => {
    client.invoke(
      {
        FunctionName: LambdaFunctionName,
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
          path,
          host,
          protocol: `${protocol}://`,
        }),
      },
      function(err, data) {
        if (err) {
          return reject(err);
        }
        const { Payload } = data;
        try {
          const payload = JSON.parse(Payload.toString());
          resolve({
            status: payload.status,
            ms: payload.ms,
          });
        } catch (err) {
          reject(err);
        }
      },
    );
  });
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
