import express from "express";

import { userController } from "../controllers/user";
import { isAuthenticated } from "../middlewares/index";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, userController.getAllUsers);
};
