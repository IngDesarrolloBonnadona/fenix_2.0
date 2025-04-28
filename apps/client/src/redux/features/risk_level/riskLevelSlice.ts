import { createSlice } from "@reduxjs/toolkit";

const initialState: RiskLevel = {
  id: 0,
  ris_l_name: "",
  ris_l_description: "",
  ris_l_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const riskLevelSlice = createSlice({
  name: "riskLevel",
  initialState,
  reducers: {
    setIdRiskLevel: (state, action) => {
      state.id = action.payload;
    },
    setNameRiskLevel: (state, action) => {
      state.ris_l_name = action.payload;
    },
    setDescriptionRiskLevel: (state, action) => {
      state.ris_l_description = action.payload;
    },
    setStatusRiskLevel: (state, action) => {
      state.ris_l_status = action.payload;
    },
    setCreateDateRiskLevel: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateRiskLevel: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateRiskLevel: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesRiskLevel: (state) => {
      state.id = 0;
      state.ris_l_name = "";
      state.ris_l_description = "";
      state.ris_l_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdRiskLevel,
  setNameRiskLevel,
  setDescriptionRiskLevel,
  setStatusRiskLevel,
  setCreateDateRiskLevel,
  setUpdateDateRiskLevel,
  setDeleteDateRiskLevel,
  setDefaultValuesRiskLevel,
} = riskLevelSlice.actions;

export default riskLevelSlice.reducer;
