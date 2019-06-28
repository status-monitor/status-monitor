import { mongo } from '@api/db/mongodb';
import { Settings } from '@common/models/settings';

interface SettingsUpdate extends Settings {
  // 'aws.installedFunctions.lambdaVersionInstalled'?: Settings['aws']['installedFunctions'];
  // 'aws.zones'?: Settings['aws']['zones'];
}

export const upsertSettings = async (settings: SettingsUpdate): Promise<void> => {
  await mongo.waitReady();
  await mongo.db.collection('settings').updateOne({}, { $set: settings }, { upsert: true });
};

export const findOneSettings = async (): Promise<Settings> => {
  await mongo.waitReady();
  return mongo.db.collection('settings').findOne({});
};
