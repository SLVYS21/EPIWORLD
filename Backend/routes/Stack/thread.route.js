const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Stack/thread.controller');
const auth = require('../../middlewares/auth.middleware');

router.post('/threads', auth, controller.create);

router.delete('/threads', auth, controller.deleteThread);

router.get('/threads/posts', auth, controller.getThreadPosts);

router.put('/threads', auth, controller.update);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Threads
 *   description: Thread management
 */

/**
 * @swagger
 * /threads:
 *   post:
 *     summary: Create a new thread
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "How to use Express?"
 *               description:
 *                 type: string
 *                 example: "I need help with Express routing."
 *     responses:
 *       200:
 *         description: Thread created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdBy:
 *                   type: string
 *       404:
 *         description: Need the thread title and description
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /threads:
 *   delete:
 *     summary: Delete a thread
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: threadId
 *         required: true
 *         description: ID of the thread to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deletion successfully done
 *       404:
 *         description: Thread not found or threadId not provided
 *       403:
 *         description: You are not authorized to delete this thread
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /threads/posts:
 *   get:
 *     summary: Get posts for a specific thread
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: threadId
 *         required: true
 *         description: ID of the thread
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: false
 *         description: Status of the posts
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of posts per page
 *         schema:
 *           type: integer
 *           default: 25
 *     responses:
 *       200:
 *         description: List of posts for the thread
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       404:
 *         description: Thread not found or threadId not provided
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /threads:
 *   put:
 *     summary: Update a thread
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               threadId:
 *                 type: string
 *                 example: "60d5ec49f1b2c8b1f8e4e1a1"
 *               title:
 *                 type: string
 *                 example: "Updated Thread Title"
 *               description:
 *                 type: string
 *                 example: "Updated description of the thread."
 *     responses:
 *       200:
 *         description: Thread updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Thread not found or threadId not provided
 *       500:
 *         description: Internal server error
 */