import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  userToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (data, { payload }) => {
      data.userToken = payload.token;
      data.userInfo = { ...payload.user };
      return data;
    },
    setProfile: (data, { payload }) => {
      data.userToken = payload.token;
      data.userInfo = { ...payload.user };
      return data;
    },
    logout: () => {
      localStorage.clear("token");
      return {
        userInfo: {},
        userToken: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setProfile } = authSlice.actions;

export default authSlice.reducer;
