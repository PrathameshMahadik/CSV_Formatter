import express, { Request, Response, NextFunction } from "express";
// import { validate } from "../../middlewares/errorValidate";
import Controller from "./controllers";

const controller = new Controller();
const router = express.Router();

router.get("/csvdetails", controller.getCSVDetails);

export default router;
