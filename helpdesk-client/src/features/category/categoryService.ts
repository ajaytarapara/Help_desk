import {
  ApiResponse,
  PaginationRequest,
  PaginationResponse,
} from "../auth/types";
import { CreateCategoryRequest, CategoryResponse } from "./type";
import axiosClient from "../../core/api/axiosInstance";

const CATEGORY_API = "/Category";

export const categoryService = {
  createCategory: async (
    payload: CreateCategoryRequest
  ): Promise<ApiResponse<CategoryResponse>> => {
    const response = await axiosClient.post<ApiResponse<CategoryResponse>>(
      CATEGORY_API,
      payload
    );
    return response.data;
  },

  updateCategory: async (
    id: number,
    payload: CreateCategoryRequest
  ): Promise<ApiResponse<CategoryResponse>> => {
    const response = await axiosClient.put<ApiResponse<CategoryResponse>>(
      `${CATEGORY_API}/${id}`,
      payload
    );
    return response.data;
  },

  getCategoryById: async (
    id: number
  ): Promise<ApiResponse<CategoryResponse>> => {
    const response = await axiosClient.get<ApiResponse<CategoryResponse>>(
      `${CATEGORY_API}/${id}`,
      {
        headers: {
          showToast: false,
        },
      }
    );
    return response.data;
  },

  deleteCategory: async (id: number): Promise<ApiResponse<null>> => {
    const response = await axiosClient.delete<ApiResponse<null>>(
      `${CATEGORY_API}/${id}`
    );
    return response.data;
  },

  getAllCategories: async (
    paginationRequest: PaginationRequest
  ): Promise<PaginationResponse<CategoryResponse>> => {
    const response = await axiosClient.post<
      PaginationResponse<CategoryResponse>
    >(`${CATEGORY_API}/get-all`, paginationRequest, {
      headers: {
        showToast: false,
      },
    });
    return response.data;
  },
};
