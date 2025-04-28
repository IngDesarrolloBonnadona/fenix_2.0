import { createSlice } from "@reduxjs/toolkit";

const initialState: SelectedCases = {
  selectedCases: [],
  selectedCasesId: [],
  newCaseValidateId: "",
};

export const selectedCasesSlice = createSlice({
  name: "selectedCases",
  initialState,
  reducers: {
    setSelectedCases: (state, action) => {
      state.selectedCases = action.payload;
    },
    setSelectedCasesId: (state, action) => {
      state.selectedCasesId = action.payload;
    },
    setNewCaseValidateId: (state, action) => {
      state.newCaseValidateId = action.payload;
    },
    setDefaultValuesSelectedCases: (state) => {
      state.selectedCases = [];
      state.selectedCasesId = [];
      state.newCaseValidateId = "";
    },
  },
});

export const {
  setSelectedCases,
  setSelectedCasesId,
  setNewCaseValidateId,
  setDefaultValuesSelectedCases,
} = selectedCasesSlice.actions;

export default selectedCasesSlice.reducer;
