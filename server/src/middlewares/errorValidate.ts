import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "./errorHandler";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new CustomError(`${{ errors: error.array() }}`, 400);
  }
  next();
};
