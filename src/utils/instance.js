import axios from "axios";

const token = localStorage.getItem("token") || "";

export const baseURL = "https://roc-8-testbackend-1q6r.vercel.app/";

export const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    Authorization: token,
  },
  timeout: 300000,
  withCredentials: true,
});
