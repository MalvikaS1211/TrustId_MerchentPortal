import { createSlice } from "@reduxjs/toolkit";

let token = localStorage.getItem("trust-token");

const initialState = {
    token: token ? token : "",
    isLogin: token ? true : false,
    profile: {},
    userInfo: {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogin(state, action) {
            const { token, data, userInfo } = action.payload;
            localStorage.setItem("trust-token", token);
            state.token = token;
            state.isLogin = true;
            state.profile = data;
            state.userInfo = userInfo;
        },
        setProfile(state, action) {
            state.profile = { ...action.payload.data };
            state.userInfo = { ...action.payload.userInfo };
        },
        authLogout(state) {
            localStorage.removeItem("trust-token");
            state.token = "";
            state.isLogin = false;
            state.profile = {};
            state.userInfo = {};
        },
    },
});

export const { authLogin, authLogout, setProfile } = authSlice.actions;
export default authSlice.reducer;