const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Cantine/dailypoint.controller');
const auth = require('../../middlewares/auth.middleware')

router.get('/dailypoint', auth, controller.getDailyPoints);

router.get('/dailypoint/menu/:menuId', auth, controller.getPointByMenu);

router.get('/dailypoint/date/:date', auth, controller.getDailyPointForSpecificDate);


/**
 * @swagger
 * /api/dailypoint:
 *   get:
 *     summary: Get DailyPoints with pagination and date range
 *     tags: [DailypPoints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of records per page
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: startDate
 *         in: query
 *         required: false
 *         description: Start date for filtering
 *         schema:
 *           type: string
 *           format: date
 *       - name: endDate
 *         in: query
 *         required: false
 *         description: End date for filtering
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: A list of DailyPoints
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 dailyPoints:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DailyPoint'
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/dailypoint/menu/{menuId}:
 *   get:
 *     summary: Get DailyPoint for a specific menu
 *     tags: [DailypPoints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: menuId
 *         in: path
 *         required: true
 *         description: ID of the menu
 *         schema:
 *           type: string
 *       - name: startDate
 *         in: query
 *         required: false
 *         description: Start date for filtering
 *         schema:
 *           type: string
 *           format: date
 *       - name: endDate
 *         in: query
 *         required: false
 *         description: End date for filtering
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: A list of DailyPoints for the specified menu
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DailyPoint'
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/dailypoint/date/{date}:
 *   get:
 *     summary: Get DailyPoint for a specific date
 *     tags: [DailypPoints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date for which to retrieve the DailyPoint
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: DailyPoint for the specified date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DailyPoint'
 *       '404':
 *         description: DailyPoint not found
 *       '500':
 *         description: Internal Server Error
 */

module.exports = router;