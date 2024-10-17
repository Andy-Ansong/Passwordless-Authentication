import { Router } from "express";
import upload from "../middleware/multer.js";
import {uploadImage, fetchImage} from "../controllers/imageController.js";
import auth from "../middleware/auth.js";
const imageRouter = Router()

imageRouter.post('/', auth, upload.single('image'), uploadImage)
imageRouter.get('/', auth, fetchImage)

export default imageRouter