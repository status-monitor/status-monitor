import axios from 'axios';
import { Website } from '@common/models/website';
import { Settings } from '@common/models/settings';
import { HealthCheckStatus } from '@common/models/healthcheck-status';
import { api } from './api';

export const getWebsitesApi = async (): Promise<{ websites: Website[] }> => {
  const res = await axios.get(`${api.baseUrl}/api/websites`);
  return res.data;
};

export const postWebsiteApi = async (website: Website): Promise<{ website: Website }> => {
  const res = await axios.post(`${api.baseUrl}/api/websites`, {
    host: website.host,
    name: website.name,
    path: website.path,
    protocol: website.protocol,
  });
  return res.data;
};

export const patchWebsiteApi = async (id: string, website: Website): Promise<void> => {
  await axios.patch(`${api.baseUrl}/api/websites/${id}`, {
    host: website.host,
    name: website.name,
    path: website.path,
    protocol: website.protocol,
  });
};

export const deleteWebsiteApi = async (websiteId: string): Promise<void> => {
  const res = await axios.delete(`${api.baseUrl}/api/websites?_id=${websiteId}`);
  return res.data;
};

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

export const getInfluxApi = async (websiteId: string): Promise<HealthCheckStatus[]> => {
  const res = await axios.get(`${api.baseUrl}/websites/${websiteId}/statuses`);
  return res.data && res.data.statuses;
};
