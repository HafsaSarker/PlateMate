import express from "express";

import AuthRouter from "./authentication";
import UserRouter from "./user";
import MessageRouter from "./message";

const router = express.Router();

export default (): express.Router => {
  AuthRouter(router);
  UserRouter(router);
  MessageRouter(router);

  return router;
};
