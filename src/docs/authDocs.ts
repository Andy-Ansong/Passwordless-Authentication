
/**
 * @swagger
 * /api/v1/auth/request:
 *   post:
 *     summary: Request a one-time code for login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *           example:
 *             email: "user@example.com"
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *          description: Invalid email address
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Verify one-time code for login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The one-time code for login
 *           example: { "code": "123456" }
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *          description: The one-time code is invalid or expired
 *       404:
 *          description: No with that one-time code
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     security:
 *       - Authorization: []
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized, user must log in first
 *       500:
 *          description: Failed to log out user
 */