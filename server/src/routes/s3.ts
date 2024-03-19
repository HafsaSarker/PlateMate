import express from "express";
import { generatePresignedUrl } from "controllers/s3Controller";

export default (router: express.Router) => {
  router.get('/generate-presigned-url', generatePresignedUrl);
};
