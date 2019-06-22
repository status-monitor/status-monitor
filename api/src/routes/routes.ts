import { Router } from 'express';
import { getHealthcheckStatus } from '@api/modules/healthcheck/dao';
import { loadWebsitesRoutes } from '@api/modules/websites/routes';
import { loadSettingsRoutes } from '@api/modules/settings/routes';

// const pause = (timeout = 2000) => new Promise(resolve => setTimeout(resolve, timeout));

export const loadRoutes = (router: Router) => {
  loadWebsitesRoutes(router);
  loadSettingsRoutes(router);

  router.get('/influx', async (_, res) => {
    const rows = await getHealthcheckStatus('a');
    res.send({ rows });
  });

  return router;
};
