import envs from '@/config/envs';
import { ApiError } from '@/utils/errors';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

export function globalErrors(error: ApiError, req: Request, res: Response, next: NextFunction) {
  if (envs.MODE === 'dev') {
    console.error(error.stack);
  }

  if (error instanceof ZodError) {
    const errorMessages = error.errors.map((issue) => ({
      path: issue.path[0],
      message: issue.message,
    }));
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages }).end();
  }

  res.status(error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: error.message ?? 'There was an unexpected error',
  });

  next(error);
}
