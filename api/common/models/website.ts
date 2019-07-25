export const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
type HttpMethod = typeof httpMethods[number];

export interface Website {
  _id?: string;
  addedDate?: Date;
  protocol: 'http' | 'https';
  host: string;
  path: string;
  name: string;
  httpParameters?: {
    method: HttpMethod;
    data?: string;
  };

  scenarioId: string;
  isAlive?: boolean;

  status?: {
    duration: number;
    uptime: Date;
  };
}
