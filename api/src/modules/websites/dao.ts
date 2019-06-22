import { mongo } from '@api/db/mongodb';
import { Website } from '@common/models/website';
import { ObjectId } from 'bson';

export const findAllWebsites = async (): Promise<Website[]> => {
  await mongo.waitReady();
  return mongo.db
    .collection('websites')
    .find({})
    .toArray();
};

export const findOneWebsiteById = async (id: string): Promise<Website> => {
  await mongo.waitReady();
  return mongo.db.collection('websites').findOne({ _id: new ObjectId(id) });
};

export const insertOneWebsite = async (website: Website): Promise<Website> => {
  await mongo.waitReady();
  const response = await mongo.db.collection('websites').insertOne({
    host: website.host,
    name: website.name,
    path: website.path,
    protocol: website.protocol,
    isAlive: true,
  });
  return response.ops[0];
};

export const patchOneWebsite = async (_id: string, website: Partial<Website>): Promise<void> => {
  await mongo.waitReady();
  await mongo.db.collection('websites').updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: website,
    },
  );
};
