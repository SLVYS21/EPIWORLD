const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
*/

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               genre:
 *                 type: string
 *                 enum: [M, F]
 *               profil:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - genre
 *     responses:
 *       200:
 *         description: User created successfully
 *       403:
 *         description: User already exists
 *       404:
 *         description: Required fields missing
 *       500:
 *         description: Internal server error
*/
router.post('/user/signup', upload.single('profile'), userController.signup);

/**
 * @swagger
 * /api/user/login:
 *   get:
 *     summary: Login a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       404:
 *         description: User not found or invalid password
 *       500:
 *         description: Internal server error
 */
router.get('/user/login', userController.login);

/**
 * @swagger
 * /api/user/change-status:
 *   put:
 *     summary: Change user status
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Waiting, Validated, Bloqued]
 *               userId:
 *                 type: string
 *             required:
 *               - status
 *               - userId
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/user/change-status', auth, userController.changeStatus);

/**
 * @swagger
 * /api/user/upgrade:
 *   put:
 *     summary: Upgrade user privileges
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               tek:
 *                 type: string
 *                 enum: [Tek 1, Tek 2, Tek 3, Coding, Msc Pro 1, Msc Pro 2, Pedago]
 *               admin:
 *                 type: boolean
 *               cantine:
 *                 type: boolean
 *             required:
 *               - userId
 *     responses:
 *       200:
 *         description: User upgraded successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/user/upgrade', auth, userController.upgrade);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: userId
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/user/profile', auth, userController.getProfile);

/**
 * @swagger
 * /api/user/waiters:
 *   get:
 *     summary: Get users with status "Waiting"
 *     tags: [Users]
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
 *     responses:
 *       200:
 *         description: List of waiting users
 *       500:
 *         description: Internal server error
 */
router.get('/user/waiters', auth, userController.getWaiters);

/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
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
 *         description: List of users
 *       500:
 *         description: Internal server error
 */
router.get('/user/', auth, userController.getUsers);

module.exports = router;