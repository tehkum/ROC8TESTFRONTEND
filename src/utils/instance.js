import axios from "axios";

const token = localStorage.getItem("token") || "";

export const baseURL = "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    Authorization: token,
  },
  timeout: 300000,
  withCredentials: true,
});
