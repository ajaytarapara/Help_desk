import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, PaginationResponse } from "../auth/types";
import {
  CreateTicketRequest,
  FunAgentResolutionTimeResponse,
  Ticket,
  TicketAttr,
  TicketPaginationRequest,
  TicketSummaryResponse,
} from "./types";
import {
  createTicket,
  deleteTicket,
  getAgentMyTicket,
  getAllHighPriorityTicket,
  getAllTicket,
  getAvgResolutionTime,
  getTicketDetail,
  getTicketSummary,
  updateAgentTicket,
  updateUserTicket,
} from "./ticketService";

export const createTicketThunk = createAsyncThunk<
  ApiResponse<Ticket>,
  CreateTicketRequest
>("ticket/create", async (data) => {
  const response = await createTicket(data);
  return response;
});

export const getAllTicketThunk = createAsyncThunk<
  PaginationResponse<TicketAttr>,
  TicketPaginationRequest
>("ticket/get-all", async (data) => {
  const response = await getAllTicket(data);
  return response;
});

export const getTicketDetailThunk = createAsyncThunk<
  ApiResponse<TicketAttr>,
  number
>("ticket/detail", async (ticketId) => {
  const response = await getTicketDetail(ticketId);
  return response;
});

export const deleteTicketThunk = createAsyncThunk<ApiResponse<Ticket>, number>(
  "ticket/delete",
  async (ticketId: number) => {
    const response = await deleteTicket(ticketId);
    return response;
  }
);

export const updateUserTicketThunk = createAsyncThunk<
  ApiResponse<Ticket>,
  CreateTicketRequest
>("ticket/create", async (data) => {
  const response = await updateUserTicket(data);
  return response;
});

export const getAgentMyTicketThunk = createAsyncThunk<
  PaginationResponse<TicketAttr>,
  TicketPaginationRequest
>("ticket/my-agent-tickets", async (data) => {
  const response = await getAgentMyTicket(data);
  return response;
});

export const updateAgentTicketThunk = createAsyncThunk<
  TicketAttr,
  { ticketId: number; assignedToId?: number; statusId?: number }
>("ticket/update-agent", async ({ ticketId, ...data }) => {
  const response = await updateAgentTicket(ticketId, data);
  return response;
});

export const getAgentAvgResolutionTime = createAsyncThunk<
  ApiResponse<FunAgentResolutionTimeResponse>
>("agent/getAvgResolutionTime", async () => {
  const response = await getAvgResolutionTime();
  return response;
});

export const ticketSummary = createAsyncThunk<
  ApiResponse<TicketSummaryResponse>
>("agent/ticket-status-summary", async () => {
  const response = await getTicketSummary();
  return response;
});

export const getAllHighPriorityTicketThunk = createAsyncThunk<TicketAttr[]>(
  "ticket/getHighPriorityTickets",
  async () => {
    const response = await getAllHighPriorityTicket();
    return response;
  }
);
