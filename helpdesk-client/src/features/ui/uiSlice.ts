import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  loading: boolean;
}

const initialState: UiState = {
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoader, hideLoader } = uiSlice.actions;
export default uiSlice.reducer;
