import type { NextFunction, RequestHandler, Response } from "express";

import productsService from "./products.service";

const getAllHandler: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const products = await productsService.getAll();

  res.status(200).json({
    data: products,
    statusCode: 200,
    message: "Products fetched successfully",
  });
};

const createHandler: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  try {
    await productsService.create(req.body, req.files);

    res.status(201).json({
      statusCode: 201,
      message: "Product created successfully",
    });
  } catch (e) {
    next(e);
  }
};

const getOneHandler: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await productsService.getOne(id);

    res.status(200).json({
      data: product,
      statusCode: 200,
      message: "Product fetched successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default { getAllHandler, createHandler, getOneHandler };
