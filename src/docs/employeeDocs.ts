/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Create an employee
 *     security:
 *       - Authorization: []
 *     tags: [Employee]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                gender:
 *                  type: string
 *                  enum: [Male, Female]
 *                email:
 *                  type: string
 *                image:
 *                  type: string
 *                birthData:
 *                  type: string
 *                  format: date
 *                phoneNumber:
 *                  type: string
 *                bio:
 *                  type: string
 *            example:
 *              {
 *                "name": "John Doe",
 *                "gender": "Male",
 *                "email": "johnDoe@gmail.com",
 *                "image": "https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg",
 *                "birthDate": "2004-04-14",
 *                "phoneNumber": "+233509895421",
 *                "bio": "Software Developer"
 *              }
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
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     security:
 *       - Authorization: []
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *         description: Page to fetch
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: How to sort employees
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of employee to search for
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 5
 *         description: Number of employees to fetch
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
 * /api/v1/employees/current:
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
 * /api/v1/employees/current:
 *   patch:
 *     summary: Update current employee profile
 *     security:
 *       - Authorization: []
 *     tags: [Employee]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: string
 *                birthData:
 *                  type: string
 *                  format: date
 *                phoneNumber:
 *                  type: string
 *                bio:
 *                  type: string
 *            example:
 *              {
 *                "image": "https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg",
 *                "birthDate": "2004-04-14",
 *                "phoneNumber": "+233509895421",
 *                "bio": "Software Developer"
 *              }
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
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get employee by id
 *     security:
 *       - Authorization: []
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
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
 * /api/v1/employees/{id}:
 *   patch:
 *     summary: Update employee profile by id
 *     security:
 *       - Authorization: []
 *     tags: [Employee]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                image:
 *                  type: string
 *            example:
 *              {
 *                "name": "John Doe",
 *                "email": "johnDoe@gmail.com",
 *                "image": "https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg"
 *              }
 *     parameters:
 *       - in: path
 *         name: id
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
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete employee profile by id
 *     security:
 *       - Authorization: []
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
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