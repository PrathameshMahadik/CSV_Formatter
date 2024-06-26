import CSVSchema from "./Schema";
import { CsvDocument } from "./IModel";
import { logger } from "@storybook/node-logger";

export const uploadData = async (userData: {}) => {
  logger.info("CSV repo ::::>>>>>> inside upload csv data");
  return await CSVSchema.insertMany(userData);
};

export const getAllData = async (skip: number, _limit: number) => {
  logger.info("CSV repo ::::>>>>>> inside fetch data");
  return await CSVSchema.find({ isDeleted: false })
    .sort({ index: 1 })
    .skip(skip)
    .limit(_limit);
};

export const totaluser = async () => {
  logger.info("CSV repo ::::>>>>>> inside total user Count");
  return await CSVSchema.countDocuments();
};

export const totalSameNameUsers = async (fname: {}) => {
  logger.info("CSV repo ::::>>>>>> inside search count");
  return await CSVSchema.countDocuments({ fname });
};

export const addUser = async (data: CsvDocument) => {
  logger.info("CSV repo ::::>>>>>> inside add new user manually");
  const user = new CSVSchema({
    ...data,
  });
  return await user.save();
};

export const updateUser = async (_id: any, data: CsvDocument) => {
  logger.info("CSV repo ::::>>>>>> inside update user");
  return await CSVSchema.findByIdAndUpdate(_id, { ...data }, { new: true });
};

export const searchDataByName = async (
  skip: number,
  _limit: number,
  fname: string
) => {
  logger.info("CSV repo ::::>>>>>> inside search user by name");
  return await CSVSchema.find({ isDeleted: false, fname })
    .sort({ index: 1 })
    .skip(skip)
    .limit(_limit);
};
