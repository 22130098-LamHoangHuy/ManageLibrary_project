import ErrorHandler from "../middlewares/errors/ErrorHandler.js";
import {
  createBookService,
  deleteBookService,
  editBookService,
  getBookService,
  getAllBooksService,
  getBooksByCategoryService,
  getBooksBySubCategoryService,
  getBooksByTitleService,
} from "../services/book.service.js";

export const createBook = async (req, res, next) => {
  try {
    const book = await createBookService(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const result = await deleteBookService(req.params.bookId);
    if (!result) throw ErrorHandler("not found book", 404);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const editBook = async (req, res, next) => {
  try {
    const updatedBook = await editBookService(req.params.bookId, req.body);
    if (!updatedBook) throw new ErrorHandler("not found book", 404);
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const book = await getBookService(req.params.bookId);
    if (!book) throw new ErrorHandler("not found book", 404);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const { books, total } = await getAllBooksService(page);
    res.status(200).json({
      books,
      total,
      page,
      totalPages: Math.ceil(total / 8),
    });
  } catch (error) {
    next(error);
  }
};

export const getBooksByCategory = async (req, res, next) => {
  try {
    const category = req.query.category;
    const page = parseInt(req.query.page) || 1;
    const { books, total } = await getBooksByCategoryService(category, page);
    res.status(200).json({
      books,
      total,
      page,
      totalPages: Math.ceil(total / 8),
    });
  } catch (error) {
    next(error);
  }
};
export const getBooksBySubCategory = async (req, res, next) => {
  try {
    const subCategory = req.query.subCategory;
    const page = parseInt(req.query.page) || 1;
    const { books, total } = await getBooksBySubCategoryService(
      subCategory,
      page
    );
    res.status(200).json({
      books,
      total,
      page,
      totalPages: Math.ceil(total / 8),
    });
  } catch (error) {
    next(error);
  }
};

export const getBooksByTitle = async (req, res, next) => {
  try {
    const keyWord = req.query.keyWord || "";
    const books = await getBooksByTitleService(keyWord);
    res.status(200).json({ books });
  } catch (error) {
    next(error);
  }
};
