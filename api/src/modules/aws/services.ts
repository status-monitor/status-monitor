import aws from 'aws-sdk';
import { getAwsSettings } from '../settings/services';
import { Settings } from '@common/models/settings';

export const listLambdaFunctions = async (settings?: Settings['aws']) => {
  if (!settings) {
    settings = await getAwsSettings();
  }

  const lambda = new aws.Lambda({
    accessKeyId: settings.accessKey,
    secretAccessKey: settings.secretKey,
    region: 'eu-west-1',
  });

  const functions = await lambda.listFunctions({ MaxItems: 10000 }).promise();
  console.log(functions);
  return functions;
};

// const a : aws.Lambda.ListFunctionsRequest;
