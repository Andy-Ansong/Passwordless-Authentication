// /**
//  * @swagger
//  * /api/v1/users:
//  *   get:
//  *     summary: Get all users
//  *     tags: [User]
//  *     responses:
//  *       200:
//  *         description: A successful response
//  *       500:
//  *          description: Failed to retrive users
//  */

// /**
//  * @swagger
//  * /api/v1/users/me:
//  *   delete:
//  *     summary: delete current user
//  *     security:
//  *       - Authorization: []
//  *     tags: [User]
//  *     responses:
//  *       204:
//  *         description: Successfully deleted profile
//  *       401:
//  *         description: Unauthorized, user must log in first
//  *       404:
//  *         description: Profile not found
//  *       500:
//  *          description: Failed to delete profile
//  */

// /**
//  * @swagger
//  * /api/v1/users/me:
//  *   get:
//  *     summary: Get current user details
//  *     security:
//  *       - Authorization: []
//  *     tags: [User]
//  *     responses:
//  *       200:
//  *         description: A successful response
//  *       404:
//  *          description: User not found
//  */