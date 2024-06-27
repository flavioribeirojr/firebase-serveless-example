import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodRawShape, z } from 'zod';

export function validateBody<T extends ZodRawShape>(schema: z.ZodObject<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(422).json({ errors: err.errors });
        return;
      }

      res.status(500).send(err);
    }
  };
}
