import express from "express";

import authGuard from "../../middlewares/authGuard.middleware";
import { validatorMiddleware } from "../../middlewares/validator.middleware";
import authController from "./auth.controller";
import { forgetPasswordValidator } from "./validators/forgetPassword.validator";
import { loginUserValidator } from "./validators/loginUser.validator";
import { registerUserValidator } from "./validators/registerUser.validator";
import { updateMeValidator } from "./validators/updateMe.validator";
import { updatePasswordValidator } from "./validators/updatePassword.validator";

const authRouter = express.Router();

authRouter
  .route("/register")
  .post(validatorMiddleware(registerUserValidator), authController.registerHandler);

authRouter
  .route("/login")
  .post(validatorMiddleware(loginUserValidator), authController.loginHandler);

authRouter
  .route("/me")
  .get(authGuard, authController.getMeHandler)
  .put(authGuard, validatorMiddleware(updateMeValidator), authController.updateMeHandler);

authRouter
  .route("/update-password")
  .put(
    authGuard,
    validatorMiddleware(updatePasswordValidator),
    authController.updatePasswordHandler,
  );

authRouter
  .route("/forget-password")
  .post(validatorMiddleware(forgetPasswordValidator), authController.forgetPasswordHandler);

authRouter.route("/reset-password").put();

export default authRouter;
