import { createSlice } from "@reduxjs/toolkit";

const initialState: VascularAccessResearchInstrument = {
  id: "",
  inst_clinical_research_id: "",
  inst_has_failure: false,
  inst_damage: false,
  inst_clinical_context: "",
  inst_other_device_type: "",
  inst_other_damage_type: "",
  inst_fluid_name: "",
  inst_is_phlebitis_fluid: false,
  inst_fluid_ph: 0,
  inst_adequate_infusion_time: false,
  inst_infusion_time: "",
  inst_adequate_dilution: false,
  inst_fluid_dilution: "",
  inst_other_influencing_factors: "",
  inst_other_failed_measures: "",
  inst_other_risk_factors: "",
  inst_venipuncture_technique: "",
  inst_additional_findings: "",
  inst_has_care_failures: false,
  inst_has_incorrect_actions: false,
  inst_has_unsafe_actions: false,
  inst_conclusions: "",
  inst_is_case_preventable: false,
  inst_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const vascularAccessResearchInstrumentSlice = createSlice({
  name: "vascularAccessResearchInstrument",
  initialState,
  reducers: {
    setIdVascularAccessInstrument: (state, action) => {
      state.id = action.payload;
    },
    setClinicalResearchIdVascularAccessInstrument: (state, action) => {
      state.inst_clinical_research_id = action.payload;
    },
    setDamageFailureVascularAccessInstrument: (state, action) => {
      state.inst_has_failure = action.payload;
    },
    setClinicalContextVascularAccessInstrument: (state, action) => {
      state.inst_has_failure = action.payload;
    },
    setOtherDeviceTypeVascularAccessInstrument: (state, action) => {
      state.inst_other_device_type = action.payload;
    },
    setOtherDamageTypeVascularAccessInstrument: (state, action) => {
      state.inst_other_damage_type = action.payload;
    },
    setFluidNameVascularAccessInstrument: (state, action) => {
      state.inst_fluid_name = action.payload;
    },
    setIsPhlebitisFluidVascularAccessInstrument: (state, action) => {
      state.inst_is_phlebitis_fluid = action.payload;
    },
    setFluidPhVascularAccessInstrument: (state, action) => {
      state.inst_fluid_ph = action.payload;
    },
    setAdequateInfusionTimeVascularAccessInstrument: (state, action) => {
      state.inst_adequate_infusion_time = action.payload;
    },
    setInfusionTimeVascularAccessInstrument: (state, action) => {
      state.inst_infusion_time = action.payload;
    },
    setAdequateDilutionVascularAccessInstrument: (state, action) => {
      state.inst_adequate_dilution = action.payload;
    },
    setFluidDilutionVascularAccessInstrument: (state, action) => {
      state.inst_fluid_dilution = action.payload;
    },
    setOtherInfluencingFactorsVascularAccessInstrument: (state, action) => {
      state.inst_other_influencing_factors = action.payload;
    },
    setOtherFailedMeasuresVascularAccessInstrument: (state, action) => {
      state.inst_other_failed_measures = action.payload;
    },
    setOtherRiskFactorVascularAccessInstrument: (state, action) => {
      state.inst_other_risk_factors = action.payload;
    },
    setVenipunctureTechniqueVascularAccessInstrument: (state, action) => {
      state.inst_venipuncture_technique = action.payload;
    },
    setAdditionalFindingsVascularAccessInstrument: (state, action) => {
      state.inst_additional_findings = action.payload;
    },
    setHasCareFailuresVascularAccessInstrument: (state, action) => {
      state.inst_has_care_failures = action.payload;
    },
    setHasIncorrectActionVascularAccessInstrument: (state, action) => {
      state.inst_has_incorrect_actions = action.payload;
    },
    setHasUnsafeActionVascularAccessInstrument: (state, action) => {
      state.inst_has_unsafe_actions = action.payload;
    },
    setConclusionsVascularAccessInstrument: (state, action) => {
      state.inst_conclusions = action.payload;
    },
    setIsCasePreventableVascularAccessInstrument: (state, action) => {
      state.inst_is_case_preventable = action.payload;
    },
    setStatusVascularAccessInstrument: (state, action) => {
      state.inst_status = action.payload;
    },
    setCreateDateVascularAccessInstrument: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateVascularAccessInstrument: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateVascularAccessInstrument: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesVascularAccessInstrument: (state) => {
      state.id = "";
      state.inst_clinical_research_id = "";
      state.inst_has_failure = false;
      state.inst_damage = false;
      state.inst_clinical_context = "";
      state.inst_other_device_type = "";
      state.inst_other_damage_type = "";
      state.inst_fluid_name = "";
      state.inst_is_phlebitis_fluid = false;
      state.inst_fluid_ph = 0;
      state.inst_adequate_infusion_time = false;
      state.inst_infusion_time = "";
      state.inst_adequate_dilution = false;
      state.inst_fluid_dilution = "";
      state.inst_other_influencing_factors = "";
      state.inst_other_failed_measures = "";
      state.inst_other_risk_factors = "";
      state.inst_venipuncture_technique = "";
      state.inst_additional_findings = "";
      state.inst_has_care_failures = false;
      state.inst_has_incorrect_actions = false;
      state.inst_has_unsafe_actions = false;
      state.inst_conclusions = "";
      state.inst_is_case_preventable = false;
      state.inst_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdVascularAccessInstrument,
  setClinicalResearchIdVascularAccessInstrument,
  setDamageFailureVascularAccessInstrument,
  setClinicalContextVascularAccessInstrument,
  setOtherDamageTypeVascularAccessInstrument,
  setOtherDeviceTypeVascularAccessInstrument,
  setFluidNameVascularAccessInstrument,
  setIsPhlebitisFluidVascularAccessInstrument,
  setAdequateInfusionTimeVascularAccessInstrument,
  setFluidPhVascularAccessInstrument,
  setInfusionTimeVascularAccessInstrument,
  setAdequateDilutionVascularAccessInstrument,
  setFluidDilutionVascularAccessInstrument,
  setOtherFailedMeasuresVascularAccessInstrument,
  setOtherInfluencingFactorsVascularAccessInstrument,
  setOtherRiskFactorVascularAccessInstrument,
  setAdditionalFindingsVascularAccessInstrument,
  setHasCareFailuresVascularAccessInstrument,
  setHasIncorrectActionVascularAccessInstrument,
  setHasUnsafeActionVascularAccessInstrument,
  setVenipunctureTechniqueVascularAccessInstrument,
  setConclusionsVascularAccessInstrument,
  setCreateDateVascularAccessInstrument,
  setDefaultValuesVascularAccessInstrument,
  setDeleteDateVascularAccessInstrument,
  setIsCasePreventableVascularAccessInstrument,
  setStatusVascularAccessInstrument,
  setUpdateDateVascularAccessInstrument,
} = vascularAccessResearchInstrumentSlice.actions;

export default vascularAccessResearchInstrumentSlice.reducer;
