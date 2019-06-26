import { Router } from 'express';
import { loadWebsitesRoutes } from '@api/modules/websites/routes';
import { loadSettingsRoutes } from '@api/modules/settings/routes';
import { loadHealthcheckRoutes } from '@api/modules/healthcheck/router';

// const pause = (timeout = 2000) => new Promise(resolve => setTimeout(resolve, timeout));

export const loadRoutes = (router: Router) => {
  loadWebsitesRoutes(router);
  loadSettingsRoutes(router);
  loadHealthcheckRoutes(router);

  return router;
};
