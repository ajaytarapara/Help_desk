import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "./categoryService";
import { ApiResponse, PaginationRequest } from "../auth/types";
import {
  CategoryResponse,
  CreateCategoryRequest,
  UpdateCategoryPayload,
} from "./type";

export const getAllCategoriesThunk = createAsyncThunk(
  "category/getAll",
  async (payload: PaginationRequest) => {
    return await categoryService.getAllCategories(payload);
  }
);

export const createCategoryThunk = createAsyncThunk<
  ApiResponse<CategoryResponse>,
  CreateCategoryRequest
>("category/create", async (payload) => {
  return await categoryService.createCategory(payload);
});

export const updateCategoryThunk = createAsyncThunk<
  ApiResponse<CategoryResponse>,
  UpdateCategoryPayload
>("category/update", async ({ categoryId, payload }) => {
  return await categoryService.updateCategory(categoryId, payload);
});

export const getCategoryByIdThunk = createAsyncThunk(
  "category/getById",
  async (id: number) => {
    return await categoryService.getCategoryById(id);
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "category/delete",
  async (id: number) => {
    return await categoryService.deleteCategory(id);
  }
);
