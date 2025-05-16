import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../configs/env.js";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
