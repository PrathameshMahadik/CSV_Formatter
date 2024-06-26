import mongoose from "mongoose";

export interface CsvDocument{
  csvId:mongoose.Schema.Types.ObjectId,
  fname:string,
  lname: string;
  gender?: string;
  email: string;
  phone_no: string;
  job_title: string;
  isDeleted?: boolean,
}
