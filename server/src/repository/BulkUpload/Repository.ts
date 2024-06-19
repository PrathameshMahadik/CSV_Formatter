import { Types } from "mongoose";
import { IBulkUpload } from "./IModel";
import { BulkUpload } from "./Schema";

export const createCSVdetails = async (data: IBulkUpload) => {
  const csvData = new BulkUpload(data);
  return await csvData.save();
};

export const updateCSVDetails = async (
  uploadId: Types.ObjectId,
  endTime: Date,
  status: string,
  numItemsUploaded: number
) => {
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
  return await BulkUpload.countDocuments();
};

export const getAllData = async (skip:number,_limit:number) =>{
  return await BulkUpload.find().skip(skip).limit(_limit);
}