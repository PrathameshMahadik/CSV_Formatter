import { NextFunction, Request, Response } from "express";
import { CustomError } from "../middlewares/errorHandler";
import { getErrors, totalErrorCount } from "../repository/CsvErrors/Repository";

export default class CSVErrors {
  getAllErrors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _limit, _page, uploadId } = req.query as any;
      const skip: number = (_page - 1) * _limit;
      const count = await totalErrorCount(uploadId);
      const data = await getErrors(uploadId, skip, _limit);
      res.status(200).json({
        message: "Errors fetched successfully",
        data: data,
        count: count,
      });
    } catch (error) {
      next(new CustomError("Error while fetching posts", 500));
    }
  };
}
