import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type {
  LoginUserData,
  RegisterUserData,
  ResetPasswordData,
  UpdateMeData,
  UpdatePasswordData,
} from "./types/types";

import envConfig from "../../config/config";
import { HttpError } from "../../errorHandler/httpError.handler";
import { redisClient } from "../../redis";
import BanUserModel from "../users/models/BanUser.model";
import UserModel from "../users/models/User.model";
import usersService from "../users/users.service";
import transporter from "./config/nodemailer";

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

const getMe = async (userId: string) => {
  return UserModel.findOne({ _id: userId }).select("-password -__v").lean();
};

const updateMe = async (userId: string, updateData: UpdateMeData) => {
  const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, updateData);

  return updatedUser;
};

const updatePassword = async (userId: string, updateData: UpdatePasswordData) => {
  const hashedPassword = await bcrypt.hash(updateData.password, 10);
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    { password: hashedPassword },
  );

  return updatedUser;
};

const forgetPassword = async (email: string) => {
  const isExistUser = await UserModel.findOne({ email });

  if (!isExistUser) throw new HttpError("user is not found", 404);

  const resetToken: string = crypto.randomUUID().toString();

  await redisClient.set(email, resetToken, { EX: 60 * 5 }); // 5 min EX time

  // nodemailer config options
  const mailOptions = {
    from: envConfig.email.username,
    to: email,
    subject: "Reset Password Link",
    html: `<h2>Hi, ${isExistUser.firstName}</h2>
    <a href="${envConfig.clientUrl}/auth/reset-password?token=${resetToken}">Reset Password Link</a>`,
  };

  await transporter.sendMail(mailOptions);
};

const resetPassword = async (reqbody: ResetPasswordData) => {
  const { email, password, token } = reqbody;
  const tokenData = await redisClient.get(email);

  if (!tokenData) throw new HttpError("Invalid or expired reset token", 400);

  if (token !== tokenData) throw new HttpError("Invalid reset token", 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });
};

export default { register, login, getMe, updateMe, updatePassword, forgetPassword, resetPassword };
