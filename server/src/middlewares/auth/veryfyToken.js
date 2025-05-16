import ErrorHandler from "../errors/ErrorHandler.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../configs/env.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) throw new ErrorHandler("khong co token", 401);

    const decode = jwt.verify(token, JWT_SECRET_KEY);

    if (!decode) throw new ErrorHandler("token khong hop le", 401);

    req.userId = decode.userId;

    next();
  } catch (error) {
    next(error);
  }
};
