import express from "express";

import adminGuard from "../../middlewares/adminGuard.middleware";
import authGuard from "../../middlewares/authGuard.middleware";
import { validatorMiddleware } from "../../middlewares/validator.middleware";
import usersController from "./users.controller";
import { createUserValidator } from "./validators/createUser.validator";
import { updateUserValidator } from "./validators/updateUser.validator";

const userRouter = express.Router();
userRouter.use(authGuard, adminGuard);

userRouter
  .route("/")
  .post(validatorMiddleware(createUserValidator), usersController.createHandler)
  .get(usersController.getAllHandler);

userRouter.route("/ban").get(usersController.getAllBanUsersHandler);

userRouter
  .route("/ban/:userId")
  .post(usersController.banUserHandler)
  .delete(usersController.unBanUserHandler);

userRouter
  .route("/:userId")
  .get(usersController.getOneHandler)
  .put(validatorMiddleware(updateUserValidator), usersController.updateHandler)
  .delete(usersController.removeHandler);

export default userRouter;
