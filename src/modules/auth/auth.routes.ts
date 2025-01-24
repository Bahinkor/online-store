import express from "express";

import { validatorMiddleware } from "../../middlewares/validator.middleware";
import authController from "./auth.controller";
import { registerUserValidator } from "./validators/registerUser.validator";

const authRouter = express.Router();

authRouter
  .route("/register")
  .post(validatorMiddleware(registerUserValidator), authController.registerHandler);

export default authRouter;
