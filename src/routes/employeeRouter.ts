import { Router, Request, Response, NextFunction } from 'express';
import employeeController from '@controllers/employeeController'; // Assuming alias @ for controllers
import auth from '@middleware/auth'; // Assuming alias @ for middleware
import role from '@middleware/role'; // Assuming alias @ for middleware

const employeeRouter: Router = Router();

employeeRouter.post(
  '/', 
  auth, 
  role(['admin', 'hr']), 
  (req: Request, res: Response, next: NextFunction) => employeeController.createEmployee(req, res, next)
);

employeeRouter.get(
  '/', 
  auth, 
  (req: Request, res: Response) => employeeController.getAllEmployees(req, res)
);

employeeRouter.get(
  '/current', 
  auth, 
  (req: Request, res: Response) => employeeController.getCurrentEmployee(req, res)
);

employeeRouter.patch(
  '/current', 
  auth, 
  (req: Request, res: Response) => employeeController.updateCurrentEmployee(req, res)
);

employeeRouter.get(
  '/current/team', 
  auth, 
  (req: Request, res: Response) => employeeController.getAllEmployeesInTeam(req, res)
);

employeeRouter.get(
  '/:id', 
  auth, 
  (req: Request, res: Response) => employeeController.getEmployeeById(req, res)
);

employeeRouter.patch(
  '/:id', 
  auth, 
  role(['admin', 'hr']), 
  (req: Request, res: Response) => employeeController.updateEmployeeById(req, res)
);

employeeRouter.delete(
  '/:id', 
  auth, 
  role(['admin', 'hr']), 
  (req: Request, res: Response) => employeeController.deleteEmployeeById(req, res)
);

employeeRouter.post(
  '/leave/book', 
  auth, 
  (req: Request, res: Response) => employeeController.bookALeave(req, res)
);

employeeRouter.post(
  '/leave/approve/:id', 
  auth, 
  (req: Request, res: Response) => employeeController.approveLeave(req, res)
);

employeeRouter.post(
  '/leave/reject/:id', 
  auth, 
  (req: Request, res: Response) => employeeController.rejectLeave(req, res)
);

export default employeeRouter;
