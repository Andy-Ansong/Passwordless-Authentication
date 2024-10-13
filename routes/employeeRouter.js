const express = require('express')
const employeeRouter = express.Router()
const employeeController = require('../controllers/employeeController')
const auth = require('../middleware/auth')

employeeRouter.post('/', auth, employeeController.createEmployee)

employeeRouter.get('/', auth, employeeController.getAllEmployees)

employeeRouter.get('/:id', auth, employeeController.getEmployeeById)

employeeRouter.get('/me', auth, employeeController.getCurrentEmployee)

employeeRouter.patch('/me', auth, employeeController.updateCurrentEmployee)

employeeRouter.patch('/:id', auth, employeeController.updateEmployeeById)

employeeRouter.delete('/:id', auth, employeeController.deleteEmployeeById)

employeeRouter.post('/leave/book', auth, employeeController.bookALeave)
employeeRouter.post('/leave/approve/:id', auth, employeeController.approveLeave)
employeeRouter.post('/leave/reject/:id', auth, employeeController.rejectLeave)

employeeRouter.post('/messages', auth, employeeController.sendMessages)

module.exports = employeeRouter
