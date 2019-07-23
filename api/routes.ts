import { Router } from 'express';
import { loadWebsitesRoutes } from '@api/modules/websites/routes';
import { loadSettingsRoutes } from '@api/modules/settings/routes';
import { loadHealthcheckRoutes } from '@api/modules/healthcheck/router';
import { loadScenariosRoutes } from './modules/scenarios/routes';
import { loadZonesRoutes } from './modules/zones/routes';

// const pause = (timeout = 2000) => new Promise(resolve => setTimeout(resolve, timeout));

export const loadRoutes = (): Router => {
  const router = Router();
  loadWebsitesRoutes(router);
  loadSettingsRoutes(router);
  loadHealthcheckRoutes(router);
  loadScenariosRoutes(router);
  loadZonesRoutes(router);
  return router;
};
