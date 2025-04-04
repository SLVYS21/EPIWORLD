const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Stack/post.controller');
const auth = require('../../middlewares/auth.middleware');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload =  multer({storage: storage})

router.post('/posts', upload.array('images', 4), auth, controller.create);

router.put('/posts/status', auth, auth, controller.changeStatus);

router.get('/posts/user', auth, controller.getUserPost);

router.get('/posts', auth, controller.getPosts);

router.get('/posts/flags', auth, controller.findByFlag);

router.delete('/posts', auth, controller.deletePost);

router.post('/posts/comments', auth, controller.commentPost);

router.get('/posts/comments', auth, controller.getPostComments);

router.post('/posts/like', auth, controller.likePost);

router.post('/posts/dislike', auth, controller.dislikePost);

router.get('/comments/sub', auth, controller.getSubComments);

router.post('/comments/like', auth, controller.likeComment);

router.post('/comments/dislike', auth, controller.dislikeComment);

router.put('/comments', auth, controller.updateComment);

router.delete('/comments', auth, controller.deleteComment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
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
 *                 example: "How to use Mongoose?"
 *               body:
 *                 type: string
 *                 example: "I need help with Mongoose queries."
 *               type:
 *                 type: string
 *                 enum: ["Info", "Problem"]
 *               flags:
 *                 type: array
 *                 items:
 *                   type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *       404:
 *         description: Type and body are required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/status:
 *   put:
 *     summary: Change the status of a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         description: ID of the post to change status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Status changed successfully
 *       404:
 *         description: Post not found or postId not provided
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/user:
 *   get:
 *     summary: Get posts by user
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *       - in: query
 *         name: type
 *         required: false
 *         description: Type of posts
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: false
 *         description: Status of posts
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of posts by user
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
 *                   body:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *       - in: query
 *         name: type
 *         required: false
 *         description: Type of posts
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: false
 *         description: Status of posts
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all posts
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
 *                   body:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/flags:
 *   get:
 *     summary: Find posts by flags
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: flags
 *         required: true
 *         description: Array of flags to filter posts
 *         schema:
 *           type: array
 *           items:
 *             type: string
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
 *         description: List of posts matching the flags
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
 *                   body:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found or postId not provided
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/comments:
 *   post:
 *     summary: Comment on a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 example: "60d5ec49f1b2c8b1f8e4e1a1"
 *               body:
 *                 type: string
 *                 example: "This is a comment on the post."
 *               flags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 body:
 *                   type: string
 *       404:
 *         description: Post not found or body is empty
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/comments:
 *   get:
 *     summary: Get comments for a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         description: ID of the post to get comments for
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
 *         description: Number of comments per page
 *         schema:
 *           type: integer
 *           default: 25
 *     responses:
 *       200:
 *         description: List of comments for the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   body:
 *                     type: string
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/comments/sub:
 *   get:
 *     summary: Get sub-comments for a comment
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: commentId
 *         required: true
 *         description: ID of the comment to get sub-comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of sub-comments for the comment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   body:
 *                     type: string
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/like:
 *   post:
 *     summary: Like a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         description: ID of the post to like
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post liked successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/dislike:
 *   post:
 *     summary: Dislike a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         description: ID of the post to dislike
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post disliked successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/comments/like:
 *   post:
 *     summary: Like a comment
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: commentId
 *         required: true
 *         description: ID of the comment to like
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment liked successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/comments/dislike:
 *   post:
 *     summary: Dislike a comment
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: commentId
 *         required: true
 *         description: ID of the comment to dislike
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment disliked successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/comments:
 *   put:
 *     summary: Update a comment
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: string
 *                 example: "60d5ec49f1b2c8b1f8e4e1a2"
 *               body:
 *                 type: string
 *                 example: "Updated comment body."
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found or body is empty
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/comments:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: commentId
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */