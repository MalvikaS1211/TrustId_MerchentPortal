import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/reducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
