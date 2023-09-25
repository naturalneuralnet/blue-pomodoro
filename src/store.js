import { configureStore } from "@reduxjs/toolkit";
import { promodoReducer } from "./PromodoSlice";

const store = configureStore({
  reducer: {
    promodo: promodoReducer,
  },
});

export default store;
