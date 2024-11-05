/**
 * @swagger
 * /image:
 *   post:
 *     summary: Upload an image
 *     security:
 *       - Authorization: []
 *     tags: [Image]
 *     requestBody:
 *       required: true
 *       content:
 *         image/*:
 *           schema:
 *             image:
 *               type: string
 *               format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       401:
 *         description: Unauthorized, user must log in
 *       500:
 *         description: There was an error uploading the image
 */

