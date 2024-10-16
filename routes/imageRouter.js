import { Router } from "express";
import upload from "../middleware/multer.js";
import uploadImage from "../controllers/imageController.js";
import auth from "../middleware/auth.js";
const imageRouter = Router()

imageRouter.post('/', auth, upload.single('image'), uploadImage)

export default imageRouter