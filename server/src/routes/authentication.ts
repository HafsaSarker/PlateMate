import express from "express";

import { authController } from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", authController.register);
  router.post("/auth/login", authController.login);
  router.get("/auth/logout", authController.logout);
};
