import { createSlice } from "@reduxjs/toolkit";

const initialState: CaseType = {
  id: 0,
  cas_t_name: "",
  cas_t_description: "",
  cas_t_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const caseTypeSlice = createSlice({
  name: "caseType",
  initialState,
  reducers: {
    setIdCaseType: (state, action) => {
      state.id = action.payload;
    },
    setNameCaseType: (state, action) => {
      state.cas_t_name = action.payload;
    },
    setDescriptionCaseType: (state, action) => {
      state.cas_t_description = action.payload;
    },
    setStatusCaseType: (state, action) => {
      state.cas_t_status = action.payload;
    },
    setCreateDateCaseType: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateCaseType: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateCaseType: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesCaseType: (state) => {
      state.id = 0;
      state.cas_t_name = "";
      state.cas_t_description = "";
      state.cas_t_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdCaseType,
  setNameCaseType,
  setDescriptionCaseType,
  setStatusCaseType,
  setCreateDateCaseType,
  setUpdateDateCaseType,
  setDeleteDateCaseType,
  setDefaultValuesCaseType,
} = caseTypeSlice.actions;

export default caseTypeSlice.reducer;
