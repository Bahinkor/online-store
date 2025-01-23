import express from "express";

import { validatorMiddleware } from "../../middlewares/validator.middleware";
import usersController from "./users.controller";
import { createUserValidator } from "./validators/createUser.validator";

const userRouter = express.Router();

userRouter.route("/").post(validatorMiddleware(createUserValidator), usersController.createHandler);

export default userRouter;
