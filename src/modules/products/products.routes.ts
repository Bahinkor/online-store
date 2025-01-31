import express from "express";

import productsController from "./products.controller";

const productRouter = express.Router();

productRouter.route("/").get(productsController.getAllHandler).post();
productRouter.route("/:id").get().put().delete();

export default productRouter;
