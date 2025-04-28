import { createSlice } from "@reduxjs/toolkit";

const initialState: ReportResearcherAssignment = {
  id: 0,
  res_validatedcase_id_fk: "",
  res_useranalyst_id: "",
  res_positionname: "",
  res_justifications: "",
  res_userresearch_id: "",
  res_days: 0,
  res_isreturned: true,
  res_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const reportResearcherAssignmentSlice = createSlice({
  name: "reportResearcherAssignment",
  initialState,
  reducers: {
    setIdReportResearcherAssignment: (state, action) => {
      state.id = action.payload;
    },
    setValidateCaseIdFk: (state, action) => {
      state.res_validatedcase_id_fk = action.payload;
    },
    setUserAnalystIdReportResearcherAssignment: (state, action) => {
      state.res_useranalyst_id = action.payload;
    },
    setPositionNameReportResearcherAssignment: (state, action) => {
      state.res_positionname = action.payload;
    },
    setJustifiactionsReportResearcherAssignment: (state, action) => {
      state.res_justifications = action.payload;
    },
    setUserResearchIdReportResearcherAssignment: (state, action) => {
      state.res_userresearch_id = action.payload;
    },
    setDaysReportResearcherAssignment: (state, action) => {
      state.res_days = action.payload;
    },
    setIsReturnedReportResearcherAssignment: (state, action) => {
      state.res_isreturned = action.payload;
    },
    setStatusReportResearcherAssignment: (state, action) => {
      state.res_status = action.payload;
    },
    setCreateDateReportResearcherAssignment: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateReportResearcherAssignment: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateReportResearcherAssignment: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesReportResearcherAssignment: (state) => {
      state.id = 0;
      state.res_validatedcase_id_fk = "";
      state.res_useranalyst_id = "";
      state.res_justifications = "";
      state.res_userresearch_id = "";
      state.res_userresearch_id = "";
      state.res_days = 0;
      state.res_isreturned = false;
      state.res_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdReportResearcherAssignment,
  setValidateCaseIdFk,
  setUserAnalystIdReportResearcherAssignment,
  setJustifiactionsReportResearcherAssignment,
  setPositionNameReportResearcherAssignment,
  setUserResearchIdReportResearcherAssignment,
  setDaysReportResearcherAssignment,
  setIsReturnedReportResearcherAssignment,
  setStatusReportResearcherAssignment,
  setCreateDateReportResearcherAssignment,
  setUpdateDateReportResearcherAssignment,
  setDeleteDateReportResearcherAssignment,
  setDefaultValuesReportResearcherAssignment,
} = reportResearcherAssignmentSlice.actions;

export default reportResearcherAssignmentSlice.reducer;
