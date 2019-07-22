import request from 'request-promise-native';
import moment from 'moment';
import { getLastFailedHealthcheckStatus, getFirstHealthcheckStatus, writeHealthcheckStatus } from './dao';
import { Website } from '@common/models/website';
import { getWebsiteUrl } from '@common/utils/website';
import { ScenarioZone } from '@common/models/scenario';
import { AwsZone } from '../aws/models';
import { getAwsClient, LambdaFunctionName } from '../aws/services';

export const checkWebsite = async (website: Website, zone: ScenarioZone): Promise<boolean> => {
  const websiteUrl = getWebsiteUrl(website);
  try {
    const healthCheck =
      zone.type === 'aws'
        ? await awsCallCheck(website.protocol, website.host, website.path, zone.id)
        : await httpCallCheck(websiteUrl);
    if (healthCheck.status !== 200) {
      throw new Error(`${healthCheck.status}`);
    }
    writeHealthcheckStatus({ website: website._id, location: 'Self hosted', isAlive: 1, duration: healthCheck.ms });
    console.log(healthCheck);
    return true;
  } catch (e) {
    console.log(e.message);
    writeHealthcheckStatus({ website: website._id, location: 'Self hosted', isAlive: 0 });
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
