import mongoose, { Schema } from "mongoose";
import { CsvErrors } from "./IModel";
import { BulkUpload } from "../BulkUpload/Schema";

const csvErrors = new Schema<CsvErrors>(
  {
    csvId :{
        type:mongoose.Schema.Types.ObjectId,
        ref: BulkUpload,
        required:true
    },
    row:{
        type:Number,
        required: true
    },
    error:{
        type: String,
        required: true
    }
  }
);

const CSVErrors = mongoose.model<CsvErrors>("CSVErrors", csvErrors);

export default CSVErrors;
