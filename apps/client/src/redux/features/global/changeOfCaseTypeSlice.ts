import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idOfCaseType: 0,
  idOfCaseTypeAdverseEvent: 0,
  idOfCaseTypeIncident: 0,
  idOfCaseTypeIndicationsUnsafeCare: 0,
  idOfCaseTypeRisk: 0,
};

export const changeOfCaseTypeSlice = createSlice({
  name: "changeOfCaseType",
  initialState,
  reducers: {
    setIdOfCaseType: (state, action) => {
      state.idOfCaseType = action.payload;
    },
    setIdOfCaseTypeAdverseEvent: (state, action) => {
      state.idOfCaseTypeAdverseEvent = action.payload;
    },
    setIdOfCaseTypeIncident: (state, action) => {
      state.idOfCaseTypeIncident = action.payload;
    },
    setIdOfCaseTypeIndicationsUnsafeCare: (state, action) => {
      state.idOfCaseTypeIndicationsUnsafeCare = action.payload;
    },
    setIdOfCaseTypeRisk: (state, action) => {
      state.idOfCaseTypeRisk = action.payload;
    },
  },
});

export const {
  setIdOfCaseType,
  setIdOfCaseTypeAdverseEvent,
  setIdOfCaseTypeIncident,
  setIdOfCaseTypeIndicationsUnsafeCare,
  setIdOfCaseTypeRisk,
} = changeOfCaseTypeSlice.actions;

export default changeOfCaseTypeSlice.reducer;
