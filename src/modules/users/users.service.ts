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

const getAll = () => {
  return UserModel.find().select("-password -__v").lean();
};

export default { create, getAll };
