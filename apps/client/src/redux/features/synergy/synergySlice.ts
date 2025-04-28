import { createSlice } from "@reduxjs/toolkit";

const initialState: Synergy = {
  id: 0,
  syn_validatedcase_id_fk: "",
  syn_observations: "",
  syn_analystidnumber: "",
  syn_patientcontent: "",
  syn_possiblefaults: "",
  syn_consequences: "",
  syn_clinicalmanagement: "",
  syn_whomwasnotified: "",
  syn_evaluationdate: "",
  syn_resolutiondate: "",
  syn_status: false,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const synergySlice = createSlice({
  name: "synergy",
  initialState,
  reducers: {
    setIdSynergy: (state, action) => {
      state.id = action.payload;
    },
    setValidatedCaseIdSynergy: (state, action) => {
      state.syn_validatedcase_id_fk = action.payload;
    },
    setObservationsSynergy: (state, action) => {
      state.syn_observations = action.payload;
    },
    setAnalystIdNumberSynergy: (state, action) => {
      state.syn_analystidnumber = action.payload;
    },
    setPatientContentSynergy: (state, action) => {
      state.syn_patientcontent = action.payload;
    },
    setPossibleFaultsSynergy: (state, action) => {
      state.syn_possiblefaults = action.payload;
    },
    setConsequenceSynergy: (state, action) => {
      state.syn_consequences = action.payload;
    },
    setClinicalManagementSynergy: (state, action) => {
      state.syn_clinicalmanagement = action.payload;
    },
    setWhomWasNotifiedSynergy: (state, action) => {
      state.syn_whomwasnotified = action.payload;
    },
    setEvaluationDateSynergy: (state, action) => {
      state.syn_evaluationdate = action.payload;
    },
    setResolutionDateSynergy: (state, action) => {
      state.syn_resolutiondate = action.payload;
    },
    setStatusSynergy: (state, action) => {
      state.syn_status = action.payload;
    },
    setCreateDateSynergy: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateSynergy: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateSynergy: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesSynergy: (state) => {
      state.id = 0;
      state.syn_validatedcase_id_fk = "";
      state.syn_observations = "";
      state.syn_analystidnumber = "";
      state.syn_patientcontent = "";
      state.syn_possiblefaults = "";
      state.syn_consequences = "";
      state.syn_clinicalmanagement = "";
      state.syn_whomwasnotified = "";
      state.syn_evaluationdate = "";
      state.syn_resolutiondate = "";
      state.syn_status = false;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdSynergy,
  setValidatedCaseIdSynergy,
  setObservationsSynergy,
  setAnalystIdNumberSynergy,
  setPatientContentSynergy,
  setPossibleFaultsSynergy,
  setConsequenceSynergy,
  setClinicalManagementSynergy,
  setWhomWasNotifiedSynergy,
  setEvaluationDateSynergy,
  setResolutionDateSynergy,
  setStatusSynergy,
  setCreateDateSynergy,
  setUpdateDateSynergy,
  setDeleteDateSynergy,
  setDefaultValuesSynergy,
} = synergySlice.actions;

export default synergySlice.reducer;
