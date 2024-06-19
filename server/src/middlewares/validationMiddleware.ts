import { schema } from "../utils/CSVschema";

interface CsvItem {
  "First Name": string;
  "Last Name": string;
  Gender: string;
  Email: string;
  Phone: string;
  "Job Title": string;
}

export const validateData = (data: CsvItem[]) => {
  const results: any = [];
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    results.push({ errors: error.details.map((err: any):[] => err.message) });
  }
  return { error, value };
};
