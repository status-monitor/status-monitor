import { Router } from 'express';
import { upsertSettings, findOneSettings } from './dao';
import { listLambdaFunctions } from '../aws/services';
import { APIError } from '@api/models/api-error';
import { encrypt } from '@api/utils/encrypt';

export const loadSettingsRoutes = (router: Router) => {
  router.put('/settings', async (req, res) => {
    upsertSettings(req.body);

    res.send();
  });

  router.put('/settings/aws', async (req, res, next) => {
    try {
      try {
        await listLambdaFunctions(req.body);
      } catch (e) {
        throw new APIError(403, new Error('Invalid Credentials'));
      }

      upsertSettings({
        aws: {
          accessKey: encrypt(req.body.accessKey),
          secretKey: encrypt(req.body.secretKey),
        },
      });
      res.send();
    } catch (e) {
      next(e);
    }
  });

  router.get('/settings', async (_, res) => {
    const settings = await findOneSettings();

    res.send({ settings });
  });
};
