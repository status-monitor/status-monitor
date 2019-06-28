import { findOneSettings } from './dao';
import { Settings } from '@common/models/settings';
import { decrypt } from '@api/utils/encrypt';

export const getAwsSettings = async (): Promise<Settings['aws']> => {
  const settings = await findOneSettings();

  return {
    accessKey: decrypt(settings.aws.accessKey),
    secretKey: decrypt(settings.aws.secretKey),
  };
};
