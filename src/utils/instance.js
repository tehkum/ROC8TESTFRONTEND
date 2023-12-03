import axios from "axios";

const token = localStorage.getItem("token") || "";

export const baseURL = "https://roc8-backend.onrender.com";

export const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    Authorization: token,
  },
  timeout: 300000,
  withCredentials: true,
});
