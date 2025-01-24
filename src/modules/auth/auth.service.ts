import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { LoginUserData, RegisterUserData } from "./types/types";

import envConfig from "../../config/config";
import { HttpError } from "../../errorHandler/httpError.handler";
import BanUserModel from "../users/models/BanUser.model";
import UserModel from "../users/models/User.model";
import usersService from "../users/users.service";

const register = (userData: RegisterUserData) => {
  return usersService.create(userData);
};

const login = async (userData: LoginUserData) => {
  const { email, password } = userData;

  const user = await UserModel.findOne({ email });

  if (!user) throw new HttpError("user email not found", 404);

  const isUserBanned = await BanUserModel.findOne({ user: user._id });

  if (isUserBanned) throw new HttpError("your account is banned", 403);

  const isMatchPassword: boolean = bcrypt.compareSync(password, user.password);

  if (!isMatchPassword) throw new HttpError("email or password not valid", 400);

  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    envConfig.auth.accessTokenSecretKey ?? "test-secret",
    { expiresIn: "7d" },
  );

  return accessToken;
};

export default { register, login };
