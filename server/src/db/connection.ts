import mongoose from "mongoose";
import { CustomError } from "../middlewares/errorHandler";

export const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/csv_files");
  } catch (error) {
    throw new CustomError("Connection failed to DB", 502);
  }
};
