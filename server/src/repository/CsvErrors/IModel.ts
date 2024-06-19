import { Types } from "mongoose";

export interface CsvErrors {
  csvId?: Types.ObjectId;
  row: number;
  error: string;
}
