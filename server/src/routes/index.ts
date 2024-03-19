import express from "express";

import AuthRouter from "./authentication";
import UserRouter from "./user";
import MessageRouter from "./message";
import S3Router from "./s3";

const router = express.Router();

export default (): express.Router => {
  AuthRouter(router);
  UserRouter(router);
  MessageRouter(router);
  S3Router(router);


  return router;
};
