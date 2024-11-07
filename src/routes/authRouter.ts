import { Router, Request, Response, NextFunction } from 'express'; // Importing types for Express
import auth from '@middleware/auth'; // Assuming correct path using @ as alias
import authController from '../controllers/authController'; // Assuming correct path using @ as alias

const authRouter: Router = Router();

// Define the routes and their handlers
authRouter.post("/request", authController.requestCode);  // Directly passing the controller function
authRouter.post("/login", authController.login);  // Directly passing the controller function
authRouter.post('/logout', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await authController.logout(req, res, next); // Call the logout function
    } catch (error) {
        next(error);
    }
});

export default authRouter;
