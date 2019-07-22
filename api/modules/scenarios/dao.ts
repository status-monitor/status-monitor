import { mongo } from '@api/db/mongodb';
import { Scenario } from '@common/models/scenario';
import { ObjectId } from 'bson';

export const findAllScenarios = async (): Promise<Scenario[]> => {
  await mongo.waitReady();
  return mongo.db
    .collection('scenarios')
    .find({})
    .toArray();
};

export const findOneScenarioById = async (id: string): Promise<Scenario> => {
  await mongo.waitReady();
  return mongo.db.collection('scenarios').findOne({ _id: new ObjectId(id) });
};

export const insertOneScenario = async (scenario: Scenario): Promise<Scenario> => {
  await mongo.waitReady();
  const response = await mongo.db.collection('scenarios').insertOne({
    createdAt: new Date(),
    ...scenario,
  });
  return response.ops[0];
};

export const patchOneScenario = async (_id: string, scenario: Partial<Scenario>): Promise<void> => {
  await mongo.waitReady();
  await mongo.db.collection('scenarios').updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: scenario,
    },
  );
};

export const deleteOneScenarioById = async (id: string): Promise<void> => {
  await mongo.waitReady();
  await mongo.db.collection('scenarios').deleteOne({ _id: new ObjectId(id) });
};
