import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ConflictError, NotFoundError, UnauthorizedError } from '../errors';

export function errorHandler(
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).send({
      message: 'Corpo da requisição inválido.',
      details: err.issues,
    });
  }

  if (
    err instanceof NotFoundError ||
    err instanceof ConflictError ||
    err instanceof UnauthorizedError
  ) {
    return res.status(err.statusCode).send({
      message: err.message,
      action: err.action,
    });
  }

  res.status(500).send('Erro inesperado.');
}
