import { createSlice } from "@reduxjs/toolkit";

const initialState: ReportAnalystAssignment = {
  id: 0,
  ana_validatedcase_id_fk: "",
  ana_positionname: "",
  ana_useranalyst_id: "",
  ana_uservalidator_id: "",
  ana_days: 0,
  ana_amountreturns: 0,
  ana_isreturned: false,
  ana_justifications: "",
  ana_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const reportAnalystAssignmentSlice = createSlice({
  name: "reportAnalystAssignment",
  initialState,
  reducers: {
    setIdReportAnalystAssignment: (state, action) => {
      state.id = action.payload;
    },
    setValidateCaseIdFk: (state, action) => {
      state.ana_validatedcase_id_fk = action.payload;
    },
    setPositionName: (state, action) => {
      state.ana_positionname = action.payload;
    },
    setUserAnalystIdReportAnalystAssignment: (state, action) => {
      state.ana_useranalyst_id = action.payload;
    },
    setUserValidatorIdReportAnalystAssignment: (state, action) => {
      state.ana_uservalidator_id = action.payload;
    },
    setDaysReportAnalystAssignment: (state, action) => {
      state.ana_days = action.payload;
    },
    setAmountReturnsReportAnalystAssignment: (state, action) => {
      state.ana_amountreturns = action.payload;
    },
    setIsReturnedReportAnalystAssignment: (state, action) => {
      state.ana_isreturned = action.payload;
    },
    setJustificationsReportAnalystAssignment: (state, action) => {
      state.ana_justifications = action.payload;
    },
    setStatusReportAnalystAssignment: (state, action) => {
      state.ana_status = action.payload;
    },
    setCreateDateReportAnalystAssignment: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateReportAnalystAssignment: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateReportAnalystAssignment: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesReportAnalystAssignment: (state) => {
      state.id = 0;
      state.ana_validatedcase_id_fk = "";
      state.ana_positionname = "";
      state.ana_useranalyst_id = "";
      state.ana_uservalidator_id = "";
      state.ana_days = 0;
      state.ana_amountreturns = 0;
      state.ana_isreturned = false;
      state.ana_justifications = "";
      state.ana_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdReportAnalystAssignment,
  setValidateCaseIdFk,
  setPositionName: setPositionIdFk,
  setUserAnalystIdReportAnalystAssignment,
  setUserValidatorIdReportAnalystAssignment,
  setDaysReportAnalystAssignment,
  setAmountReturnsReportAnalystAssignment,
  setIsReturnedReportAnalystAssignment,
  setJustificationsReportAnalystAssignment,
  setStatusReportAnalystAssignment,
  setCreateDateReportAnalystAssignment,
  setUpdateDateReportAnalystAssignment,
  setDeleteDateReportAnalystAssignment,
  setDefaultValuesReportAnalystAssignment,
} = reportAnalystAssignmentSlice.actions;

export default reportAnalystAssignmentSlice.reducer;
