import express from "express";

const productRouter = express.Router();

productRouter.route("/").get().post();
productRouter.route("/:id").get().put().delete();

export default productRouter;
