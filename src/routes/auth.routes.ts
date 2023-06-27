import {
  loginController,
  logoutController,
  registerController,
  sessionController
} from "../controllers/auth.controller";

import express from "express";

const router = express.Router();

// Auth and Session Routes
router.route("/").get(sessionController);
router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").post(logoutController);

export default router;
