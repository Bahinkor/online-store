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
    const product = await productsService.create();

    res.status(201).json({
      data: product,
      statusCode: 201,
      message: "Product created successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default { getAllHandler, createHandler };
