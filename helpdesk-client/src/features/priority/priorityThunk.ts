import { createAsyncThunk } from "@reduxjs/toolkit";
import { PriorityAttr, PriorityRequest } from "./types";
import {
  createPriority,
  deletePriority,
  getAllPriority,
  getPriorityById,
  updatePriority,
} from "./priorityService";
import {
  ApiResponse,
  PaginationRequest,
  PaginationResponse,
} from "../auth/types";

export const getPriorityByIdThunk = createAsyncThunk<
  ApiResponse<PriorityAttr>,
  number
>("priority/details", async (priorityId: number) => {
  const response = await getPriorityById(priorityId);
  return response;
});

export const createPriorityThunk = createAsyncThunk<
  ApiResponse<string>,
  PriorityRequest
>("priority/create", async (data) => {
  const response = await createPriority(data);
  return response;
});

export const updatePriorityThunk = createAsyncThunk<
  ApiResponse<string>,
  PriorityRequest
>("priority/create", async (data) => {
  const response = await updatePriority(data);
  return response;
});

export const getAllPriorityThunk = createAsyncThunk<
  PaginationResponse<PriorityAttr>,
  PaginationRequest
>("priority/get-all", async (data) => {
  const response = await getAllPriority(data);
  return response;
});

export const deletePriorityThunk = createAsyncThunk<
  ApiResponse<string>,
  number
>("priority/delete", async (priorityId: number) => {
  const response = await deletePriority(priorityId);
  return response;
});
