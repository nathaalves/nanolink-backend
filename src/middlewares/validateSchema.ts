import { ZodObject, ZodRawShape } from 'zod';
import { Request, Response, NextFunction } from 'express';

function validate<T extends ZodRawShape>(
  schema: ZodObject<T>,
  type: 'body' | 'params'
) {
  return (req: Request, res: Response, next: NextFunction) => {
    res.locals[type as keyof Response] = schema.parse(
      req[type as keyof Request]
    );
    next();
  };
}

function params<T extends ZodRawShape>(schema: ZodObject<T>) {
  return validate(schema, 'params');
}

function body<T extends ZodRawShape>(schema: ZodObject<T>) {
  return validate(schema, 'body');
}

export const validateSchema = { params, body };
