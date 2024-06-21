import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "./errorHandler";
import config from "../config/config";

const { secret_key } = config;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers["authorization"];
  if (!header) {
    throw new CustomError("Token not provided", 403);
  }

  const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
        throw new CustomError( "Authentication failed. Invalid token format.",401)
    }

  jwt.verify(token, secret_key, (err: any, decoded: any) => {
    if (err) {
      throw new CustomError("Unuthorized User", 401);
    }
  });
  next();
};
