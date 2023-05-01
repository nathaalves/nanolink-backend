export class UnauthorizedError extends Error {
  public statusCode: number;

  constructor(public message: string, public action: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.action = action;
    this.statusCode = 401;
  }
}
