const express = require('express')
const employeeRouter = express.Router()
const employeeController = require('../controllers/employeeController')
const auth = require('../middleware/auth')
const role = require('../middleware/role')

/**
 * @swagger
 * /api/v1/employee:
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
employeeRouter.post('/', auth, role(['employee', 'hr', 'admin']), employeeController.createEmployee)

/**
* @swagger
* /api/v1/employee:
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
employeeRouter.get('/', auth, role(['employee', 'hr', 'admin']), employeeController.getAllEmployees)

/**
 * @swagger
 * /api/v1/Employee/{employee_id}:
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
employeeRouter.get('/:employee_id', auth, role(['employee', 'hr', 'admin']), employeeController.getEmployeeById)

/**
 * @swagger
 * /api/v1/employee/me:
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
employeeRouter.get('/me', auth, role(['employee', 'hr', 'admin']), employeeController.getCurrentEmployee)

/**
 * @swagger
 * /api/v1/employee/{employee_id}/me:
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
employeeRouter.patch('/me', auth, role(['employee', 'hr', 'admin']), employeeController.updateCurrentEmployee)

/**
 * @swagger
 * /api/v1/employee/{employee_id}/me:
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
employeeRouter.patch('/:id', auth, role(['hr', 'admin']), employeeController.updateEmployeeById)

/**
 * @swagger
 * /api/v1/employee/{employee_id}/me:
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
employeeRouter.delete('/:id', auth, role(['employee', 'hr', 'admin']), employeeController.deleteEmployeeById)

employeeRouter.post('/leave/book', auth, role(['employee', 'hr', 'admin']), employeeController.bookALeave)
employeeRouter.post('/leave/approve/:id', auth, role(['employee', 'hr', 'admin']), employeeController.approveLeave)
employeeRouter.post('/leave/reject/:id', auth, role(['employee', 'hr', 'admin']), employeeController.rejectLeave)

module.exports = employeeRouter
