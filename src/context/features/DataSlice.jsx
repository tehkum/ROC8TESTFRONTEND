import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get(
    "https://roc-8-testbackend-1q6r.vercel.app//data/",
    {
      headers: { Authorization: localStorage.getItem("token") },
    }
  );
  return response.data;
});

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
    },
    [fetchData.pending]: (state) => {
      state.status = "loading";
    },
    [fetchData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});
