import express from "express";

import { userController } from "../controllers/user";
import { isAuthenticated, isOwner } from "../middlewares/index";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, userController.getAllUsers);
  router.delete(
    "/users/:id",
    isAuthenticated,
    isOwner,
    userController.deleteUser
  );
};
