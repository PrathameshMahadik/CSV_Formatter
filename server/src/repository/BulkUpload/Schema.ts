import mongoose, { Model, Schema, model } from "mongoose";
import { IBulkUpload } from "./IModel";

const bulkUploadSchema = new mongoose.Schema<IBulkUpload>({
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  numItemsUploaded: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    required: true,
    enum: ["in-progress", "completed", "failed"],
  },
  fileName: { type: String, required: true },
});

export const BulkUpload: Model<IBulkUpload> = model<IBulkUpload>(
  "BulkUpload",
  bulkUploadSchema
);