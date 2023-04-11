import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof ZodError) {
    {
      return res.status(400).send({
        message: 'Corpo da requisição inválido',
        details: err.issues.map((err: any) => err.code),
      });
    }
  }

  res.status(500).send('Erro inesperado.');
}
