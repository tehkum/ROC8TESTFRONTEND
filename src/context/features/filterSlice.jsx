import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    gender: "both",
    minDate: "none",
    maxDate: "none",
    age: "all",
    nav: false,
  },
  reducers: {
    fetchFilter: (state) => {
      state.gender = localStorage.getItem("gender") || "both";
      state.minDate = localStorage.getItem("minDate") || "none";
      state.maxDate = localStorage.getItem("maxDate") || "none";
      state.age = localStorage.getItem("age") || "all";
    },
    genderFilter: (state, action) => {
      state.gender = action.payload;
      localStorage.setItem("gender", state.gender);
    },
    minDateFilter: (state, action) => {
      state.minDate = action.payload;
      localStorage.setItem("minDate", action.payload);
    },
    maxDateFilter: (state, action) => {
      state.maxDate = action.payload;
      localStorage.setItem("maxDate", action.payload);
    },
    clearFilter: (state) => {
      state.gender = "both";
      state.minDate = "none";
      state.maxDate = "none";
      state.age = "all";
      localStorage.removeItem("maxDate");
      localStorage.removeItem("minDate");
      localStorage.removeItem("gender");
      localStorage.removeItem("age");
    },
    ageFilter: (state, action) => {
      state.age = action.payload;
      localStorage.setItem("age", action.payload);
    },
    navToggle: (state) => {
      state.nav = !state.nav;
    },
  },
});

export const {
  genderFilter,
  minDateFilter,
  maxDateFilter,
  clearFilter,
  ageFilter,
  navToggle,
  fetchFilter,
} = filterSlice.actions;
