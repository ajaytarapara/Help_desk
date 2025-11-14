import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "../auth/types";
import { SelectListItem, TicketUserSummary } from "./types";
import {
  getAllAgent,
  getAllCategory,
  getAllPriority,
  getAllStatus,
  getUserTicketSummary,
} from "./dropDownService";

export const getAllPriorityThunk = createAsyncThunk<
  ApiResponse<SelectListItem[]>
>("lookup/get-all-priority", async () => {
  const response = await getAllPriority();
  return response;
});

export const getAllStatusThunk = createAsyncThunk<
  ApiResponse<SelectListItem[]>
>("lookup/get-all-status", async () => {
  const response = await getAllStatus();
  return response;
});

export const getAllCategoryThunk = createAsyncThunk<
  ApiResponse<SelectListItem[]>
>("lookup/get-all-category", async () => {
  const response = await getAllCategory();
  return response;
});

export const getAllAgentThunk = createAsyncThunk<ApiResponse<SelectListItem[]>>(
  "lookup/get-all-agent",
  async () => {
    const response = await getAllAgent();
    return response;
  }
);

export const getTicketUserSummaryThunk = createAsyncThunk<
  ApiResponse<TicketUserSummary>
>("lookup/ticket-user-summary", async () => {
  const response = await getUserTicketSummary();
  return response;
});
