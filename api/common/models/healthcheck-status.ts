export interface HealthCheckStatus {
  website: string;
  zoneId: string;
  isAlive: number;
  duration?: number;
  time?: string;
}
