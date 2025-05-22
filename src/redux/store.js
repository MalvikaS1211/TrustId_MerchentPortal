import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/darkLightThemeReducer';
import authReducer from './reducers/auth';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer
    }
});