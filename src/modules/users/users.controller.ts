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

export default { createHandler };
