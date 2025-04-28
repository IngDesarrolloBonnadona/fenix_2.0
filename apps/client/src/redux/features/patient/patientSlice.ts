import { createSlice } from "@reduxjs/toolkit";

const initialState: Patient = {
  patientDoctype: "",
  patientDocument: "",
  patientCompanyCode: "",
  patientCompanyDescription: "",
  patientFirstName: "",
  patientSecondName: "",
  patientSurname: "",
  patientLastname: "",
  patientAge: "",
  patientGender: "",
  diagnosisCode: "",
  diagnosisDescription: "",
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientDoctype: (state, action) => {
      state.patientDoctype = action.payload;
    },
    setPatientDocument: (state, action) => {
      state.patientDocument = action.payload;
    },
    setPatientCompanyCode: (state, action) => {
      state.patientCompanyCode = action.payload;
    },
    setPatientCompanyDescription: (state, action) => {
      state.patientCompanyDescription = action.payload;
    },
    setPatientFirstName: (state, action) => {
      state.patientFirstName = action.payload;
    },
    setPatientSecondName: (state, action) => {
      state.patientSecondName = action.payload;
    },
    setPatientSurname: (state, action) => {
      state.patientSurname = action.payload;
    },
    setPatientLastname: (state, action) => {
      state.patientLastname = action.payload;
    },
    setPatientAge: (state, action) => {
      state.patientAge = action.payload;
    },
    setPatientGender: (state, action) => {
      state.patientGender = action.payload;
    },
    setDiagnosisCode: (state, action) => {
      state.diagnosisCode = action.payload;
    },
    setDiagnosisDescription: (state, action) => {
      state.diagnosisDescription = action.payload;
    },
    setDefaultValuesPatient: (state) => {
      state.patientDoctype = "";
      state.patientDocument = "";
      state.patientCompanyCode = "";
      state.patientCompanyDescription = "";
      state.patientFirstName = "";
      state.patientSecondName = "";
      state.patientSurname = "";
      state.patientLastname = "";
      state.patientAge = "";
      state.patientGender = "";
      state.diagnosisCode = "";
      state.diagnosisDescription = "";
    },
  },
});

export const {
  setPatientDoctype,
  setPatientDocument,
  setPatientCompanyCode,
  setPatientCompanyDescription,
  setPatientFirstName,
  setPatientSecondName,
  setPatientSurname,
  setPatientLastname,
  setPatientAge,
  setPatientGender,
  setDiagnosisCode,
  setDiagnosisDescription,
} = patientSlice.actions;

export default patientSlice.reducer;
