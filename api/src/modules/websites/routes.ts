import { Router } from 'express';
import { getLastHealthcheckStatus } from '@api/modules/healthcheck/dao';
import { getUptime } from '@api/modules/healthcheck/services';
import { findAllWebsites, deleteOneWebsiteById, patchOneWebsite } from './dao';
import { createWebsite } from './service';
import { Website } from '@common/models/website';

export const loadWebsitesRoutes = (router: Router): void => {
  router.post(
    '/websites',
    async (req, res): Promise<void> => {
      const website = await createWebsite(req.body);

      res.send({
        website,
      });
    },
  );

  router.patch(
    '/websites/:id',
    async (req, res): Promise<void> => {
      await patchOneWebsite(req.params.id, req.body);

      res.send();
    },
  );

  router.get(
    '/websites',
    async (_, res): Promise<void> => {
      const websites = await findAllWebsites();
      res.send({
        websites: await Promise.all(
          websites.map(
            async (website): Promise<Website> => {
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
            },
          ),
        ),
      });
    },
  );

  router.delete(
    '/websites',
    async (req, res): Promise<void> => {
      await deleteOneWebsiteById(req.query._id);

      res.send();
    },
  );
};
