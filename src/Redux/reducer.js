import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  businessId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.businessId = action.payload?.businessId || null;
    },
    setBusinessId: (state, action) => {
      state.businessId = action.payload;
    },
  },
});

export const { setUserInfo, setBusinessId } = userSlice.actions;
export default userSlice.reducer;
