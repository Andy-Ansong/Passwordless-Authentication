const express = require('express')
const employeeRouter = express.Router()
const employeeController = require('../controllers/employeeController')
const auth = require('../middleware/auth')
const role = require('../middleware/role')

employeeRouter.post('/', auth, role(['employee', 'hr', 'admin']), employeeController.createEmployee)

employeeRouter.get('/', auth, role(['employee', 'hr', 'admin']), employeeController.getAllEmployees)

employeeRouter.get('/:id', auth, role(['employee', 'hr', 'admin']), employeeController.getEmployeeById)

employeeRouter.get('/me', auth, role(['employee', 'hr', 'admin']), employeeController.getCurrentEmployee)

employeeRouter.patch('/me', auth, role(['employee', 'hr', 'admin']), employeeController.updateCurrentEmployee)
employeeRouter.patch('/:id', auth, role(['hr', 'admin']), employeeController.updateEmployeeById)

employeeRouter.delete('/:id', auth, role(['employee', 'hr', 'admin']), employeeController.deleteEmployeeById)

employeeRouter.post('/leave/book', auth, role(['employee', 'hr', 'admin']), employeeController.bookALeave)
employeeRouter.post('/leave/approve/:id', auth, role(['employee', 'hr', 'admin']), employeeController.approveLeave)
employeeRouter.post('/leave/reject/:id', auth, role(['employee', 'hr', 'admin']), employeeController.rejectLeave)

employeeRouter.post('/messages', auth, role(['employee', 'hr', 'admin']), employeeController.sendMessages)

module.exports = employeeRouter
