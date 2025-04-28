import { createSlice } from "@reduxjs/toolkit";

const initialState: ReasonCancellationCase = {
  id: 0,
  cac_r_cause: "",
  cac_r_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const reasonCancellationCaseSlice = createSlice({
  name: "reasonCancellationCase",
  initialState,
  reducers: {
    setIdReasonCancellationCase: (state, action) => {
      state.id = action.payload;
    },
    setCauseReasonCancellationCase: (state, action) => {
      state.cac_r_cause = action.payload;
    },
    setStatusReasonCancellationCase: (state, action) => {
      state.cac_r_status = action.payload;
    },
    setCreateDateReasonCancellationCase: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateReasonCancellationCase: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateReasonCancellationCase: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesReasonCancellationCase: (state) => {
      state.id = 0;
      state.cac_r_cause = "";
      state.cac_r_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdReasonCancellationCase,
  setCauseReasonCancellationCase,
  setStatusReasonCancellationCase,
  setCreateDateReasonCancellationCase,
  setUpdateDateReasonCancellationCase,
  setDeleteDateReasonCancellationCase,
  setDefaultValuesReasonCancellationCase,
} = reasonCancellationCaseSlice.actions;

export default reasonCancellationCaseSlice.reducer;
