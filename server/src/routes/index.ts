import express from "express";

import AuthRouter from "./authentication";

const router = express.Router();

export default (): express.Router => {
  AuthRouter(router);

  return router;
};
