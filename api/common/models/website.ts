export interface Website {
  _id?: string;
  addedDate?: Date;
  protocol: 'http' | 'https';
  host: string;
  path: string;
  name: string;
  scenarioId: string;
  isAlive?: boolean;

  status?: {
    duration: number;
    uptime: Date;
  };
}
