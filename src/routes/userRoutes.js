const express = require('express');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/verifyToken');
const userRouter = express.Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Successfully fetched users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: Users not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/user:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: The JWT token
 *     responses:
 *       200:
 *         description: Successfully fetched user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

userRouter.get('/',authController.getAllUsers)
.get('/user',verifyToken,authController.getUserById)

module.exports =userRouter;