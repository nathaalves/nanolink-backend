export class NotFoundError extends Error {
  action: string;
  statusCode: number;

  constructor(message: string, action: string) {
    super();
    this.name = 'NotFoundError';
    this.message = message;
    this.action = action;
    this.statusCode = 404;
  }
}
