import axiosClient from "../../core/api/axiosInstance";
import {
  ApiResponse,
  PaginationRequest,
  PaginationResponse,
} from "../auth/types";
import { PriorityAttr, PriorityRequest } from "./types";

export const getPriorityById = async (
  priorityId: number
): Promise<ApiResponse<PriorityAttr>> => {
  const response = await axiosClient.get<ApiResponse<PriorityAttr>>(
    `/priority/${priorityId}`,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const createPriority = async (
  data: PriorityRequest
): Promise<ApiResponse<string>> => {
  const response = await axiosClient.post<ApiResponse<string>>(
    `/priority/create`,
    data,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const updatePriority = async (
  data: PriorityRequest
): Promise<ApiResponse<string>> => {
  const { priorityId, ...payload } = data;
  const response = await axiosClient.put<ApiResponse<string>>(
    `/priority/${data.priorityId}`,
    payload
  );
  return response.data;
};

export const getAllPriority = async (
  data: PaginationRequest
): Promise<PaginationResponse<PriorityAttr>> => {
  const response = await axiosClient.post<PaginationResponse<PriorityAttr>>(
    "/priority/get-all",
    data,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const deletePriority = async (
  priorityId: number
): Promise<ApiResponse<string>> => {
  const response = await axiosClient.delete<ApiResponse<string>>(
    `/Priority/${priorityId}`
  );
  return response.data;
};
