import { Router } from 'express';
import { getHealthcheckStatus } from './dao';

export const loadHealthcheckRoutes = (router: Router) => {
  router.get('/influxdb/:websiteId', async (req, res) => {
    const statuses = await getHealthcheckStatus(req.params.websiteId);
    res.send({ statuses: statuses.filter((_, index) => index % 5 === Math.floor(Math.random() * 5)) });
  });
};
