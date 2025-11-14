import axiosClient from "../../core/api/axiosInstance";
import { ApiResponse, LoginRequest, RegisterRequest, User } from "./types";

export const login = async (
  data: LoginRequest
): Promise<ApiResponse<string>> => {
  const response = await axiosClient.post<ApiResponse<string>>(
    `/auth/login`,
    data
  );
  return response.data;
};

export const register = async (
  data: RegisterRequest
): Promise<ApiResponse<User>> => {
  const response = await axiosClient.post<ApiResponse<User>>(
    `/auth/register`,
    data
  );
  return response.data;
};
