import Book from "../models/book.model.js";
import ErrorHandler from "../middlewares/errors/ErrorHandler.js";

export const createBookService = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

export const deleteBookService = async (bookId) => {
  return await Book.findByIdAndDelete(bookId);
};

export const editBookService = async (bookId, bookData) => {
  return await Book.findByIdAndUpdate(bookId, bookData, { new: true });
};

export const getBookService = async (bookId) => {
  return await Book.findById(bookId);
};

export const getAllBooksService = async (page = 1, limit = 8) => {
  const skip = (page - 1) * limit;
  const books = await Book.find().skip(skip).limit(limit);
  const total = await Book.countDocuments();
  return { books, total };
};

export const getBooksByCategoryService = async (
  category,
  page = 1,
  limit = 8
) => {
  const skip = (page - 1) * limit;
  const books = await Book.find({ category: category }).skip(skip).limit(limit);
  const total = await Book.countDocuments({ category: category });
  return { books, total };
};

export const getBooksBySubCategoryService = async (
  subCategory,
  page = 1,
  limit = 8
) => {
  const skip = (page - 1) * limit;
  const books = await Book.find({ subCategory: subCategory })
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments({ subCategory: subCategory });
  return { books, total };
};

export const getBooksByTitleService = async (keyWord) => {
  const regex = new RegExp(keyWord, "i"); // không phân biệt hoa thường
  const books = await Book.find({ titleUnsigned: { $regex: regex } });
  return books;
};
