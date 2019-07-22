import axios from 'axios';
import { ScenarioZone } from '@common/models/scenario';
import { api } from './api';

export const getZonesApi = async (): Promise<{ zones: ScenarioZone[] }> => {
  const res = await axios.get(`${api.baseUrl}/api/zones`);
  return res.data;
};
