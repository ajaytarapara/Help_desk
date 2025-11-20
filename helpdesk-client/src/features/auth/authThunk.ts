import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  User,
  UserInfo,
} from "./types";
import { getUser, login, logoutApi, register } from "./authService";

export const loginUser = createAsyncThunk<ApiResponse<string>, LoginRequest>(
  "auth/login",
  async (data) => {
    const response = await login(data);
    return response;
  }
);

export const registerUser = createAsyncThunk<
  ApiResponse<User>,
  RegisterRequest
>("auth/register", async (data) => {
  const response = await register(data);
  return response;
});

export const fetchUser = createAsyncThunk<ApiResponse<UserInfo>>(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      const response = await getUser();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await logoutApi();
  return response;
});
