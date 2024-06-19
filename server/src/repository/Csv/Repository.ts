import CSVSchema from "./Schema";
import { CsvDocument } from "./IModel";

export const uploadData = async (userData: {}) => {
  return await CSVSchema.insertMany(userData);
};

export const getAllData = async (skip: number, _limit: number) => {
  return await CSVSchema.find({ isDeleted: false })
    .sort({ index: 1 })
    .skip(skip)
    .limit(_limit);
};

export const totaluser = async () => {
  return await CSVSchema.countDocuments();
};

export const totalSameNameUsers = async (fname: string) => {
  return await CSVSchema.countDocuments({ fname });
};

export const addUser = async (data: CsvDocument) => {
  const user = new CSVSchema({
    ...data,
  });
  return await user.save();
};

export const updateUser = async (_id: any, data: CsvDocument) => {
  return await CSVSchema.findByIdAndUpdate(_id, { ...data }, { new: true });
};

export const searchDataByName = async (
  skip: number,
  _limit: number,
  fname: string
) => {
  return await CSVSchema.find({ isDeleted: false, fname })
    .sort({ index: 1 })
    .skip(skip)
    .limit(_limit);
};
