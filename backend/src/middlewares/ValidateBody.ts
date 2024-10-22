import { NextFunction, Request, Response } from 'express';
import z from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateBody(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    schema.parse(req.body);
    next();
  };
}
