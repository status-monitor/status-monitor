export interface Website {
  _id?: string;
  protocol: 'http' | 'https';
  host: string;
  path: string;
  name: string;

  status?: {
    isAlive: boolean;
    duration: number;
    uptime: Date;
  };
}
