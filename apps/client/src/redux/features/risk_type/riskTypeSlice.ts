import { createSlice } from "@reduxjs/toolkit";

const initialState: RiskType = {
  id: 0,
  ris_t_name: "",
  ris_t_description: "",
  ris_t_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const riskTypeSlice = createSlice({
  name: "riskType",
  initialState,
  reducers: {
    setIdRiskType: (state, action) => {
      state.id = action.payload;
    },
    setNameRiskType: (state, action) => {
      state.ris_t_name = action.payload;
    },
    setDescriptionRiskType: (state, action) => {
      state.ris_t_description = action.payload;
    },
    setStatusRiskType: (state, action) => {
      state.ris_t_status = action.payload;
    },
    setCreateDateRiskType: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateRiskType: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateRiskType: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesRiskType: (state) => {
      state.id = 0;
      state.ris_t_name = "";
      state.ris_t_description = "";
      state.ris_t_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdRiskType,
  setNameRiskType,
  setDescriptionRiskType,
  setStatusRiskType,
  setCreateDateRiskType,
  setUpdateDateRiskType,
  setDeleteDateRiskType,
  setDefaultValuesRiskType,
} = riskTypeSlice.actions;

export default riskTypeSlice.reducer;
