import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true" || false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      const newDarkMode = !state.darkMode;

      localStorage.setItem("darkMode", newDarkMode);
      state.darkMode = newDarkMode;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
