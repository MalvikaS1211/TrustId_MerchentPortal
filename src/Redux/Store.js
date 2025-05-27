import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/reducer.js";
import themeReducer from "../Redux/darkLightThemeReducer.js";
const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});

export default store;
