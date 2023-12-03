import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../utils/instance";

export const login = createAsyncThunk("auth/login", async (user) => {
  const response = await axios.post("http://localhost:3000/auth/login", user);
  return response.data;
});

export const register = createAsyncThunk("auth/register", async (user) => {
  const response = await axios.post("http://localhost:3000/auth/signup", user);
  return response.data;
});

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await axiosInstance.post("http://localhost:3000/auth/");
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.status = "succeeded";
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.status = "failed";
      state.error = action.error.message;
    },
    [login.pending]: (state) => {
      state.user = null;
      state.status = "loading";
    },
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.status = "succeeded";
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.status = "failed";
      state.error = action.error.message;
    },
    [register.pending]: (state) => {
      state.user = null;
      state.status = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.status = "succeeded";
    },
    [fetchUser.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchUser.pending]: (state) => {
      state.user = null;
      state.status = "loading";
    },
  },
});
