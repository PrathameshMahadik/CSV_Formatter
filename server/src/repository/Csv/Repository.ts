import CSVSchema from "./Schema";
import { CsvDocument } from "./IModel";
import { logger } from "@storybook/node-logger";

export const uploadData = async (userData: {}) => {
    // logger
  return await CSVSchema.insertMany(userData);
};

export const getAllData = async (skip: number, _limit: number) => {
  logger.info('fetch Data repo ::::>>>>>> inside fetch data repo');
  return await CSVSchema.find({ isDeleted: false })
    .sort({ index: 1 })
    .skip(skip)
    .limit(_limit);
};

export const totaluser = async () => {
  logger.info('Total user Count repo ::::>>>>>> ');
  return await CSVSchema.countDocuments();
};

export const totalSameNameUsers = async (fname: {}) => {
  logger.info('fetch Data repo ::::>>>>>> inside fetch data repo');
  return await CSVSchema.countDocuments({ fname });
};

export const addUser = async (data: CsvDocument) => {
    // logger

  const user = new CSVSchema({
    ...data,
  });
  return await user.save();
};

export const updateUser = async (_id: any, data: CsvDocument) => {
    // logger
  return await CSVSchema.findByIdAndUpdate(_id, { ...data }, { new: true });
};

export const searchDataByName = async (
  skip: number,
  _limit: number,
  fname: string
) => {
    // logger
  return await CSVSchema.find({ isDeleted: false, fname })
    .sort({ index: 1 })
    .skip(skip)
    .limit(_limit);
};
