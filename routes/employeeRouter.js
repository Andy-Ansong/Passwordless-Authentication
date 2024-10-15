import { Router } from 'express'
const employeeRouter = Router()
import employeeController from '../controllers/employeeController.js'
import auth from '../middleware/auth.js'
import role from '../middleware/role.js'

employeeRouter.post('/', auth, role(['hr', 'admin']), employeeController.createEmployee)
employeeRouter.get('/', auth, role(['employee', 'hr', 'admin']), employeeController.getAllEmployees)

employeeRouter.get('/me', auth, role(['employee', 'hr', 'admin']), employeeController.getCurrentEmployee)
employeeRouter.patch('/me', auth, role(['employee', 'hr', 'admin']), employeeController.updateCurrentEmployee)

employeeRouter.get('/:employee_id', auth, role(['employee', 'hr', 'admin']), employeeController.getEmployeeById)
employeeRouter.patch('/:employee_id', auth, role(['hr', 'admin']), employeeController.updateEmployeeById)
employeeRouter.delete('/:employee_id', auth, role(['hr', 'admin']), employeeController.deleteEmployeeById)

// employeeRouter.post('/leave/book', auth, role(['employee', 'hr', 'admin']), employeeController.bookALeave)
// employeeRouter.post('/leave/approve/:id', auth, role(['employee', 'hr', 'admin']), employeeController.approveLeave)
// employeeRouter.post('/leave/reject/:id', auth, role(['employee', 'hr', 'admin']), employeeController.rejectLeave)

export default employeeRouter
