import axiosClient from "../../core/api/axiosInstance";
import {
  ApiResponse,
  PaginationRequest,
  PaginationResponse,
} from "../auth/types";
import { StatusAttr, StatusRequest } from "./types";

export const getStatusById = async (
  priorityId: number
): Promise<ApiResponse<StatusAttr>> => {
  const response = await axiosClient.get<ApiResponse<StatusAttr>>(
    `/status/${priorityId}`,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const createStatus = async (
  data: StatusRequest
): Promise<ApiResponse<string>> => {
  const response = await axiosClient.post<ApiResponse<string>>(
    `/status/create`,
    data,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const updateStatus = async (
  data: StatusRequest
): Promise<ApiResponse<string>> => {
  const { statusId, ...payload } = data;
  const response = await axiosClient.put<ApiResponse<string>>(
    `/status/${data.statusId}`,
    payload
  );
  return response.data;
};

export const getAllStatus = async (
  data: PaginationRequest
): Promise<PaginationResponse<StatusAttr>> => {
  const response = await axiosClient.post<PaginationResponse<StatusAttr>>(
    "/status/get-all",
    data,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const deleteStatus = async (
  priorityId: number
): Promise<ApiResponse<string>> => {
  const response = await axiosClient.delete<ApiResponse<string>>(
    `/Status/${priorityId}`
  );
  return response.data;
};
