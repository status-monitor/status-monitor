import { Router } from 'express';
import { getHealthcheckStatus } from './dao';
import { listLambdaFunctions } from '../aws/services';

export const loadHealthcheckRoutes = (router: Router) => {
  router.get('/websites/:websiteId/statuses', async (req, res) => {
    const statuses = await getHealthcheckStatus(req.params.websiteId);
    res.send({ statuses: statuses.reverse() });
  });

  router.get('/test', async (req, res) => {
    const functions = await listLambdaFunctions();
    res.send({
      functions,
    });
  });
};
