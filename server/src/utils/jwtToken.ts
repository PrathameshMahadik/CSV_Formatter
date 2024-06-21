import jwt from "jsonwebtoken";
import { CustomError } from "../middlewares/errorHandler";
import config from "../config/config";

const { secret_key } = config;
export const createToken = (name: string | undefined): string => {
  const token = jwt.sign({ name }, secret_key, {
    expiresIn: "30s",
  });
  return token;
};