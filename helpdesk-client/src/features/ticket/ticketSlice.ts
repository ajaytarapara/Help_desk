import { createSlice } from "@reduxjs/toolkit";
import {
  createTicketThunk,
  getAgentAvgResolutionTime,
  ticketSummary,
} from "./ticketThunk";
import { Ticket, TicketSummaryResponse } from "./types";

interface TicketState {
  tickets: Ticket[];
  avgResolutionTime: number;
  ticketStatusSummary: TicketSummaryResponse;
}

const initialState: TicketState = {
  tickets: [],
  avgResolutionTime: 0,
  ticketStatusSummary: {} as TicketSummaryResponse,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTicketThunk.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.tickets.push(action.payload.data);
      }
    });
    builder.addCase(getAgentAvgResolutionTime.fulfilled, (state, action) => {
      state.avgResolutionTime =
        action.payload.data?.averageResolutionHours ?? 0;
    });
    builder.addCase(ticketSummary.fulfilled, (state, action) => {
      state.ticketStatusSummary = action.payload?.data;
    });
  },
});

export default ticketSlice.reducer;
