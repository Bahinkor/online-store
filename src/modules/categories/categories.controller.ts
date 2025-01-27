import type { NextFunction, RequestHandler, Response } from "express";

import categoriesService from "./categories.service";

const getAllHandler: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  try {
    const categories = await categoriesService.getAll();

    res.status(200).json({
      data: categories,
      statusCode: 200,
      message: "Categories fetched successfully",
    });
  } catch (e) {
    next(e);
  }
};

const createHandler: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  try {
    await categoriesService.create(req.body);

    res.status(201).json({
      statusCode: 201,
      message: "Category created successfully",
    });
  } catch (e) {
    next(e);
  }
};

const getOneHandler: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const products = await categoriesService.findOne(slug);

    res.status(200).json({
      data: products,
      statusCode: 200,
      message: "Category fetched successfully",
    });
  } catch (e) {
    next(e);
  }
};

const removeHandler: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    await categoriesService.remove(slug);

    res.status(200).json({
      statusCode: 200,
      message: "Category removed successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default { getAllHandler, createHandler, getOneHandler, removeHandler };
