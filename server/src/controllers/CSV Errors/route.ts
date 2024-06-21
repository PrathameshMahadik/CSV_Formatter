import express from "express";
import Controller from "./controllers";

const controller = new Controller();
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bulk Errors
 *   description: Endpoints related to bulkError operations
 */

/**
 * @swagger
 * /csverrors:
 *   get:
 *     summary: Get CSV errors
 *     tags: [Bulk Errors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: _page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: _limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *       - in: query
 *         name: csvId
 *         schema:
 *           type: string
 *         description: CSV ID
 *     responses:
 *       200:
 *         description: CSV errors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 total:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 */
router.get("/csverrors", controller.getCSVErrors);

export default router;
