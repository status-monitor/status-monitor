export interface HealthCheckStatus {
  website: string;
  location: string;
  isAlive: number;
  duration?: number;
  time?: string;
}
