import { NextFunction, Request, Response } from "express";
import CSVErrors from "../../services/csvErrors";

const services = new CSVErrors();

export default class Controller{
    getCSVErrors = async(req: Request, res: Response,next: NextFunction): Promise<void> => {
        return await services.getAllErrors(req,res,next)
      };
}