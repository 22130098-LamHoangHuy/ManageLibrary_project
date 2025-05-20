import ErrorHandler from "../middlewares/errors/ErrorHandler.js";
import {
  getUserService,
  deleteUserService,
  createUserService,
  updateUserService,
  updateAvatarService,
} from "../services/user.service.js";

// GET /:userId
export const getUser = async (req, res, next) => {
  try {
    const user = await getUserService(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// DELETE /:userId
export const deleteUser = async (req, res, next) => {
  try {
    await deleteUserService(req.params.userId);
    res.status(200).json({ message: "Xóa user thành công" });
  } catch (err) {
    next(err);
  }
};

// POST /
export const createUser = async (req, res, next) => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json({ newUser });
  } catch (err) {
    next(err);
  }
};

//5.4 nhấn lưu thay đổ, chuyển tiếp thông tin trong lớp UserController theo phương thức updateUser().
export const updateUser = async (req, res, next) => {
  try {
    const updated = await updateUserService(req.params.userId, req.body);
    res.status(200).json({ updated });
  } catch (err) {
    next(err);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!req.file) throw new ErrorHandler("vui lòng chọn ảnh", 400);

    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    const updatedUser = await updateAvatarService(userId, avatarPath);

    if (!updatedUser) throw new ErrorHandler("không tìm thấy user", 404);
    res.status(200).json({
      message: "Cập nhật avatar thành công.",
      avatar: updatedUser.avatar,
    });
  } catch (err) {
    next(err);
  }
};
