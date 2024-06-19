import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/csv_files");
  } catch (error) {
    console.log(error);
  }
};