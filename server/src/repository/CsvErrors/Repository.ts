import { Types } from "mongoose";
import { CsvErrors } from "./IModel";
import CSVErrors from "./Schema";

export const uploadErrors = async (errors: CsvErrors[]) => {
  return await CSVErrors.insertMany(errors);
};

export const totalErrorCount = async (uploadId: Types.ObjectId) => {
  return await CSVErrors.countDocuments({ csvId: uploadId });
};

export const getErrors = async (
  uploadId: Types.ObjectId,
  skip: number,
  _limit: number
) => {
  return await CSVErrors.find({ csvId: uploadId }).skip(skip).limit(_limit);
};
