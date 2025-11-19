import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiResponse,
  PaginationRequest,
  PaginationResponse,
} from "../auth/types";

import { StatusAttr, StatusRequest } from "./types";
import {
  getStatusById,
  createStatus,
  updateStatus,
  getAllStatus,
  deleteStatus,
} from "./statusService";

export const getStatusByIdThunk = createAsyncThunk<
  ApiResponse<StatusAttr>,
  number
>("status/details", async (priorityId: number) => {
  const response = await getStatusById(priorityId);
  return response;
});

export const createStatusThunk = createAsyncThunk<
  ApiResponse<string>,
  StatusRequest
>("status/create", async (data) => {
  const response = await createStatus(data);
  return response;
});

export const updateStatusThunk = createAsyncThunk<
  ApiResponse<string>,
  StatusRequest
>("status/create", async (data) => {
  const response = await updateStatus(data);
  return response;
});

export const getAllStatusThunk = createAsyncThunk<
  PaginationResponse<StatusAttr>,
  PaginationRequest
>("status/get-all", async (data) => {
  const response = await getAllStatus(data);
  return response;
});

export const deleteStatusThunk = createAsyncThunk<ApiResponse<string>, number>(
  "status/delete",
  async (priorityId: number) => {
    const response = await deleteStatus(priorityId);
    return response;
  }
);
