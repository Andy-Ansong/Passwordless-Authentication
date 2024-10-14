
/**
 * @swagger
 * /api/v1/employees:
 *  post:
 *   summary: Create an employee
 *   security:
 *      - Authorization: []
 *   tags: [Employee]
 *   requesetBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              gender:
 *                type: string
 *                enum: [Male, Female]
 *              image:
 *                type: string
 *              birthData:
 *                type: string
 *                format: date
 *              phoneNumber:
 *                type: string
 *              bio:
 *                type: string
 *          example:
 *            {
 *              "name": "John Doe",
 *              "gender": "Male",
 *              "iamge": "https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg",
 *              "birthDate": "2004-04-14",
 *              "phoneNumber": "+233509895421",
 *              "bio": "Software Developer"
 *            }
 *
 */

/**
* @swagger
* /api/v1/employees:
*   get:
*     summary: Get all employees
*     security:
*       - Authorization: []
*     tags: [Employee]
*     responses:
*       200:
*         description: A successful response
*       401:
*         description: Unauthorized, user must log in first
*       403:
*         description: Forbidden, user is not an employee, hr or admin
*       500:
*          description: Failed to retrive employees
*/

/**
 * @swagger
 * /api/v1/employees/me:
 *   get:
 *     summary: Get current user employee
 *     security:
 *       - Authorization: []
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Unauthorized, user must log in first
*       403:
*         description: Forbidden, user is not an employee, hr or admin
 *       404:
 *         description: Employee not found
 */

/**
 * @swagger
 * /api/v1/employees/me:
 *   patch:
 *     summary: Update current employee profile
 *     security:
 *       - Authorization: []
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Unauthorized, user must log in first
 *       403:
 *         description: Forbidden, user is not an employee, hr or admin
 *       404:
 *         description: Employee not found
 *       500:
 *          description: Failed to update employee
 */

/**
 * @swagger
 * /api/v1/employees/{employee_id}:
 *   get:
 *     summary: Get employee by id
 *     security:
 *       - Authorization: []
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee id
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Unauthorized, user must log in first
 *       403:
 *         description: Forbidden, user is not an admin
 *       404:
 *         description: Employee not found
 */

/**
 * @swagger
 * /api/v1/employees/{employee_id}:
 *   patch:
 *     summary: Update employee profile by id
 *     security:
 *       - Authorization: []
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee id
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Unauthorized, user must log in first
 *       403:
 *         description: Forbidden, user is not an hr or admin
 *       404:
 *         description: Employee not found
 *       500:
 *          description: Failed to update employee
 */

/**
 * @swagger
 * /api/v1/employees/{employee_id}:
 *   delete:
 *     summary: Delete employee profile by id
 *     security:
 *       - Authorization: []
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee id
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Unauthorized, user must log in first
 *       403:
 *         description: Forbidden, user is not an employee, hr or admin
 *       404:
 *         description: Employee not found
 *       500:
 *          description: Failed to update employee
 */