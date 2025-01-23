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

const getOneHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await usersService.getOne(userId);

    res.status(200).json({
      data: user,
      statusCode: 200,
      message: "user fetched successfully",
    });
  } catch (e) {
    next(e);
  }
};

const updateHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    await usersService.update(userId, req.body);

    res.status(200).json({
      statusCode: 200,
      message: "user updated successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default { createHandler, getAllHandler, getOneHandler, updateHandler };
