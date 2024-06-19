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
      const saveData = await uploadData(validData);
      const saveErrors = await uploadErrors(errorsInCsv);
      fs.unlinkSync(file.path);
      const endTime = new Date();
      status = "completed";
      const updateBulkUploadData = await updateCSVDetails(
        uploadId,
        endTime,
        status,
        validData.length
      );
      res
        .status(201)
        .json({ messege: "CSV imported successfully", statusCode: 201 });
    } catch (error) {
      const updateBulkUploadData = await updateCSVDetails(
        uploadId,
        new Date(),
        "Failed",
        validData.length
      );
      next(error);
    }
  };

  getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _limit, _page } = req.query as any;
      const skip: number = (_page - 1) * _limit;
      const count = await totaluser();
      const data = await getAllData(skip, _limit);
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
    console.log(
      "🚀 ~ csvServices ~ searchData= ~ searchData:inside searchData"
    );

    try {
      const { _limit, _page, fname } = req.query as any;
      console.log("🚀 ~ csvServices ~ searchData= ~ fname:", fname);
      const skip: number = (_page - 1) * _limit;
      const count = await totalSameNameUsers(fname);
      console.log("🚀 ~ csvServices ~ getData= ~ count:", count);
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
      const { data } = req.body;
      const uploadId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
        "667177f421d7fc0b30abcdef"
      );
      const user = await addUser({ csvId: uploadId, ...data });
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
      const { data } = req.body;
      console.log("🚀 ~ csvServices ~ addRecord= ~ data:", data, _id);
      const user = await updateUser(_id, { ...data });
      res
        .status(201)
        .json({ message: "Customer Record Updated successfully", user: user });
    } catch (error) {
      next(error);
    }
  };
}

export default csvServices;
