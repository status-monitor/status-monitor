import { Router } from 'express';
import { getHealthcheckStatus } from './dao';
import { isLambdaFunctionExisting, createLambdaFunction, updateLambdaFunction } from '../aws/services';
import { getAwsSettings } from '../settings/services';

export const loadHealthcheckRoutes = (router: Router) => {
  router.get('/websites/:websiteId/statuses', async (req, res, next) => {
    try {
      const statuses = await getHealthcheckStatus(req.params.websiteId);
      res.send({ statuses: statuses.reverse() });
    } catch (e) {
      next(e);
    }
  });
};
