import { waitForRandomTime } from '@api/utils/random';
import { findAllScenarios, insertOneScenario } from './dao';

export const loadScenariosFixtures = async () => {
  await waitForRandomTime(5);

  const scenarios = await findAllScenarios();
  if (!scenarios || !scenarios.length) {
    await insertOneScenario({
      interval: 10,
      name: 'Self check (10s)',
      zones: [
        {
          type: 'self',
        },
      ],
    });
    await insertOneScenario({
      interval: 30,
      name: 'Self check (30s)',
      zones: [
        {
          type: 'self',
        },
      ],
    });
  }
};
