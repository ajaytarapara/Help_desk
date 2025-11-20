import axiosClient from "../../core/api/axiosInstance";
import {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  User,
  UserInfo,
} from "./types";

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

export const getUser = async (): Promise<ApiResponse<UserInfo>> => {
  const response = await axiosClient.get<ApiResponse<UserInfo>>("/auth/me", {
    headers: {
      showToast: false,
    },
  });
  return response.data;
};

export const logoutApi = async (): Promise<ApiResponse<any>> => {
  const response = await axiosClient.post(
    "/auth/logout",
    {},
    { withCredentials: true }
  );
  return response.data;
};
