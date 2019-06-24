import { Router } from 'express';
import { getLastHealthcheckStatus } from '@api/modules/healthcheck/dao';
import { getUptime } from '@api/modules/healthcheck/services';
import { findAllWebsites, deleteOneWebsiteById, patchOneWebsite } from './dao';
import { createWebsite } from './service';

export const loadWebsitesRoutes = (router: Router) => {
  router.post('/websites', async (req, res) => {
    const website = await createWebsite(req.body);

    res.send({
      website,
    });
  });

  router.patch('/websites/:id', async (req, res) => {
    await patchOneWebsite(req.params.id, req.body);

    res.send();
  });

  router.get('/websites', async (_, res) => {
    const websites = await findAllWebsites();
    res.send({
      websites: await Promise.all(
        websites.map(async website => {
          const status = await getLastHealthcheckStatus(website._id);
          if (!status) {
            return website;
          }
          const uptime = await getUptime(website._id);

          website.status = {
            duration: status.duration,
            uptime,
          };
          return website;
        }),
      ),
    });
  });

  router.delete('/websites', async (req, res) => {
    await deleteOneWebsiteById(req.query._id);

    res.send();
  });
};
