import { NextFunction, Request, Response } from "express";
import CSVDetails from "../../services/csvDetails";

const services = new CSVDetails();

export default class Controller{
    getCSVDetails = async(req: Request, res: Response,next: NextFunction): Promise<void> => {
        return await services.getAllDetails(req,res,next)
      };
}