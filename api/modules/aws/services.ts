import aws, { AWSError } from 'aws-sdk';
import { getAwsSettings } from '../settings/services';
import { Settings } from '@common/models/settings';
import { APIError } from '@api/models/api-error';
import { FunctionConfiguration } from 'aws-sdk/clients/greengrass';
import { upsertSettings } from '../settings/dao';
import { AwsZone } from './models';
import { PromiseResult } from 'aws-sdk/lib/request';
import { ListFunctionsResponse } from 'aws-sdk/clients/lambda';

const LambdaFunctionName = 'Status-Monitor-OSS-Checker';
const version = 1;
const LambdaZipFileVersion = `lambda-r${version}.zip`;

export const upsertLambdaFunctions = async (): Promise<void> => {
  const settings = await getAwsSettings();
  if (!settings || !settings.accessKey || !settings.secretKey) {
    return;
  }

  upsertLambdaFunction('eu-west-2', settings);
  // upsertLambdaFunction('eu-west-2', settings);
};

const upsertLambdaFunction = async (region: AwsZone, settings: Settings['aws']): Promise<void> => {
  const lambdaFunction = await isLambdaFunctionExisting(region, settings);
  if (lambdaFunction) {
    if (!settings.installedFunctions || settings.installedFunctions[region] !== LambdaZipFileVersion) {
      await updateLambdaFunction(region, settings);
    }
  } else {
    console.log(`Creating function ${LambdaFunctionName}`);
    await createLambdaFunction(region, settings);
  }
};

export const createLambdaFunction = async (region: AwsZone, settings?: Settings['aws']): Promise<void> => {
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
        S3Bucket: `statusmonitor-${region}`,
        S3Key: LambdaZipFileVersion,
      },
      MemorySize: 128,
      Publish: true,
      FunctionName: LambdaFunctionName,
      Role: 'arn:aws:iam::365165116898:role/SESEmailForward-SESEmailForwardRole-1GNVGIH6P94G',
      Handler: 'main',
    },
    (err): void => {
      if (err) {
        throw err;
      }
      upsertSettings({
        [`aws.installedFunctions.${region}`]: LambdaZipFileVersion,
      });
    },
  );
};

export const updateLambdaFunction = async (region: AwsZone, settings?: Settings['aws']): Promise<void> => {
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
      S3Bucket: `statusmonitor-${region}`,
      S3Key: LambdaZipFileVersion,
      // RevisionId: `${version}`,
    },
    (err): void => {
      if (err) {
        throw err;
      }
      upsertSettings({
        [`aws.installedFunctions.${region}`]: LambdaZipFileVersion,
      });
    },
  );
};

export const isLambdaFunctionExisting = async (
  region: AwsZone,
  settings?: Settings['aws'],
): Promise<FunctionConfiguration> => {
  const functions = await listLambdaFunctions(region, settings);
  return functions.Functions.find((func): boolean => func.FunctionName === LambdaFunctionName);
};

export const listLambdaFunctions = async (
  region: AwsZone,
  settings?: Settings['aws'],
): Promise<PromiseResult<ListFunctionsResponse, AWSError>> => {
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
