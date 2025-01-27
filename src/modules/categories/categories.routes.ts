import express from "express";

import adminGuard from "../../middlewares/adminGuard.middleware";
import authGuard from "../../middlewares/authGuard.middleware";
import { validatorMiddleware } from "../../middlewares/validator.middleware";
import categoriesController from "./categories.controller";
import createCategoryValidator from "./validators/category.validator";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(categoriesController.getAllHandler)
  .post(
    authGuard,
    adminGuard,
    validatorMiddleware(createCategoryValidator),
    categoriesController.createHandler,
  );

categoryRouter.route("/:slug").get().delete();

export default categoryRouter;
