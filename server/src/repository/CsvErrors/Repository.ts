import { Types } from "mongoose";
import { CsvErrors } from "./IModel";
import CSVErrors from "./Schema";
import { logger } from "@storybook/node-logger";

export const uploadErrors = async (errors: CsvErrors[]) => {
  logger.info("CSV Errors repo ::::>>>>>> inside upload errors from csv");
  return await CSVErrors.insertMany(errors);
};

export const totalErrorCount = async (uploadId: Types.ObjectId) => {
  logger.info("CSV Errors repo ::::>>>>>> inside error count");
  return await CSVErrors.countDocuments({ csvId: uploadId });
};

export const getErrors = async (
  uploadId: Types.ObjectId,
  skip: number,
  _limit: number
) => {
  logger.info("CSV Errors repo ::::>>>>>> inside fetch errors");
  return await CSVErrors.find({ csvId: uploadId }).skip(skip).limit(_limit);
};
