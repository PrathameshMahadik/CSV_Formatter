import mongoose, { Schema } from "mongoose";
import { CsvDocument } from "./IModel";
import { BulkUpload } from "../BulkUpload/Schema";

const csvSchema = new Schema<CsvDocument>(
  {
    csvId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default:"Male"
    },
    email: {
      type: String,
      required: true,
    },
    phone_no: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const CSVSchema = mongoose.model<CsvDocument>("CSVSchema", csvSchema);

export default CSVSchema;
