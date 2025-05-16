import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
console.log("API URL:", apiUrl);

const API = axios.create({
  baseURL: `${apiUrl}/api/v1/book`,
  withCredentials: true,
});

const apiBook = {
  getAllBooks: async (page) => await API.get(`/?page=${page}`),
  getBookByCategories: async (category, page) =>
    await API.get(`/filterCategory?category=${category}&page=${page}`),
  getBookBySubCategories: async (subCategory, page) =>
    await API.get(`/filterSubCategory?subCategory=${subCategory}&page=${page}`),
  getBook: async (bookId) => await API.get(`/${bookId}`),
  getBooksByTitle: async (keyWord) =>
    await API.get(`/search?keyWord=${keyWord}`),
};
export default apiBook;
