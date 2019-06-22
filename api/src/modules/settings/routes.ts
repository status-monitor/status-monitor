import { Router } from 'express';
import { upsertSettings, findOneSettings } from './dao';

export const loadSettingsRoutes = (router: Router) => {
  router.put('/settings', async (req, res) => {
    upsertSettings(req.body);

    res.send();
  });

  router.get('/settings', async (_, res) => {
    const settings = await findOneSettings();

    res.send({ settings });
  });
};
