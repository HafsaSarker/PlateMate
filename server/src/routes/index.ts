import express from "express";

import AuthRouter from "./authentication";
import UserRouter from "./user";

const router = express.Router();

export default (): express.Router => {
  AuthRouter(router);
  UserRouter(router);

  return router;
};
