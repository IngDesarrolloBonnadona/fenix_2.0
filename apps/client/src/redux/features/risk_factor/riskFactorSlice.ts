import { createSlice } from "@reduxjs/toolkit";

const initialState: RiskFactor = {
  id: 0,
  ris_f_name: "",
  ris_f_description: "",
  ris_f_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const riskFactorSlice = createSlice({
  name: "riskFactor",
  initialState,
  reducers: {
    setIdRiskFactor: (state, action) => {
      state.id = action.payload;
    },
    setNameRiskFactor: (state, action) => {
      state.ris_f_name = action.payload;
    },
    setDescriptionRiskFactor: (state, action) => {
      state.ris_f_description = action.payload;
    },
    setStatusRiskFactor: (state, action) => {
      state.ris_f_status = action.payload;
    },
    setCreateDateRiskFactor: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateRiskFactor: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateRiskFactor: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesRiskFactor: (state) => {
      state.id = 0;
      state.ris_f_name = "";
      state.ris_f_description = "";
      state.ris_f_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdRiskFactor,
  setNameRiskFactor,
  setDescriptionRiskFactor,
  setStatusRiskFactor,
  setCreateDateRiskFactor,
  setUpdateDateRiskFactor,
  setDeleteDateRiskFactor,
  setDefaultValuesRiskFactor,
} = riskFactorSlice.actions;

export default riskFactorSlice.reducer;
