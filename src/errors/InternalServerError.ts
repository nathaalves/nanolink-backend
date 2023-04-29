export class InternalServerError extends Error {
  public statusCode: number;

  constructor(public message: string, public action: string) {
    super(message);
    this.name = 'InternalServerError';
    this.action = action;
    this.statusCode = 500;
  }
}
