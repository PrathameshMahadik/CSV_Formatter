import mongoose from "mongoose";
import { CustomError } from "../middlewares/errorHandler";
import config from "../config/config";

export const connection = async () => {
  try {
    await mongoose.connect(config.db_url);
  } catch (error) {
    throw new CustomError("Connection failed to DB", 502);
  }
};
