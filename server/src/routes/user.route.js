import {
  getUser,
  deleteUser,
  createUser,
  updateUser,
  updateAvatar,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/auth/veryfyToken.js";
import upload from "../configs/multer.js";

const userRouter = Router();
userRouter.get("/:userId", getUser);
userRouter.delete("/:userId", deleteUser);
userRouter.patch("/:userId", updateUser);
userRouter.post("/", createUser);
userRouter.patch("/:userId/avatar", upload.single("avatar"), updateAvatar);

export default userRouter;
