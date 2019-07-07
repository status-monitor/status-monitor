import { AwsZone } from '@api/modules/aws/models';

export interface Settings {
  slack?: {
    channel: string;
    webhookUrl: string;
  };
  aws?: {
    accessKey: string;
    secretKey: string;
    installedFunctions?: {
      [zone in AwsZone]: string;
    };
  };
}
