import axios from 'axios';
import { Scenario } from '@common/models/scenario';
import { api } from './api';

export const getScenariosApi = async (): Promise<{ scenarios: Scenario[] }> => {
  const res = await axios.get(`${api.baseUrl}/api/scenarios`);
  return res.data;
};

export const postScenarioApi = async (scenario: Scenario): Promise<{ scenario: Scenario }> => {
  const res = await axios.post(`${api.baseUrl}/api/scenarios`, scenario);
  return res.data;
};

export const patchScenarioApi = async (id: string, scenario: Partial<Scenario>): Promise<void> => {
  await axios.patch(`${api.baseUrl}/api/scenarios/${id}`, scenario);
};

export const deleteScenarioApi = async (scenarioId: string): Promise<void> => {
  const res = await axios.delete(`${api.baseUrl}/api/scenarios/${scenarioId}`);
  return res.data;
};
