import bcrypt from "bcrypt";

import type { UserData } from "./types/types";

import { HttpError } from "../../errorHandler/httpError.handler";
import UserModel from "./models/User.model";

const create = async (userData: UserData) => {
  const { password, email } = userData;

  const isUserExist = await UserModel.findOne({ email });

  if (isUserExist) throw new HttpError("user already exists", 400);

  const hashedPassword: string = await bcrypt.hash(password, 10);

  return UserModel.create({ ...userData, password: hashedPassword });
};

const getAll = async (limit: number = 10, page: number = 1) => {
  const skip: number = (page - 1) * limit;

  const users = await UserModel.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("-password -__v")
    .lean();

  const usersCount: number = await UserModel.countDocuments();
  const pagesCount = Math.ceil(usersCount / limit);

  return { users, pagesCount, usersCount, currentPage: page };
};

export default { create, getAll };
