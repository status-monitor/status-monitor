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
    ...website,
    createdAt: new Date(),
    isAlive: true,
    scenarioId: new ObjectID(website.scenarioId),
  });
  return response.ops[0];
};

export const patchOneWebsite = async (_id: string, website: Partial<Website>): Promise<void> => {
  await mongo.waitReady();
  const patchObject: any = { ...website };
  if (website.scenarioId) {
    patchObject.scenarioId = new ObjectID(website.scenarioId);
  }
  await mongo.db.collection('websites').updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: patchObject,
    },
  );
};

export const deleteOneWebsiteById = async (id: string): Promise<void> => {
  await mongo.waitReady();
  await mongo.db.collection('websites').deleteOne({ _id: new ObjectId(id) });
};
