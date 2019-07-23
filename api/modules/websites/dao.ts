import { mongo } from '@api/db/mongodb';
import { Website } from '@common/models/website';
import { ObjectId, ObjectID } from 'bson';

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
    createdAt: new Date(),
    host: website.host,
    name: website.name,
    path: website.path,
    protocol: website.protocol,
    scenarioId: new ObjectID(website.scenarioId),
    isAlive: true,
  });
  return response.ops[0];
};

export const patchOneWebsite = async (_id: string, website: Partial<Website>): Promise<void> => {
  await mongo.waitReady();
  await mongo.db.collection('websites').updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: {
        ...website,
        scenarioId: new ObjectID(website.scenarioId),
      },
    },
  );
};

export const deleteOneWebsiteById = async (id: string): Promise<void> => {
  await mongo.waitReady();
  await mongo.db.collection('websites').deleteOne({ _id: new ObjectId(id) });
};
