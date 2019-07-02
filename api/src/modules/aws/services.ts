import aws from 'aws-sdk';
import { getAwsSettings } from '../settings/services';
import { Settings } from '@common/models/settings';
import { APIError } from '@api/models/api-error';
import { FunctionConfiguration } from 'aws-sdk/clients/greengrass';
import { upsertSettings } from '../settings/dao';

const LambdaFunctionName = 'Status-Monitor-OSS-Checker';
const version = 7;
const LambdaZipFileVersion = `lambda-r${version}.zip`;

export const upsertLambdaFunctions = async () => {
  const settings = await getAwsSettings();
  const lambdaFunction = await isLambdaFunctionExisting('eu-west-1', settings);
  if (lambdaFunction) {
    if (settings.lambdaVersionInstalled !== LambdaZipFileVersion) {
      await updateLambdaFunction('eu-west-1', settings);
      console.log('Updated lambda function');
    }
  } else {
    console.log(`Creating function ${LambdaFunctionName}`);
    await createLambdaFunction('eu-west-1', settings);
  }
};

export const createLambdaFunction = async (region: string, settings?: Settings['aws']): Promise<void> => {
  if (!settings) {
    settings = await getAwsSettings();
  }

  if (!settings || !settings.accessKey || !settings.secretKey) {
    throw new APIError(400, new Error('AWS_NOT_CONFIGURED'));
  }

  const lambda = new aws.Lambda({
    accessKeyId: settings.accessKey,
    secretAccessKey: settings.secretKey,
    region,
  });
  await lambda.createFunction(
    {
      Runtime: 'go1.x',
      Code: {
        S3Bucket: 'statusmonitor',
        S3Key: LambdaZipFileVersion,
      },
      MemorySize: 128,
      Publish: true,
      FunctionName: LambdaFunctionName,
      Role: 'arn:aws:iam::365165116898:role/SESEmailForward-SESEmailForwardRole-1GNVGIH6P94G',
      Handler: 'main',
    },
    err => {
      if (err) {
        throw err;
      }
      upsertSettings({
        'aws.lambdaVersionInstalled': LambdaZipFileVersion,
      });
    },
  );

  await console.log(LambdaZipFileVersion);
};

export const updateLambdaFunction = async (region: string, settings?: Settings['aws']): Promise<void> => {
  if (!settings) {
    settings = await getAwsSettings();
  }

  if (!settings || !settings.accessKey || !settings.secretKey) {
    throw new APIError(400, new Error('AWS_NOT_CONFIGURED'));
  }

  const lambda = new aws.Lambda({
    accessKeyId: settings.accessKey,
    secretAccessKey: settings.secretKey,
    region,
  });
  // const a: UpdateFunctionCodeRequest;
  await lambda.updateFunctionCode(
    {
      Publish: true,
      FunctionName: LambdaFunctionName,
      S3Bucket: 'statusmonitor',
      S3Key: LambdaZipFileVersion,
      // RevisionId: `${version}`,
    },
    err => {
      if (err) {
        throw err;
      }
      upsertSettings({
        'aws.lambdaVersionInstalled': LambdaZipFileVersion,
      });
    },
  );
};

export const isLambdaFunctionExisting = async (
  region: string,
  settings?: Settings['aws'],
): Promise<FunctionConfiguration> => {
  const functions = await listLambdaFunctions(region, settings);
  return functions.Functions.find(func => func.FunctionName === LambdaFunctionName);
};

export const listLambdaFunctions = async (region: string, settings?: Settings['aws']) => {
  if (!settings) {
    settings = await getAwsSettings();
  }

  if (!settings) {
    throw new APIError(400, new Error('AWS_NOT_CONFIGURED'));
  }

  const lambda = new aws.Lambda({
    accessKeyId: settings.accessKey,
    secretAccessKey: settings.secretKey,
    region,
  });

  return lambda.listFunctions({ MaxItems: 10000 }).promise();
};
