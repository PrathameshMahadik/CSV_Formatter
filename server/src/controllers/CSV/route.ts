import express from "express";
import csvController from "./csvController";
import {
  customerValidator,
  uploadCsvValidator,
  validatePagination,
  validateUpdateCustomer,
} from "./validation";
import { validate } from "../../middlewares/errorValidate";
import { upload } from "../../utils/multerconfig";
import { verifyToken } from "../../middlewares/jwtValidation";

const controller = new csvController();
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CSV
 *   description: Endpoints related to CSV operations
 */

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Upload CSV file
 *     tags: [CSV]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               csvFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: CSV file uploaded successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/create",
  upload.single("csvFile"),
  verifyToken,
  uploadCsvValidator,
  validate,
  controller.create
);

/**
 * @swagger
 * /data:
 *   get:
 *     summary: Fetch CSV data
 *     tags: [CSV]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: _limit
 *         schema:
 *           type: integer
 *         description: Limit number of records
 *       - in: query
 *         name: _page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: Data fetched successfully
 *       400:
 *         description: Invalid input
 */
router.get(
  "/data",
  verifyToken,
  validatePagination,
  validate,
  controller.fetchData
);

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search CSV data
 *     tags: [CSV]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: _limit
 *         schema:
 *           type: integer
 *         description: Limit number of records
 *       - in: query
 *         name: _page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: fname
 *         schema:
 *           type: string
 *         description: First name to search
 *     responses:
 *       200:
 *         description: Data fetched successfully
 *       400:
 *         description: Invalid input
 */
router.get(
  "/search",
  verifyToken,
  validatePagination,
  validate,
  controller.searchData
);

/**
 * @swagger
 * /addcustomer:
 *   post:
 *     summary: Add a new customer
 *     tags: [CSV]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               phone_no:
 *                 type: string
 *               job_title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer added successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/addcustomer",
  verifyToken,
  customerValidator,
  validate,
  controller.addCustomer
);

/**
 * @swagger
 * /updaterecord/{_id}:
 *   put:
 *     summary: Update a customer record
 *     tags: [CSV]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer record ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               phone_no:
 *                 type: string
 *               job_title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer record updated successfully
 *       400:
 *         description: Invalid input
 */

router.put(
  "/updaterecord/:_id",
  verifyToken,
  validateUpdateCustomer,
  validate,
  controller.updateRecord
);

export default router;
