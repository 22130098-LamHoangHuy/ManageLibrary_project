import {
  createBook,
  deleteBook,
  editBook,
  getBook,
  getAllBooks,
  getBooksByCategory,
  getBooksBySubCategory,
  getBooksByTitle,
} from "../controllers/book.controller.js";

import { Router } from "express";

const bookRouter = Router();

bookRouter.get("/filterCategory", getBooksByCategory);
bookRouter.get("/filterSubCategory", getBooksBySubCategory);
bookRouter.get("/search", getBooksByTitle);
bookRouter.post("/", createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:bookId", getBook);
bookRouter.put("/:bookId", editBook);
bookRouter.delete("/:bookId", deleteBook);

export default bookRouter;
