import { Router } from "express";
import auth from "../middleware/auth";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", auth, userController.getAllUsers);

export default userRouter;
