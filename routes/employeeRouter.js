import { Router } from 'express'
const employeeRouter = Router()
import employeeController from '../controllers/employeeController.js'
import auth from '../middleware/auth.js'
import role from '../middleware/role.js'

employeeRouter.post('/', employeeController.createEmployee)
employeeRouter.get('/', employeeController.getAllEmployees)

employeeRouter.get('/current', employeeController.getCurrentEmployee)
employeeRouter.patch('/current', employeeController.updateCurrentEmployee)

employeeRouter.get('/current/team', employeeController.getAllEmployeesInTeam)

employeeRouter.get('/:id', employeeController.getEmployeeById)
employeeRouter.patch('/:id', employeeController.updateEmployeeById)
employeeRouter.delete('/:id', employeeController.deleteEmployeeById)

employeeRouter.post('/leave/book', employeeController.bookALeave)
employeeRouter.post('/leave/approve/:id', employeeController.approveLeave)
employeeRouter.post('/leave/reject/:id', employeeController.rejectLeave)

export default employeeRouter
