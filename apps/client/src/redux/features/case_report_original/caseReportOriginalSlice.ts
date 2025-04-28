import { createSlice } from "@reduxjs/toolkit";

const initialState: CaseReportOriginal = {
  id: "",
  ori_cr_dateofcase: "",
  ori_cr_creationdate: "",
  ori_cr_casetype_id_fk: 0,
  ori_cr_filingnumber: "",
  ori_cr_documentpatient: "",
  ori_cr_doctypepatient: "",
  ori_cr_firstnamepatient: "",
  ori_cr_secondnamepatient: "",
  ori_cr_firstlastnamepatient: "",
  ori_cr_secondlastnamepatient: "",
  ori_cr_agepatient: "",
  ori_cr_genderpatient: "",
  ori_cr_epspatient: "",
  ori_cr_admconsecutivepatient: 0,
  ori_cr_foliopatient: "",
  ori_cr_diagnosticcodepatient: "",
  ori_cr_diagnosticdescriptionpatient: "",
  ori_cr_fullnamereporter: "",
  ori_cr_documentreporter: "",
  ori_cr_eventtype_id_fk: 0,
  ori_cr_anonymoususer: false,
  ori_cr_originservice_id_fk: 0,
  ori_cr_reportingservice_id_fk: 0,
  ori_cr_event_id_fk: 0,
  ori_cr_descriptionothers: null,
  ori_cr_risktype_id_fk: 0,
  ori_cr_severityclasif_id_fk: 0,
  ori_cr_origin_id_fk: 0,
  ori_cr_suborigin_id_fk: 0,
  ori_cr_risklevel_id_fk: 0,
  ori_cr_priority_id_fk: 0,
  ori_cr_statusmovement_id_fk: 0,
  ori_cr_characterization_id_fk: 0,
  ori_cr_infoprovidedfamily: false,
  ori_cr_clinicalfollowrequired: false,
  ori_cr_observationscharacterization: "",
  ori_cr_description: "",
  ori_cr_inmediateaction: "",
  ori_cr_materializedrisk: false,
  ori_cr_associatedpatient: true,
  ori_cr_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const caseReportOriginalSlice = createSlice({
  name: "caseReportOriginal",
  initialState,
  reducers: {
    setIdCaseReportOriginal: (state, action) => {
      state.id = action.payload;
    },
    setAnonynousUserCaseReportOriginal: (state, action) => {
      state.ori_cr_anonymoususer = action.payload;
    },
    setDateOfCaseReportOriginal: (state, action) => {
      state.ori_cr_dateofcase = action.payload;
    },
    setCreationDateReportOriginal: (state, action) => {
      state.ori_cr_creationdate = action.payload;
    },
    setCaseTypeIdCaseReportOriginal: (state, action) => {
      state.ori_cr_casetype_id_fk = action.payload;
    },
    setFilingNumberCaseReportOriginal: (state, action) => {
      state.ori_cr_filingnumber = action.payload;
    },
    setDocumentPatientCaseReportOriginal: (state, action) => {
      state.ori_cr_documentpatient = action.payload;
    },
    setDoctypePatientCaseReportOriginal: (state, action) => {
      state.ori_cr_doctypepatient = action.payload;
    },
    setFirstNamePatientCaseReportOriginal: (state, action) => {
      state.ori_cr_firstnamepatient = action.payload;
    },
    setSecondNamePatientCaseReportOriginal: (state, action) => {
      state.ori_cr_secondnamepatient = action.payload;
    },
    setFirstLastNamePatientCaseReportOriginal: (state, action) => {
      state.ori_cr_firstlastnamepatient = action.payload;
    },
    setSecondLastNamePatientCaseReportOriginal: (state, action) => {
      state.ori_cr_secondlastnamepatient = action.payload;
    },
    setAgePatientCaseReportOriginal: (state, action) => {
      state.ori_cr_agepatient = action.payload;
    },
    setGenderPatienCaseReportOriginalt: (state, action) => {
      state.ori_cr_genderpatient = action.payload;
    },
    setEpsPatientCaseReportOriginal: (state, action) => {
      state.ori_cr_epspatient = action.payload;
    },
    setAdmConsecutivePatientCaseReportOriginal: (state, action) => {
      state.ori_cr_admconsecutivepatient = action.payload;
    },
    setFolioPatientCaseReportOriginal: (state, action) => {
      state.ori_cr_foliopatient = action.payload;
    },
    setDiagnosticCodeCaseReportOriginal: (state, action) => {
      state.ori_cr_diagnosticcodepatient = action.payload;
    },
    setDiagnosticDescriptionCaseReportOriginal: (state, action) => {
      state.ori_cr_diagnosticdescriptionpatient = action.payload;
    },
    setReporterFullNameCaseReportOriginal: (state, action) => {
      state.ori_cr_fullnamereporter = action.payload;
    },
    setReporterDocumentCaseReportOriginal: (state, action) => {
      state.ori_cr_documentreporter = action.payload;
    },
    setEventTypeIdCaseReportOriginal: (state, action) => {
      state.ori_cr_eventtype_id_fk = action.payload;
    },
    setOriginServiceIdCaseReportOriginal: (state, action) => {
      state.ori_cr_originservice_id_fk = action.payload;
    },
    setReportingServiceIdCaseReportOriginal: (state, action) => {
      state.ori_cr_reportingservice_id_fk = action.payload;
    },
    setEventIdCaseReportOriginal: (state, action) => {
      state.ori_cr_event_id_fk = action.payload;
    },
    setRiskTypeIdCaseReportOriginal: (state, action) => {
      state.ori_cr_risktype_id_fk = action.payload;
    },
    setSeverityClasifIdCaseReportOriginal: (state, action) => {
      state.ori_cr_severityclasif_id_fk = action.payload;
    },
    setOriginIdCaseReportOriginal: (state, action) => {
      state.ori_cr_origin_id_fk = action.payload;
    },
    setSubOriginIdCaseReportOriginal: (state, action) => {
      state.ori_cr_suborigin_id_fk = action.payload;
    },
    setRiskLevelIdCaseReportOriginal: (state, action) => {
      state.ori_cr_risklevel_id_fk = action.payload;
    },
    setPriorityIdCaseReportOriginal: (state, action) => {
      state.ori_cr_priority_id_fk = action.payload;
    },
    setStatusMovementIdCaseReportOriginal: (state, action) => {
      state.ori_cr_statusmovement_id_fk = action.payload;
    },
    setCharacterizationIdCaseReportOriginal: (state, action) => {
      state.ori_cr_characterization_id_fk = action.payload;
    },
    setInfoprovidedFamilyCaseReportOriginal: (state, action) => {
      state.ori_cr_infoprovidedfamily = action.payload;
    },
    setClinicalFollowRequiredCaseReportOriginal: (state, action) => {
      state.ori_cr_clinicalfollowrequired = action.payload;
    },
    setObservationsCharacterizationCaseReportOriginal: (state, action) => {
      state.ori_cr_observationscharacterization = action.payload;
    },
    setDescriptionCaseReportOriginal: (state, action) => {
      state.ori_cr_description = action.payload;
    },
    setInmediateActionCaseReportOriginal: (state, action) => {
      state.ori_cr_inmediateaction = action.payload;
    },
    setMaterializedRiskCaseReportOriginal: (state, action) => {
      state.ori_cr_materializedrisk = action.payload;
    },
    setAssociatedPatientCaseReportOriginal: (state, action) => {
      state.ori_cr_associatedpatient = action.payload;
    },
    setStatusCaseReportOriginal: (state, action) => {
      state.ori_cr_status = action.payload;
    },
    setCreateDateCaseReportOriginal: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateCaseReportOriginal: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateCaseReportOriginal: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesCaseReportOriginal: (state) => {
      state.id = "";
      state.ori_cr_dateofcase = "";
      state.ori_cr_creationdate = "";
      state.ori_cr_anonymoususer = false;
      state.ori_cr_casetype_id_fk = 0;
      state.ori_cr_filingnumber = "";
      state.ori_cr_documentpatient = "";
      state.ori_cr_doctypepatient = "";
      state.ori_cr_firstnamepatient = "";
      state.ori_cr_secondnamepatient = "";
      state.ori_cr_firstlastnamepatient = "";
      state.ori_cr_secondlastnamepatient = "";
      state.ori_cr_agepatient = "";
      state.ori_cr_genderpatient = "";
      state.ori_cr_epspatient = "";
      state.ori_cr_admconsecutivepatient = 0;
      state.ori_cr_diagnosticcodepatient = "";
      state.ori_cr_diagnosticdescriptionpatient = "";
      state.ori_cr_foliopatient = "";
      state.ori_cr_fullnamereporter = "";
      state.ori_cr_documentreporter = "";
      state.ori_cr_eventtype_id_fk = 0;
      state.ori_cr_originservice_id_fk = 0;
      state.ori_cr_reportingservice_id_fk = 0;
      state.ori_cr_event_id_fk = 0;
      state.ori_cr_risktype_id_fk = 0;
      state.ori_cr_severityclasif_id_fk = 0;
      state.ori_cr_origin_id_fk = 0;
      state.ori_cr_suborigin_id_fk = 0;
      state.ori_cr_risklevel_id_fk = 0;
      state.ori_cr_priority_id_fk = 0;
      state.ori_cr_statusmovement_id_fk = 0;
      state.ori_cr_characterization_id_fk = 0;
      state.ori_cr_infoprovidedfamily = false;
      state.ori_cr_clinicalfollowrequired = false;
      state.ori_cr_observationscharacterization = "";
      state.ori_cr_description = "";
      state.ori_cr_inmediateaction = "";
      state.ori_cr_materializedrisk = false;
      state.ori_cr_associatedpatient = true;
      state.ori_cr_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdCaseReportOriginal,
  setAnonynousUserCaseReportOriginal,
  setDateOfCaseReportOriginal,
  setCreationDateReportOriginal,
  setFolioPatientCaseReportOriginal,
  setCaseTypeIdCaseReportOriginal,
  setFilingNumberCaseReportOriginal,
  setDocumentPatientCaseReportOriginal,
  setDoctypePatientCaseReportOriginal,
  setFirstNamePatientCaseReportOriginal,
  setSecondNamePatientCaseReportOriginal,
  setFirstLastNamePatientCaseReportOriginal,
  setSecondLastNamePatientCaseReportOriginal,
  setAgePatientCaseReportOriginal,
  setGenderPatienCaseReportOriginalt,
  setEpsPatientCaseReportOriginal,
  setAdmConsecutivePatientCaseReportOriginal,
  setDiagnosticCodeCaseReportOriginal,
  setDiagnosticDescriptionCaseReportOriginal,
  // setReporterIdCaseReportOriginal,
  setReporterFullNameCaseReportOriginal,
  setReporterDocumentCaseReportOriginal,
  setEventTypeIdCaseReportOriginal,
  setOriginServiceIdCaseReportOriginal,
  setReportingServiceIdCaseReportOriginal,
  setEventIdCaseReportOriginal,
  setRiskTypeIdCaseReportOriginal,
  setSeverityClasifIdCaseReportOriginal,
  setOriginIdCaseReportOriginal,
  setSubOriginIdCaseReportOriginal,
  setRiskLevelIdCaseReportOriginal,
  setPriorityIdCaseReportOriginal,
  setStatusMovementIdCaseReportOriginal,
  setCharacterizationIdCaseReportOriginal,
  setInfoprovidedFamilyCaseReportOriginal,
  setClinicalFollowRequiredCaseReportOriginal,
  setObservationsCharacterizationCaseReportOriginal,
  setDescriptionCaseReportOriginal,
  setInmediateActionCaseReportOriginal,
  setMaterializedRiskCaseReportOriginal,
  setAssociatedPatientCaseReportOriginal,
  setStatusCaseReportOriginal,
  setCreateDateCaseReportOriginal,
  setUpdateDateCaseReportOriginal,
  setDeleteDateCaseReportOriginal,
  setDefaultValuesCaseReportOriginal,
} = caseReportOriginalSlice.actions;

export default caseReportOriginalSlice.reducer;
