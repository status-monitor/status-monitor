export interface HealthCheckStatusFields {
  isAlive: number;
  duration?: number;
  time?: string;
}

export interface HealthCheckStatusTags {
  websiteId: string;
  zoneId: string;
  [key: string]: string;
}
