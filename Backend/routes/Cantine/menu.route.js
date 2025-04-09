const express = require('express');
const menuController = require('../../controllers/Cantine/menu.controller');
const auth = require('../../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload =  multer({storage: storage});

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu management
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create or update a category
 *     tags: [Menu]
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
 *               description:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Category created or updated successfully
 *       500:
 *         description: Internal server error
 */
router.post('/categories', auth, menuController.createCategory);

router.get('/categories', auth, menuController.getCategories);
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/categories:
 *   put:
 *     summary: Update a category
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.put('/categories', auth, menuController.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       403:
 *         description: Category is in use
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete('/categories/:id', auth, menuController.deleteCategory);

/**
 * @swagger
 * /api/menus:
 *   post:
 *     summary: Create a new menu
 *     tags: [Menu]
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
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               mainpic:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                   currency:
 *                     type: string
 *             required:
 *               - name
 *               - category
 *               - price
 *     responses:
 *       200:
 *         description: Menu created successfully
 *       404:
 *         description: Menu already exists
 *       500:
 *         description: Internal server error
 */
router.post('/menus', upload.array('images', 4), auth, menuController.createMenu);

router.get('/menus', auth, menuController.getMenus);
/**
 * @swagger
 * /api/menus:
 *   get:
 *     summary: Get all categories
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Menus retrieved successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/menus/{id}:
 *   put:
 *     summary: Update a menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                   currency:
 *                     type: string
 *               mainpic:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Internal server error
 */
router.put('/menus/:id', auth, menuController.updateMenu);

/**
 * @swagger
 * /api/menus/{id}:
 *   delete:
 *     summary: Delete a menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu deleted successfully
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Internal server error
 */
router.delete('/menus/:id', auth, menuController.deleteMenu);

/**
 * @swagger
 * /api/variants:
 *   post:
 *     summary: Create a new variant
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menuId:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                   currency:
 *                     type: string
 *               mainpic:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               defaultStock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Variant created successfully
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Internal server error
 */
router.post('/variants', upload.array('images', 4), auth, menuController.createVariant);

/**
 * @swagger
 * /api/variants/{id}:
 *   put:
 *     summary: Update a variant
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                   currency:
 *                     type: string
 *               defaultStock:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               mainpic:
 *                 type: string
 *     responses:
 *       200:
 *         description: Variant updated successfully
 *       404:
 *         description: Variant not found
 *       500:
 *         description: Internal server error
 */
router.put('/variants/:id', auth, menuController.updateVariant);

/**
 * @swagger
 * /api/variants/{id}:
 *   delete:
 *     summary: Delete a variant
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Variant deleted successfully
 *       404:
 *         description: Variant not found
 *       500:
 *         description: Internal server error
 */
router.delete('/variants/:id', auth, menuController.deleteVariant);

/**
 * @swagger
 * /api/dailymenu:
 *   post:
 *     summary: Create a daily menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               plates:
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
 *                           price:
 *                             type: object
 *                             properties:
 *                               value:
 *                                 type: number
 *                               currency:
 *                                 type: string
 *     responses:
 *       200:
 *         description: Daily menu created successfully
 *       404:
 *         description: Daily menu already exists
 *       500:
 *         description: Internal server error
 */
router.post('/dailymenu', auth, menuController.createDailyMenu);

/**
 * @swagger
 * /api/dailymenu:
 *   get:
 *     summary: Get the daily menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily menu retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/dailymenu/today', auth, menuController.getDailyMenu);

router.get('/dailymenu/', auth, menuController.getDailyMenus);

router.get('/menubycategory', auth, menuController.getMenuByCat);

module.exports = router;