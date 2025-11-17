import axiosClient from "../../core/api/axiosInstance";
import { ApiResponse, PaginationResponse } from "../auth/types";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserPaginationRequest,
} from "./type";

export const createUser = async (
  payload: CreateUserRequest
): Promise<ApiResponse<{ userId: number }>> => {
  const response = await axiosClient.post("AdminApi/user/create", payload);
  return response.data;
};

export const updateUser = async (
  id: number,
  payload: UpdateUserRequest
): Promise<ApiResponse<boolean>> => {
  const response = await axiosClient.put(`AdminApi/user/update/${id}`, payload);
  return response.data;
};

export const deleteUser = async (id: number): Promise<ApiResponse<boolean>> => {
  const response = await axiosClient.delete(`/user/delete/${id}`);
  return response.data;
};

export const getAllUsers = async (
  payload: UserPaginationRequest
): Promise<PaginationResponse<UserListResponse>> => {
  const response = await axiosClient.post<PaginationResponse<UserListResponse>>(
    "/AdminApi/get-users",
    payload,
    {
      headers: {
        showToast: false,
      },
    }
  );

  return response.data;
};

export const getUserById = async (
  id: number
): Promise<ApiResponse<UserListResponse>> => {
  const response = await axiosClient.get(`/AdminApi/${id}`, {
    headers: {
      showToast: false,
    },
  });
  return response.data;
};
