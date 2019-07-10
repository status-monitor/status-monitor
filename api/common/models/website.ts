export interface Website {
  _id?: string;
  protocol: 'http' | 'https';
  host: string;
  path: string;
  name: string;
  isAlive?: boolean;

  status?: {
    duration: number;
    uptime: Date;
  };
}
