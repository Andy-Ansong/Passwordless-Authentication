import { Router } from "express";
import upload from "../middleware/multer";
import {uploadImage, fetchImage} from "../controllers/imageController";
import auth from "../middleware/auth";
const imageRouter = Router()

imageRouter.post('/', auth, upload.single('image'), uploadImage)
imageRouter.get('/', auth, fetchImage)

export default imageRouter