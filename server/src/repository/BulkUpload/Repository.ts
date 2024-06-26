import { Types } from "mongoose";
import { IBulkUpload } from "./IModel";
import { BulkUpload } from "./Schema";
import { logger } from "@storybook/node-logger";

export const createCSVdetails = async (data: IBulkUpload) => {
  logger.info("CSV Details repo ::::>>>>>> inside upload CSV details");
  const csvData = new BulkUpload(data);
  return await csvData.save();
};

export const updateCSVDetails = async (
  uploadId: Types.ObjectId,
  endTime: Date,
  status: string,
  numItemsUploaded: number
) => {
  logger.info("CSV Details repo ::::>>>>>> inside update CSV details");
  return await BulkUpload.findByIdAndUpdate(
    { _id: uploadId },
    {
      $set: {
        endTime: endTime,
        numItemsUploaded: numItemsUploaded,
        status: status,
      },
    }
  );
};

export const totalCsvCount = async () => {
  logger.info("CSV Details repo ::::>>>>>> inside total CSV count");
  return await BulkUpload.countDocuments();
};

export const getAllData = async (skip: number, _limit: number) => {
  logger.info("CSV Details repo ::::>>>>>> inside fetch CSV details");
  return await BulkUpload.find().skip(skip).limit(_limit);
};
