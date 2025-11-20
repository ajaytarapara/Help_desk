import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, logoutUser } from "./authThunk";
import { UserInfo } from "./types";

interface AuthState {
  token: string | null;
  user: UserInfo | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const token = action.payload?.data;
      if (token) {
        state.token = token;
      }
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
