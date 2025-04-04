const lostController = require('../../controllers/Lost/lost.controller');
const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth.middleware');
const multer = require('multer');

const upload =  multer({storage: multer.memoryStorage()});

/**
 * @swagger
 * tags:
 *   name: Lost
 *   description: API for managing lost and found items
*/

/**
 * @swagger
 * /api/lost:
 *   post:
 *     tags: [Lost]
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new lost or found item
 *     description: Creates a new lost or found item with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *                 description: The position where the item was lost or found.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of image URLs related to the lost or found item.
 *               status:
 *                 type: string
 *                 enum: [Finder, Loser]
 *                 description: The status indicating if the user is a finder or loser.
 *     responses:
 *       200:
 *         description: Successfully created the lost item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lost'
 *       404:
 *         description: Missing required fields.
 *       500:
 *         description: Internal server error.
*/
router.post('/', upload.array('images', 4), auth, lostController.create);

/**
 * @swagger
 * /lost:
 *   put:
 *     tags: [Lost]
 *     security:
 *       - bearerAuth: []
 *     summary: Update an existing lost or found item
 *     description: Updates the details of an existing lost or found item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lostId:
 *                 type: string
 *                 description: The ID of the lost item to update.
 *               position:
 *                 type: string
 *                 description: The new position of the item.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of new image URLs related to the lost item.
 *     responses:
 *       200:
 *         description: Successfully updated the lost item.
 *       404:
 *         description: Lost item not found or unauthorized.
 *       500:
 *         description: Internal server error.
*/
router.put('/', auth, lostController.update);

/**
 * @swagger
 * /api/lost/setlsf:
 *   post:
 *     tags: [Lost]
 *     security:
 *       - bearerAuth: []
 *     summary: Set the finder or loser for a lost item
 *     description: Allows the finder or loser to set the other party for a lost item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               finderId:
 *                 type: string
 *                 description: The ID of the finder.
 *               loserId:
 *                 type: string
 *                 description: The ID of the loser.
 *               lostId:
 *                 type: string
 *                 description: The ID of the lost item.
 *     responses:
 *       200:
 *         description: Successfully set the finder or loser.
 *       404:
 *         description: User or lost item not found, or unauthorized.
 *       500:
 *         description: Internal server error.
*/
router.post('/setlsf', auth, lostController.setLoserFinder);

/**
 * @swagger
 * /api/lost/iamtheloser:
 *   post:
 *     tags: [Lost]
 *     security:
 *       - bearerAuth: []
 *     summary: Mark a user as the loser of a lost item
 *     description: Allows a user to mark themselves as the loser of a lost item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lostId:
 *                 type: string
 *                 description: The ID of the lost item.
 *               loserId:
 *                 type: string
 *                 description: The ID of the user marking themselves as the loser.
 *     responses:
 *       200:
 *         description: Successfully marked as the loser.
 *       404:
 *         description: User or lost item not found.
 *       500:
 *         description: Internal server error.
*/
router.post('/iamtheloser', auth, lostController.iamtheloser);

/**
 * @swagger
 * /api/lost:
 *   get:
 *     tags: [Lost]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a list of lost items
 *     description: Fetches a paginated list of lost items.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *         description: The number of items to retrieve per page.
 *     responses:
 *       200:
 *         description: A list of lost items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lost'
 *       500:
 *         description: Internal server error.
*/
router.get('/', auth, lostController.getLosers);

/**
 * @swagger
 * /api/lost/losers:
 *   get:
 *     tags: [Lost]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve losers of a specific lost item
 *     description: Fetches the list of users marked as losers for a specific lost item.
 *     parameters:
 *       - in: query
 *         name: lostId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the lost item.
 *     responses:
 *       200:
 *         description: A list of losers for the specified lost item.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Lost item not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/losers', auth, lostController.getLosers);

/**
 * @swagger
 * /api/lost/comments:
 *   get:
 *     tags: [Lost]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve comments for a lost item
 *     description: Fetches comments related to a specific lost item.
 *     parameters:
 *       - in: query
 *         name: lostId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the lost item.
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 25
 *         description: The number of comments to retrieve per page.
 *     responses:
 *       200:
 *         description: A list of comments for the specified lost item.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Lost item not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/comments', auth, lostController.getLostComments);

/**
 * @swagger
 * components:
 *   schemas:
 *     Lost:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         position:
 *           type: string
 *         status:
 *           type: string
 *         loser:
 *           type: string
 *         finder:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         refundAt:
 *           type: string
 *           format: date-time
 *         losers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               at:
 *                 type: string
 *                 format: date-time
 *         type:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         tek:
 *           type: string
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         content:
 *           type: string
 *         poster:
 *           type: string
 *         lost:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

module.exports = router;