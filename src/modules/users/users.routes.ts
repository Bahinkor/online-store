import express from "express";

import usersController from "./users.controller";

const userRouter = express.Router();

userRouter.route("/").post(usersController.createHandler);

export default userRouter;
