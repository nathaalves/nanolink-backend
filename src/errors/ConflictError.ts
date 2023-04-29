export class ConflictError extends Error {
  public statusCode: number;

  constructor(public message: string, public action: string) {
    super(message);
    this.name = 'ConflictError';
    this.action = action;
    this.statusCode = 409;
  }
}
