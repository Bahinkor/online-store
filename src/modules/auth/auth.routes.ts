import express from "express";

import { validatorMiddleware } from "../../middlewares/validator.middleware";
import authController from "./auth.controller";
import { loginUserValidator } from "./validators/loginUser.validator";
import { registerUserValidator } from "./validators/registerUser.validator";

const authRouter = express.Router();

authRouter
  .route("/register")
  .post(validatorMiddleware(registerUserValidator), authController.registerHandler);

authRouter
  .route("/login")
  .post(validatorMiddleware(loginUserValidator), authController.loginHandler);

export default authRouter;
