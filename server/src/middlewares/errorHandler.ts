import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

interface ErrorResponse {
  statusCode: number;
  message: string;
}

const errorHandler = (err:any, req: Request, res: Response, next: NextFunction) => {
  let errorResponse: ErrorResponse = {
    statusCode: 500,
    message: "Internal Server Error",
  };

  if (err instanceof CustomError) {
    errorResponse.statusCode = err.statusCode;
    errorResponse.message = err.message;
  } else {
  }
  res.status(errorResponse.statusCode).json(errorResponse);
};

export { errorHandler };
