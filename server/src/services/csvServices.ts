import { Request, Response, NextFunction } from "express";
import csv from "csvtojson";
import fs from "fs";
import {
  addUser,
  getAllData,
  searchDataByName,
  totalSameNameUsers,
  totaluser,
  updateUser,
  uploadData,
} from "../repository/Csv/Repository";
import { CustomError } from "../middlewares/errorHandler";
import { validateData } from "../middlewares/validationMiddleware";
import { oneRow } from "../utils/CSVschema";
import {
  createCSVdetails,
  updateCSVDetails,
} from "../repository/BulkUpload/Repository";
import { uploadErrors } from "../repository/CsvErrors/Repository";
import { CsvDocument } from "../repository/Csv/IModel";
import { CsvErrors } from "../repository/CsvErrors/IModel";
import mongoose, { ObjectId } from "mongoose";
import { logger } from "@storybook/node-logger";

class csvServices {
  uploadCsv = async (req: Request, res: Response, next: NextFunction) => {
    let uploadId: any;
    const errorsInCsv: CsvErrors[] = [];
    const validData: CsvDocument[] = [];
    try {
      const { file } = req;
      const fileName = req.file?.originalname;
      if (!file || !fileName) {
        throw new CustomError("No file uploaded", 400);
      }
      let status = "in-progress";
      const startTime = new Date();
      let uploadRecord = {
        startTime: startTime,
        endTime: startTime,
        numItemsUploaded: 0,
        status: status,
        fileName: fileName,
        errorDetails: null,
      };
      const result = await createCSVdetails(uploadRecord);
      uploadId = result._id;
      const jsonArray = await csv().fromFile(file.path);
      jsonArray.forEach((item, index) => {
        const { error, value } = validateData(item);
        if (error) {
          errorsInCsv.push({
            csvId: uploadId,
            row: index + 1,
            error: error.message,
          });
        } else {
          validData.push(oneRow(value, uploadId));
        }
      });
      await uploadData(validData);
      await uploadErrors(errorsInCsv);
      fs.unlinkSync(file.path);
      const endTime = new Date();
      status = "completed";
      await updateCSVDetails(uploadId, endTime, status, validData.length);
      res
        .status(201)
        .json({ messege: "CSV imported successfully", statusCode: 201 });
    } catch (error) {
      await updateCSVDetails(uploadId, new Date(), "Failed", validData.length);
      next(error);
    }
  };

  getData = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Inside fetch Data Service');
    try {
      const { _limit, _page } = req.query as any;
      const skip: number = (_page - 1) * _limit;
      logger.info('fetch Data Service ::::>>>>>> before count total users');
      const count = await totaluser();
      logger.info(`fetch Data Service ::::>>>>>> after count total users Count::>> ${count}`);
      const data = await getAllData(skip, _limit);
      logger.info('fetch Data Service ::::>>>>>> after data fetched from repo.');
      res.status(200).json({
        message: "Data fetched successfully",
        data: data,
        count: count,
      });
    } catch (error) {
      next(new CustomError("Error while fetching posts", 500));
    }
  };

  searchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _limit, _page, fname } = req.query as any;
      const skip: number = (_page - 1) * _limit;
      const count = await totalSameNameUsers(fname);
      const data = await searchDataByName(skip, _limit, fname);
      res.status(200).json({
        message: "Data fetched successfully",
        data: data,
        count: count,
      });
    } catch (error) {
      next(new CustomError("Error while fetching posts", 500));
    }
  };

  addRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await addUser({ ...req.body });
      res
        .status(201)
        .json({ message: "Customer added successfully", user: user });
    } catch (error) {
      next(error);
    }
  };

  updateOneRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params;
      const user = await updateUser(_id, { ...req.body });
      res
        .status(201)
        .json({ message: "Customer Record Updated successfully", user: user });
    } catch (error) {
      next(error);
    }
  };
}

export default csvServices;
