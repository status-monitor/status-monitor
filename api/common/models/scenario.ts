export interface Scenario {
  _id?: string;
  addedDate?: Date;
  name: string;
  zones: ScenarioZone[];
  interval: number;
}

interface ScenarioZone {
  type: 'aws' | 'self';
  id?: string;
}
