import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request, Response } from 'express';

// Define the storage engine
const storage: StorageEngine = multer.diskStorage({
  filename: function (req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    // Pass null for the error, and the original file name for the filename
    cb(null, file.originalname); // This is correct, but now the callback signature is aligned
  }
});

// Initialize multer with the storage engine
const upload = multer({ storage });

export default upload;
