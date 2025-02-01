import express from "express";

import multerStorage from "../../config/uploader.config";
import adminGuard from "../../middlewares/adminGuard.middleware";
import authGuard from "../../middlewares/authGuard.middleware";
import { validatorMiddleware } from "../../middlewares/validator.middleware";
import productsController from "./products.controller";
import createProductValidator from "./validators/createProduct.validator";

const productRouter = express.Router();
const uploader = multerStorage("public/images");

productRouter
  .route("/")
  .get(productsController.getAllHandler)
  .post(
    authGuard,
    adminGuard,
    uploader.array("images", 5),
    validatorMiddleware(createProductValidator),
    productsController.createHandler,
  );
productRouter.route("/:id").get().put().delete();

export default productRouter;
