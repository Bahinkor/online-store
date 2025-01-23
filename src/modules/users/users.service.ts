import bcrypt from "bcrypt";
import { isValidObjectId } from "mongoose";

import type { UserData } from "./types/types";

import { HttpError } from "../../errorHandler/httpError.handler";
import BanUserModel from "./models/BanUser.model";
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

const getOne = async (userId: string) => {
  const isValidId: boolean = isValidObjectId(userId);

  if (!isValidId) throw new HttpError("user id is not valid", 400);

  const user = await UserModel.findOne({ _id: userId }).select("-password -__v");

  if (!user) throw new HttpError("user not found", 404);

  return user;
};

const update = async (userId: string, userData: object) => {
  const isValidId: boolean = isValidObjectId(userId);

  if (!isValidId) throw new HttpError("user id is not valid", 400);

  const user = await UserModel.findOneAndUpdate({ _id: userId }, userData);

  if (!user) throw new HttpError("user not found", 404);

  return user;
};

const remove = async (userId: string) => {
  const isValidId: boolean = isValidObjectId(userId);

  if (!isValidId) throw new HttpError("user id is not valid", 400);

  const removedUser = await UserModel.findOneAndDelete({ _id: userId });

  if (!removedUser) throw new HttpError("user is not found", 404);

  return removedUser;
};

const getAllBanUsers = () => {
  return BanUserModel.find().populate("user", "-password -__v").lean();
};

const banUser = async (userId: string) => {
  const isValidId: boolean = isValidObjectId(userId);

  if (!isValidId) throw new HttpError("user id is not valid", 400);

  const user = await UserModel.findOne({ _id: userId });

  if (!user) throw new HttpError("user is not found", 404);

  if (user.role === "admin") throw new HttpError("It is not possible to ban an admin user.", 403);

  const bannedUser = await BanUserModel.create({ user: userId });

  return bannedUser;
};

export default { create, getAll, getOne, update, remove, getAllBanUsers, banUser };
