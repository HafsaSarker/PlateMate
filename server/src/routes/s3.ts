import express from "express";
import multer from "multer";

import { s3Controller } from "../controllers/s3Controller";


const storage = multer.memoryStorage();
const upload = multer({ storage });

export default (router: express.Router) => {
  router.post('/s3', upload.single('image'), s3Controller.uploadImage);
};
