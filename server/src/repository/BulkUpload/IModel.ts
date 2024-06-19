import mongoose, { Types } from "mongoose";

export interface IBulkUpload {
    uploadId?: Types.ObjectId;
    startTime: Date;
    endTime?: Date;
    numItemsUploaded: number;
    status: string;
    fileName: string;
  }