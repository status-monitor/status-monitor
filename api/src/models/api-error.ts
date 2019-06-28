export class APIError {
  public error: Error;
  public statusCode: number;

  public constructor(statusCode: number, error: Error) {
    this.statusCode = statusCode;
    this.error = error;
  }
}
