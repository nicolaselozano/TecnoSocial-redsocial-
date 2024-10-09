import { NextFunction, Request, Response } from "express";
import { ApiError } from "@/utils/errors";
import { StatusCodes } from "http-status-codes";

export function globalErrors(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("EJECUTANDO EL MIDDLEWARE GLOBAL");

  res.status(error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: error.message ?? "There was an unexpected error",
  });

  next(error);
}
