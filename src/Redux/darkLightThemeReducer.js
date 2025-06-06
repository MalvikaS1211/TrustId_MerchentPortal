import { createSlice } from "@reduxjs/toolkit";
const getInitialDarkMode = () => {
  const savedMode = sessionStorage.getItem("darkMode");
  return savedMode ? JSON.parse(savedMode) : false;
};

const initialState = {
  darkMode: getInitialDarkMode(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      sessionStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
    resetTheme: () => {
      sessionStorage.setItem("darkMode", JSON.stringify(false));
      return { darkMode: false };
    },
  },
});

export const { toggleDarkMode, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
