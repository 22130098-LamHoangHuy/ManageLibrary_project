import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
console.log("API URL:", apiUrl);

const API = axios.create({
  baseURL: `${apiUrl}/api/v1/user`,
  withCredentials: true,
});

const apiUser = {
  getUser: async (userId) => await API.get(`/${userId}`),
  updateUser: async (userId, data) => await API.patch(`/${userId}`, data),
  updateAvatar: async (userId, formData) =>
    await API.patch(`/${userId}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default apiUser;
