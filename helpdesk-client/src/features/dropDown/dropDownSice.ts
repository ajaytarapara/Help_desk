import { createSlice } from "@reduxjs/toolkit";
import { SelectListItem } from "./types";
import {
  getAllAgentThunk,
  getAllCategoryThunk,
  getAllPriorityThunk,
  getAllRolesThunk,
  getAllStatusThunk,
} from "./dropDownThunk";

interface LookupState {
  statusList: SelectListItem[];
  priorityList: SelectListItem[];
  categoryList: SelectListItem[];
  agentList: SelectListItem[];
  roleList: SelectListItem[];
}

const initialState: LookupState = {
  statusList: [],
  priorityList: [],
  categoryList: [],
  agentList: [],
  roleList: [],
};

const lookUpSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    resetDropDown: (state) => {
      state.statusList = [];
      state.categoryList = [];
      state.agentList = [];
      state.priorityList = [];
      state.roleList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPriorityThunk.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.priorityList = action.payload.data;
        }
      })
      .addCase(getAllStatusThunk.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.statusList = action.payload.data;
        }
      })
      .addCase(getAllCategoryThunk.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.categoryList = action.payload.data;
        }
      })
      .addCase(getAllAgentThunk.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.agentList = action.payload.data;
        }
      })
      .addCase(getAllRolesThunk.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.agentList = action.payload.data;
        }
      });
  },
});

export default lookUpSlice.reducer;
export const { resetDropDown } = lookUpSlice.actions;
