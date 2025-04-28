import { createSlice } from "@reduxjs/toolkit";

const initialState: RiskCause = {
  id: 0,
  ris_c_name: "",
  ris_c_event_id: 0,
  ris_c_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const riskCauseSlice = createSlice({
  name: "riskCause",
  initialState,
  reducers: {
    setIdRiskCause: (state, action) => {
      state.id = action.payload;
    },
    setNameRiskCause: (state, action) => {
      state.ris_c_name = action.payload;
    },
    setEventIdRiskCause: (state, action) => {
      state.ris_c_event_id = action.payload;
    },
    setStatusRiskCause: (state, action) => {
      state.ris_c_status = action.payload;
    },
    setCreateDateRiskCause: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateRiskCause: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateRiskCause: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesRiskCause: (state) => {
      state.id = 0;
      state.ris_c_name = "";
      state.ris_c_event_id = 0;
      state.ris_c_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdRiskCause,
  setNameRiskCause,
  setEventIdRiskCause,
  setStatusRiskCause,
  setDefaultValuesRiskCause,
  setCreateDateRiskCause,
  setDeleteDateRiskCause,
  setUpdateDateRiskCause,
} = riskCauseSlice.actions;

export default riskCauseSlice.reducer;
