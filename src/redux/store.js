import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/darkLightThemeReducer';

export const store = configureStore({
    reducer: {
        theme: themeReducer
    }
});