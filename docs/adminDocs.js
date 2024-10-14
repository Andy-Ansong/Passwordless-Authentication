/**
 * @swagger
 * /api/v1/admin/createAdmin:
 *   post:
 *     summary: Create an admin
 *     security:
 *       - Authorization: []
 *     tags: [Admin]
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
 *                 format: email
 *           example:
 *             name: "John Doe"
 *             email: "user@example.com"
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *          description: Invalid email address
 */