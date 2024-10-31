import envs from '@/config/envs';
import { ApiError } from '@/utils/errors';
import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function globalErrors(error: ApiError, req: Request, res: Response, next: NextFunction) {
  if (envs.MODE === 'dev') {
    console.error(error.stack);
  }

  if (error instanceof ValidationError) {
    const { message, property } = error;

    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: 'Invalid data',
        details: {
          message,
          property,
        },
      })
      .end();
  }

  res.status(error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: error.message ?? 'There was an unexpected error',
  });

  next(error);
}
