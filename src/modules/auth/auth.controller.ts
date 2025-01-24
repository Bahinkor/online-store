import type { NextFunction, Request, RequestHandler, Response } from "express";

import authService from "./auth.service";

const registerHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await authService.register(req.body);

    res.status(201).json({
      data: { ...newUser, password: null },
      statusCode: 201,
      message: "User created successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default { registerHandler };
