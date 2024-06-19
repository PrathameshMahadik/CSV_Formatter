import express, { Request, Response, NextFunction } from "express";
// import { upload } from "../../utils/multerconfig";
import csvController from "./csvController";
import { customerValidator, uploadCsvValidator, validatePagination, validateUpdateCustomer } from "./validation";
import { validate } from "../../middlewares/errorValidate";
import { upload } from "../../utils/multerconfig";

const controller = new csvController();
const router = express.Router();

router.post(
  "/create",
  upload.single("csvFile"),
  uploadCsvValidator,
  validate,
  controller.create
);

router.get("/data", validatePagination, validate, controller.fetchData);

router.get("/search", validatePagination, validate, controller.searchData);

router.post("/addcustomer",customerValidator,validate, controller.addCustomer);

router.put("/updaterecord/:_id",validateUpdateCustomer,validate, controller.updateRecord);

export default router;
