import { Router } from 'express';
import { findOneSettings } from '../settings/dao';
import { ScenarioZone } from '@common/models/scenario';

export const loadZonesRoutes = (router: Router): void => {
  router.get(
    '/zones',
    async (_, res): Promise<void> => {
      const settings = await findOneSettings();
      const zones: ScenarioZone[] = [
        {
          type: 'self',
        },
      ];
      if (settings && settings.aws && settings.aws.installedFunctions) {
        Object.keys(settings.aws.installedFunctions).forEach(zone => {
          zones.push({ type: 'aws', id: zone });
        });
      }
      res.send({
        zones,
      });
    },
  );
};
