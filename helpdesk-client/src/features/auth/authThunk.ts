import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, LoginRequest, RegisterRequest, User } from "./types";
import { login, register } from "./authService";

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
