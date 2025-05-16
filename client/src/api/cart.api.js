import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
console.log("API URL:", apiUrl);

const API = axios.create({
  baseURL: `${apiUrl}/api/v1/cart`,
  withCredentials: true,
});

const apiCart = {
  addCart: async (bookId) => await API.post(`/${bookId}`),
  getCarts: async () => await API.get("/"),
  deleteCart: async (bookId) => await API.delete(`/${bookId}`),
  updateCart: async (bookId, data) => await API.patch(`/${bookId}`, data),
};

export default apiCart;
