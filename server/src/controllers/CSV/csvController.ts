import { NextFunction, Request, Response } from "express";
import csvServices from "../../services/csvServices";
import { logger } from "@storybook/node-logger";

const services = new csvServices();
class csvController {
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    logger.info('Inside create CSV controller');
    return await services.uploadCsv(req, res, next);
  };

  fetchData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    logger.info('Inside fetch Data controller');
    return await services.getData(req, res, next);
  };

  searchData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await services.searchData(req, res, next);
  };

  addCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await services.addRecord(req, res, next);
  };

  updateRecord = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await services.updateOneRecord(req, res, next);
  };
}

export default csvController;
