import axiosClient from "../../core/api/axiosInstance";
import { ApiResponse } from "../auth/types";
import { SelectListItem, TicketUserSummary } from "./types";

export const getAllStatus = async (): Promise<
  ApiResponse<SelectListItem[]>
> => {
  const response = await axiosClient.get<ApiResponse<SelectListItem[]>>(
    "/lookup/get-all-status",
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const getAllPriority = async (): Promise<
  ApiResponse<SelectListItem[]>
> => {
  const response = await axiosClient.get<ApiResponse<SelectListItem[]>>(
    "/lookup/get-all-priority",
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const getAllCategory = async (): Promise<
  ApiResponse<SelectListItem[]>
> => {
  const response = await axiosClient.get<ApiResponse<SelectListItem[]>>(
    "/lookup/get-all-category",
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const getAllAgent = async (): Promise<ApiResponse<SelectListItem[]>> => {
  const response = await axiosClient.get<ApiResponse<SelectListItem[]>>(
    "/lookup/get-all-agent",
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const getUserTicketSummary = async (): Promise<
  ApiResponse<TicketUserSummary>
> => {
  const response = await axiosClient.get<ApiResponse<TicketUserSummary>>(
    "/lookup/ticket-user-summary",
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const getAllRoles = async (): Promise<ApiResponse<SelectListItem[]>> => {
  const response = await axiosClient.get<ApiResponse<SelectListItem[]>>(
    "/lookup/get-all-roles",
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};
