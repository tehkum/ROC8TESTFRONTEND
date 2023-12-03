import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "../features/DataSlice";
import { filterSlice } from "../features/filterSlice";
import { authSlice } from "../features/AuthSlice";

export default configureStore({
  reducer: {
    data: dataSlice.reducer,
    filter: filterSlice.reducer,
    auth: authSlice.reducer,
  },
});
