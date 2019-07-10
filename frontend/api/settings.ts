import axios from 'axios';
import { Settings } from '@common/models/settings';
import { api } from './api';

export const putSettingsApi = async (settings: Partial<Settings>): Promise<void> => {
  const res = await axios.put(`${api.baseUrl}/api/settings`, settings);
  return res.data;
};

export const putAwsSettingsApi = async (settings: Settings['aws']): Promise<void> => {
  const res = await axios.put(`${api.baseUrl}/api/settings/aws`, settings);
  return res.data;
};

export const getSettingsApi = async (): Promise<{ settings: Settings }> => {
  const res = await axios.get(`${api.baseUrl}/api/settings`);
  return res.data;
};
