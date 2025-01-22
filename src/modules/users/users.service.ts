import bcrypt from "bcrypt";

import type { UserData } from "./types/types";

import UserModel from "./models/User.model";

const create = async (userData: UserData) => {
  const { password, email } = userData;

  const isUserExist = await UserModel.findOne({ email });

  if (isUserExist) return new Error("user already exists");

  const hashedPassword: string = await bcrypt.hash(password, 10);

  return UserModel.create({ ...userData, password: hashedPassword });
};

export default { create };
