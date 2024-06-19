import { NextFunction, Request, Response } from "express";
import { getAllData, totalCsvCount } from "../repository/BulkUpload/Repository";
import { CustomError } from "../middlewares/errorHandler";

export default class CSVDetails{
    getAllDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { _limit, _page } = req.query as any;
          const skip: number = (_page-1) * _limit;
          const count = await totalCsvCount();
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
    
}