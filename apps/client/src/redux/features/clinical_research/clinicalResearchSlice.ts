import { createSlice } from "@reduxjs/toolkit";

const initialState: ClinicalResearch = {
  id: "",
  res_c_isComplete: false,
  res_c_research_instrument_id: 0,
  rec_c_user_researcher_id: "",
  res_c_research_instrument_name: "",
  res_c_vascular_instrument_id: "",
  res_c_medication_fluid_instrument_id: "",
  res_c_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const clinicalResearchSlice = createSlice({
  name: "clinicalResearch",
  initialState,
  reducers: {
    setIdClinicalResearch: (state, action) => {
      state.id = action.payload;
    },
    setIsCompleteClinicalResearch: (state, action) => {
      state.res_c_isComplete = action.payload;
    },
    setInstrumentIdClinicalResearch: (state, action) => {
      state.res_c_research_instrument_id = action.payload;
    },
    setUserResearcherClinicalResearch: (state, action) => {
      state.rec_c_user_researcher_id = action.payload;
    },
    setResearchNameClinicalResearch: (state, action) => {
      state.res_c_research_instrument_name = action.payload;
    },
    setVascularInstrumentIdClinicalResearch: (state, action) => {
      state.res_c_vascular_instrument_id = action.payload;
    },
    setMedicationFluidInstrumentIdClinicalResearch: (state, action) => {
      state.res_c_medication_fluid_instrument_id = action.payload;
    },
    setStatusClinicalResearch: (state, action) => {
      state.res_c_status = action.payload;
    },
    setCreateDateClinicalResearch: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateClinicalResearch: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateClinicalResearch: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesClinicalResearch: (state) => {
      state.id = "";
      state.res_c_isComplete = true;
      state.res_c_research_instrument_id = 0;
      state.rec_c_user_researcher_id = "";
      state.res_c_research_instrument_name = "";
      state.res_c_vascular_instrument_id = "";
      state.res_c_medication_fluid_instrument_id = "";
      state.res_c_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdClinicalResearch,
  setIsCompleteClinicalResearch,
  setInstrumentIdClinicalResearch,
  setMedicationFluidInstrumentIdClinicalResearch,
  setResearchNameClinicalResearch,
  setUserResearcherClinicalResearch,
  setVascularInstrumentIdClinicalResearch,
  setStatusClinicalResearch,
  setCreateDateClinicalResearch,
  setUpdateDateClinicalResearch,
  setDeleteDateClinicalResearch,
  setDefaultValuesClinicalResearch,
} = clinicalResearchSlice.actions;

export default clinicalResearchSlice.reducer;
