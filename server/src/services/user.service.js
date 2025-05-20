import ErrorHandler from "../middlewares/errors/ErrorHandler.js";
import User from "../models/user.model.js";
import { deleteFile } from "../utils/deleteFile.js";

// Lấy user theo ID
export const getUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ErrorHandler("Không tìm thấy user", 404);
  return user;
};

// Xóa user
export const deleteUserService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new ErrorHandler("Không tìm thấy user để xóa", 404);
  return user;
};

// Tạo user mới
export const createUserService = async (userData) => {
  const user = await User.create(userData);
  return user;
};

//5.5 lưu thông tin thay đổi xuống cơ sở dữ liệu trong lớp UserService theo phương thức updateUserService().
export const updateUserService = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!user) throw new ErrorHandler("Không tìm thấy user để cập nhật", 404);
  return user;
};

export const updateAvatarService = async (userId, avatarPath) => {
  const user = await User.findById(userId);
  if (!user) return null;
  const oldAvatarPath = user.avatar;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: avatarPath },
    { new: true }
  );

  if (
    oldAvatarPath &&
    oldAvatarPath !== avatarPath &&
    !oldAvatarPath.includes("blank-avatar.png")
  ) {
    deleteFile(oldAvatarPath);
  }
  return updatedUser;
};
