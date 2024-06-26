import { Request, Response, NextFunction } from "express";
import csv from "csvtojson";
import fs from "fs";
import csvServices from "../services/csvServices";
import {
  addUser,
  getAllData,
  searchDataByName,
  totalSameNameUsers,
  totaluser,
  updateUser,
  uploadData,
} from "../repository/Csv/Repository";
import {
  createCSVdetails,
  updateCSVDetails,
} from "../repository/BulkUpload/Repository";
import { uploadErrors } from "../repository/CsvErrors/Repository";
import { CustomError } from "../middlewares/errorHandler";
import { validateData } from "../middlewares/validationMiddleware";
import { oneRow } from "../utils/CSVschema";

jest.mock("fs");
jest.mock("csvtojson");
jest.mock("../repository/Csv/Repository");
jest.mock("../repository/BulkUpload/Repository");
jest.mock("../repository/CsvErrors/Repository");
jest.mock("../middlewares/validationMiddleware");
jest.mock("../utils/CSVschema");

describe("csvServices", () => {
  let csvService: csvServices;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    csvService = new csvServices();
    req = {
      file: {
        originalname: "test.csv",
        path: "path/to/test.csv",
      } as any,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("uploadCsv", () => {
    it("should upload CSV successfully", async () => {
      (csv as any).mockImplementation(() => ({
        fromFile: jest
          .fn()
          .mockResolvedValue([{ name: "John" }, { name: "Doe" }]),
      }));
      (validateData as jest.Mock).mockImplementation((data: any) => ({
        value: data,
      }));
      (createCSVdetails as jest.Mock).mockResolvedValue({ _id: "123" });
      (oneRow as jest.Mock).mockImplementation((data: any, id: any) => data);

      await csvService.uploadCsv(req as Request, res as Response, next);

      expect(createCSVdetails).toHaveBeenCalled();
      expect(uploadData).toHaveBeenCalled();
      expect(uploadErrors).toHaveBeenCalled();
      expect(updateCSVDetails).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        messege: "CSV imported successfully",
        statusCode: 201,
      });
    });

    it("should handle upload errors", async () => {
      (csv as any).mockImplementation(() => ({
        fromFile: jest.fn().mockRejectedValue(new Error("Error")),
      }));
      (createCSVdetails as jest.Mock).mockResolvedValue({ _id: "123" });

      await csvService.uploadCsv(req as Request, res as Response, next);

      expect(updateCSVDetails).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(
        new CustomError("Error", 500)
      );
    });
  });

  describe("getData", () => {
    it("should fetch data successfully", async () => {
      (totaluser as jest.Mock).mockResolvedValue(2);
      (getAllData as jest.Mock).mockResolvedValue([
        { name: "John" },
        { name: "Doe" },
      ]);

      req.query = { _limit: "10", _page: "1" };

      await csvService.getData(req as Request, res as Response, next);

      expect(totaluser).toHaveBeenCalled();
      expect(getAllData).toHaveBeenCalledWith(0, "10");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Data fetched successfully",
        data: [{ name: "John" }, { name: "Doe" }],
        count: 2,
      });
    });

    it("should handle errors while fetching data", async () => {
      (totaluser as jest.Mock).mockRejectedValue(new Error("Error"));

      req.query = { _limit: "10", _page: "1" };

      await csvService.getData(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new CustomError("Error while fetching posts", 500)
      );
    });
  });

  describe("searchData", () => {
    it("should search data successfully", async () => {
      (totalSameNameUsers as jest.Mock).mockResolvedValue(2);
      (searchDataByName as jest.Mock).mockResolvedValue([
        { name: "John" },
        { name: "Doe" },
      ]);

      req.query = { _limit: "10", _page: "1", fname: "John" };

      await csvService.searchData(req as Request, res as Response, next);

      expect(totalSameNameUsers).toHaveBeenCalledWith("John");
      expect(searchDataByName).toHaveBeenCalledWith(0, "10", "John");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Data fetched successfully",
        data: [{ name: "John" }, { name: "Doe" }],
        count: 2,
      });
    });

    it("should handle errors while searching data", async () => {
      (totalSameNameUsers as jest.Mock).mockRejectedValue(new Error("Error"));

      req.query = { _limit: "10", _page: "1", fname: "John" };

      await csvService.searchData(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new CustomError("Error while fetching posts", 500)
      );
    });
  });

  describe("addRecord", () => {
    it("should add a record successfully", async () => {
      const user = { id: 1, name: "John" };
      (addUser as jest.Mock).mockResolvedValue(user);

      req.body = user;

      await csvService.addRecord(req as Request, res as Response, next);

      expect(addUser).toHaveBeenCalledWith(user);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Customer added successfully",
        user: user,
      });
    });

    it("should handle errors while adding a record", async () => {
      (addUser as jest.Mock).mockRejectedValue(new Error("Error"));

      req.body = { id: 1, name: "John" };

      await csvService.addRecord(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(new Error("Error"));
    });
  });

  describe("updateOneRecord", () => {
    it("should update a record successfully", async () => {
      const user = { id: 1, name: "John" };
      (updateUser as jest.Mock).mockResolvedValue(user);

      req.params = { _id: "1" };
      req.body = user;

      await csvService.updateOneRecord(req as Request, res as Response, next);

      expect(updateUser).toHaveBeenCalledWith("1", user);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Customer Record Updated successfully",
        user: user,
      });
    });

    it("should handle errors while updating a record", async () => {
      (updateUser as jest.Mock).mockRejectedValue(new Error("Error"));

      req.params = { _id: "1" };
      req.body = { id: 1, name: "John" };

      await csvService.updateOneRecord(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(new Error("Error"));
    });
  });
});
