import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/errors";

export function globalErrors(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("EJECUTANDO EL MIDDLEWARE GLOBAL");

  res.status(error.statusCode).json({
    message: error.message,
  });

  next(error);
}
