import Joi from "joi";
import { CsvDocument } from "../repository/Csv/IModel";

export const schema = Joi.object({
  Index: Joi.string().required(),
  "First Name": Joi.string().required(),
  "Last Name": Joi.string().required(),
  Gender: Joi.string().required(),
  Email: Joi.string().email().required(),
  Phone: Joi.string().required(),
  "Job Title": Joi.string().required(),
});

export const oneRow = (value: any, uploadId: any):CsvDocument => {
  return {
    csvId: uploadId,
    fname: value["First Name"],
    lname: value["Last Name"],
    gender: value["Gender"],
    email: value["Email"],
    phone_no: value["Phone"],
    job_title: value["Job Title"],
  };
};
