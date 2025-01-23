import type { NextFunction, Request, RequestHandler, Response } from "express";

import usersService from "./users.service";

const createHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    await usersService.create(body);

    res.status(201).json({
      statusCode: 201,
      message: "User created successfully",
    });
  } catch (e) {
    next(e);
  }
};

const getAllHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { limit = 10, page = 1 } = req.query;
  const users = await usersService.getAll(+limit, +page);

  res.status(200).json({
    data: users,
    statusCode: 200,
    message: "User fetched successfully",
  });
};

export default { createHandler, getAllHandler };
