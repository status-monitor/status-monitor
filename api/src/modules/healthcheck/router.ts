import { Router } from 'express';
import { getHealthcheckStatus } from './dao';

export const loadHealthcheckRoutes = (router: Router): void => {
  router.get(
    '/websites/:websiteId/statuses',
    async (req, res, next): Promise<void> => {
      try {
        const statuses = await getHealthcheckStatus(req.params.websiteId);
        res.send({ statuses: statuses.reverse() });
      } catch (e) {
        next(e);
      }
    },
  );
};
