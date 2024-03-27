import express from "express";

import { isAuthenticated, isOwner } from "../middlewares/index";
import { preferenceController } from "../controllers/preference";

export default (router: express.Router) => {
  router.post("/preference", preferenceController.createUserPreference);
  router.get(
    "/preference/:uid",
    isAuthenticated,
    preferenceController.getUserPreference
  );
  router.patch(
    "/preference/:uid",
    isAuthenticated,
    isOwner,
    preferenceController.updateUserPreference
  );
};
