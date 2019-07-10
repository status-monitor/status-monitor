import { mongo } from '@api/db/mongodb';
import { Settings } from '@common/models/settings';

export const upsertSettings = async (settings: Settings): Promise<void> => {
  await mongo.waitReady();
  await mongo.db.collection('settings').updateOne({}, { $set: settings }, { upsert: true });
};

export const findOneSettings = async (): Promise<Settings> => {
  await mongo.waitReady();
  return mongo.db.collection('settings').findOne({});
};
