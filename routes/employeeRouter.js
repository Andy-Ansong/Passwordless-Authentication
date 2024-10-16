import { Router } from 'express'
const employeeRouter = Router()
import employeeController from '../controllers/employeeController.js'
import auth from '../middleware/auth.js'
import role from '../middleware/role.js'

employeeRouter.post('/', auth, role(['hr', 'admin']), employeeController.createEmployee)
employeeRouter.get('/', auth, employeeController.getAllEmployees)

employeeRouter.get('/current', auth, employeeController.getCurrentEmployee)
employeeRouter.patch('/current', auth, employeeController.updateCurrentEmployee)

employeeRouter.get('/:id', auth, employeeController.getEmployeeById)
employeeRouter.patch('/:id', auth, role(['hr', 'admin']), employeeController.updateEmployeeById)
employeeRouter.delete('/:id', auth, role(['hr', 'admin']), employeeController.deleteEmployeeById)

// employeeRouter.post('/leave/book', auth, employeeController.bookALeave)
// employeeRouter.post('/leave/approve/:id', auth, employeeController.approveLeave)
// employeeRouter.post('/leave/reject/:id', auth, employeeController.rejectLeave)

export default employeeRouter
