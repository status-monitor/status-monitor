import { Router } from 'express';
import { getHealthcheckStatus } from './dao';

export const loadHealthcheckRoutes = (router: Router) => {
  router.get('/websites/:websiteId/statuses', async (req, res) => {
    const statuses = await getHealthcheckStatus(req.params.websiteId);
    res.send({ statuses: statuses.reverse() });
  });
};
