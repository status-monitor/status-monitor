import { ScenarioZone } from '@common/models/scenario';

export const getUniqueStringFromZone = (zone: ScenarioZone) => {
  if (zone.type === 'self') {
    return 'self';
  }
  return `${zone.type}/${zone.id}`;
};
