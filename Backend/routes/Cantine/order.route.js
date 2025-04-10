const express = require('express');
const orderController = require('../../controllers/Cantine/order.controller');
const auth = require('../../middlewares/auth.middleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuId:
 *                       type: string
 *                     variants:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           variantId:
 *                             type: string
 *                           quantity:
 *                             type: number
 *               placedBy:
 *                 type: string
 *               note:
 *                 type: string
 *               customerName:
 *                 type: string
 *             required:
 *               - items
 *     responses:
 *       200:
 *         description: Order created successfully
 *       404:
 *         description: Menu or user not found
 *       500:
 *         description: Internal server error
 */
router.post('/orders', orderController.create);

/**
 * @swagger
 * /api/orders/change-customer:
 *   put:
 *     summary: Change the customer of an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               customerId:
 *                 type: string
 *             required:
 *               - orderId
 *               - customerId
 *     responses:
 *       200:
 *         description: Customer changed successfully
 *       404:
 *         description: Order or customer not found
 *       500:
 *         description: Internal server error
 */
router.put('/orders/change-customer', auth, orderController.changeCustomer);

/**
 * @swagger
 * /api/orders/set-man:
 *   put:
 *     summary: Assign a user to manage an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *             required:
 *               - orderId
 *     responses:
 *       200:
 *         description: Order manager set successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put('/orders/set-man', auth, orderController.setMan);

/**
 * @swagger
 * /api/orders/update-items:
 *   put:
 *     summary: Update items in an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuId:
 *                       type: string
 *                     variants:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           variantId:
 *                             type: string
 *                           quantity:
 *                             type: number
 *             required:
 *               - orderId
 *               - items
 *     responses:
 *       200:
 *         description: Order items updated successfully
 *       404:
 *         description: Order or menu not found
 *       500:
 *         description: Internal server error
 */
router.put('/orders/update-items', auth, orderController.updateItems);

/**
 * @swagger
 * /api/orders/track:
 *   get:
 *     summary: Track an order by tracking number
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order tracked successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/orders/track', auth, orderController.trackOrder);

/**
 * @swagger
 * /api/orders/user:
 *   get:
 *     summary: Get orders for a specific user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 25
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/orders/user', auth, orderController.getUserOrders);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 25
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       403:
 *         description: Access denied
 *       500:
 *         description: Internal server error
 */
router.get('/orders', auth, orderController.getOrders);

/**
 * @swagger
 * /api/orders/update-status:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: ["waiting", "confirmed", "cooking", "shipping", "delivered", "canceled"]
 *             required:
 *               - orderId
 *               - status
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put('/orders/update-status', auth, orderController.updateStatus);

/**
 * @swagger
 * /api/orders/set-payment:
 *   put:
 *     summary: Set payment method for an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               payment:
 *                 type: string
 *                 enum: ["MTN Mobile Money", "Espèces", "Moov Money", "Celtis Cash"]
 *             required:
 *               - orderId
 *               - payment
 *     responses:
 *       200:
 *         description: Payment method set successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put('/orders/set-payment', auth, orderController.setPayment);

module.exports = router;