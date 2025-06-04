import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: sessionStorage.getItem("darkMode") === true || false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload == 1 ? false : !state.darkMode;
      sessionStorage.setItem("darkMode", state.darkMode);
    },
    resetTheme: () => {
      sessionStorage.setItem("darkMode", false);
      return { darkMode: false };
    },
  },
});

export const { toggleDarkMode, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
