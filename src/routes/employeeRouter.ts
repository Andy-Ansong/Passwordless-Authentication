import { Router } from 'express'
const employeeRouter = Router()
import employeeController from '../controllers/employeeController'
import auth from '../middleware/auth'
import role from '../middleware/role'

employeeRouter.post('/', auth, role(['hr', 'admin']), employeeController.createEmployee)
employeeRouter.get('/', auth, employeeController.getAllEmployees)

employeeRouter.get('/current', auth, employeeController.getCurrentEmployee)
employeeRouter.patch('/current', auth, employeeController.updateCurrentEmployee)

employeeRouter.get('/:id', auth, employeeController.getEmployeeById)
employeeRouter.patch('/:id', auth, role(['hr', 'admin']), employeeController.updateEmployeeById)
employeeRouter.delete('/:id', auth, role(['hr', 'admin']), employeeController.deleteEmployeeById)

export default employeeRouter
