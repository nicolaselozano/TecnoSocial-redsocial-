import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  readonly statusCode: StatusCodes;
  constructor(statusCode: StatusCodes, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
