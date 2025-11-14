import axiosClient from "../../core/api/axiosInstance";
import { ApiResponse, PaginationResponse } from "../auth/types";
import {
  CreateTicketRequest,
  FunAgentResolutionTimeResponse,
  Ticket,
  TicketAttr,
  TicketPaginationRequest,
  TicketSummaryResponse,
} from "./types";

export const createTicket = async (
  data: CreateTicketRequest
): Promise<ApiResponse<Ticket>> => {
  const response = await axiosClient.post<ApiResponse<Ticket>>("/ticket", data);
  return response.data;
};

export const getAllTicket = async (
  data: TicketPaginationRequest
): Promise<PaginationResponse<TicketAttr>> => {
  const response = await axiosClient.post<PaginationResponse<TicketAttr>>(
    "/ticket/get-all",
    data,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const deleteTicket = async (
  ticketId: number
): Promise<ApiResponse<Ticket>> => {
  const response = await axiosClient.delete<ApiResponse<Ticket>>(
    `/ticket/user-delete/${ticketId}`
  );
  return response.data;
};

export const getTicketDetail = async (
  ticketId: number
): Promise<ApiResponse<TicketAttr>> => {
  const response = await axiosClient.get<ApiResponse<TicketAttr>>(
    `/Ticket?ticketId=${ticketId}`,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const updateUserTicket = async (
  data: CreateTicketRequest
): Promise<ApiResponse<Ticket>> => {
  const { ticketId, ...payload } = data;
  const response = await axiosClient.put<ApiResponse<Ticket>>(
    `/ticket/user-update/${data.ticketId}`,
    payload
  );
  return response.data;
};

export const getAgentMyTicket = async (
  data: TicketPaginationRequest
): Promise<PaginationResponse<TicketAttr>> => {
  const response = await axiosClient.post<PaginationResponse<TicketAttr>>(
    "/ticket/my-agent-tickets",
    data,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const updateAgentTicket = async (
  ticketId: number,
  data: { assignedToId?: number; statusId?: number }
): Promise<TicketAttr> => {
  const response = await axiosClient.put<TicketAttr>(
    `/ticket/agent-update/${ticketId}`,
    data,
    {
      headers: {
        showToast: true,
      },
    }
  );
  return response.data;
};

export const getAvgResolutionTime = async (): Promise<
  ApiResponse<FunAgentResolutionTimeResponse>
> => {
  const response = await axiosClient.get<
    ApiResponse<FunAgentResolutionTimeResponse>
  >("/agent/avg-resolution-time", {
    headers: {
      showToast: false,
    },
  });
  return response.data;
};

export const getTicketSummary = async (): Promise<
  ApiResponse<TicketSummaryResponse>
> => {
  const response = await axiosClient.get<ApiResponse<TicketSummaryResponse>>(
    "/agent/ticket-status-summary",
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const getAllHighPriorityTicket = async (): Promise<TicketAttr[]> => {
  const response = await axiosClient.get<TicketAttr[]>(
    "/agent/high-priority-pending-ticket",
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};
