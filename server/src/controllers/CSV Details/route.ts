import express from "express";
import Controller from "./controllers";

const controller = new Controller();
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CSV Details
 *   description: Endpoints related to CSV Details
 */

/**
 * @swagger
 * /csvdetails:
 *   get:
 *     summary: Get CSV details
 *     tags: [CSV Details]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: CSV details retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/csvdetails", controller.getCSVDetails);

export default router;
