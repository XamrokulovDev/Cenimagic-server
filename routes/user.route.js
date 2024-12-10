const { Router } = require("express");
const router = Router();
const { Limit } = require("../middlewares/auth");
const {
    Register,
    Login,
} = require("../controllers/user.controller");

router.post("/register", Register);
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user by providing username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request
 */
router.post("/login", Limit, Login);
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user by providing login credentials (email and password).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email for login
 *               password:
 *                 type: string
 *                 description: The user's password for authentication
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       401:
 *         description: Unauthorized - Invalid credentials
 */

module.exports = router;