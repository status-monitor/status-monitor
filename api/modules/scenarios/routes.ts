import { Router } from 'express';
import { insertOneScenario, patchOneScenario, findAllScenarios, deleteOneScenarioById } from './dao';

export const loadScenariosRoutes = (router: Router): void => {
  router.post(
    '/scenarios',
    async (req, res): Promise<void> => {
      const scenario = await insertOneScenario(req.body);

      res.send({
        scenario,
      });
    },
  );

  router.patch(
    '/scenarios/:id',
    async (req, res): Promise<void> => {
      await patchOneScenario(req.params.id, req.body);

      res.send();
    },
  );

  router.get(
    '/scenarios',
    async (_, res): Promise<void> => {
      const scenarios = await findAllScenarios();
      res.send({
        scenarios,
      });
    },
  );

  router.delete(
    '/scenarios/:id',
    async (req, res): Promise<void> => {
      await deleteOneScenarioById(req.params.id);

      res.send();
    },
  );
};
