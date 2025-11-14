import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunk";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
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
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
