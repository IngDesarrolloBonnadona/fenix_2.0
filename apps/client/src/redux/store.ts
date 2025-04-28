import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage/storage";

import caseReportOriginalReducer from "./features/case_report_original/caseReportOriginalSlice";
import caseReportValidateReducer from "./features/case_report_validate/caseReportValidateSlice";
import caseTypeReducer from "./features/case_type/caseTypeSlice";
import characterizationCaseReducer from "./features/characterization_case/characterizationCaseSlice";
import clinicalResearchReducer from "./features/clinical_research/clinicalResearchSlice";
import damageTypeReducer from "./features/damage_type/damageTypeSlice";
import deviceTypeReducer from "./features/device_type/deviceTypeSlice";
import deviceCaseReportReducer from "./features/device_case_report/deviceCaseReportSlice";
import eventReducer from "./features/event/eventSlice";
import eventTypeReducer from "./features/event_type/eventTypeSlice";
import failedMeasureReducer from "./features/failed_measure/failedMeasureSlice";
import fluidTypeReducer from "./features/fluid_type/fluidTypeSlice";
import InfluencingFactorReducer from "./features/influencing_factor/influencingFactorSlice";
import logReducer from "./features/Log/logSlice";
import medicineCaseReportReducer from "./features/medicine_case_report/medicineCaseReportSlice";
import movementReportReducer from "./features/movement_report/movementReportSlice";
import originReducer from "./features/origin/originSlice";
import observationReturnCaseReducer from "./features/observation_return_case/observationReturnCaseSlice";
import patientReducer from "./features/patient/patientSlice";
import priorityReducer from "./features/priority/prioritySlice";
import protocolReducer from "./features/protocol/protocolSlice";
import reasonReturnCaseReducer from "./features/reason_return_case/reasonReturnCaseSlice";
import reportAnalistAssignmentReducer from "./features/report_analyst_assignment/reportAnalystAssignmentSlice";
import reportResearcherAssignmentReducer from "./features/report_researcher_assignment/reportResearcherAssignmentSlice";
import researchInstrumentReducer from "./features/research_instrument/researchInstrumentSlice";
import riskCauseReducer from "./features/risk_cause/riskCauseSlice";
import riskFactorReducer from "./features/risk_factor/riskFactorSlice";
import riskLevelReducer from "./features/risk_level/riskLevelSlice";
import riskTypeReducer from "./features/risk_type/riskTypeSlice";
import roleSReducer from "./features/role/roleSlice";
import roleResponseTimeReducer from "./features/role-response-time/roleResponseTimeSlice";
import safetyBarrierReducer from "./features/safety_barrier/safetyBarrierSlice";
import serviceReducer from "./features/service/serviceSlice";
import severityClasificationReducer from "./features/severity_clasification/severityClasificationSlice";
import subOriginReducer from "./features/sub-origin/subOriginSlice";
import unitReducer from "./features/unit/unitSlice";
import unsafeActionReducer from "./features/unsafe_action/unsafeActionSlice";
import compressionConceptReportReducer from "./features/compression-concept-reports/compressionConceptReportSlice";
import changeOfCaseTypeReducer from "./features/global/changeOfCaseTypeSlice";
import oncologyCategoryReducer from "./features/oncology_category/oncologyCategorySlice";
import messageStateReducer from "./features/common/message/messageStateSlice";
import modalReducer from "./features/common/modal/modalSlice";
import userSessionReducer from "./features/user_session/userSessionSlice";
import synergyReducer from "./features/synergy/synergySlice";
import observationCancellationCaseReducer from "./features/observation_cancellation_case/observationCancellationCaseSlice";
import reasonCancellationCaseReducer from "./features/reason_cancellation_case/reasonCancellationCaseSlice";
import selectedCasesReducer from "./features/case_report_validate/selectedCasesSlice";
import vascularAccessResearchInstrumentReducer from "./features/vascular_access_research_instrument/vascularAccessResearchInstrumentSlice";

import { unitApi } from "./apis/unit/unitApi";
import { caseTypeApi } from "./apis/case_type/caseTypeApi";
import { riskTypeApi } from "./apis/risk_type/riskTypeApi";
import { severityClasificationApi } from "./apis/severity_clasification/severityClasificationApi";
import { originApi } from "./apis/origin/originApi";
import { riskLevelApi } from "./apis/risk_level/riskLevelApi";
import { characterizationCaseApi } from "./apis/characterization_case/charecterizationCaseApi";
import { roleApi } from "./apis/role/roleApi";
import { researchInstrumentApi } from "./apis/research_instrument/researchInstrumentApi";
import { deviceTypeApi } from "./apis/device_type/deviceTypeApi";
import { damageTypeApi } from "./apis/damage_type/damageTypeApi";
import { fluidTypeApi } from "./apis/fluid_type/fluidTypeApi";
import { influencingFactorApi } from "./apis/influencing_factor/influencingFactorApi";
import { failedMeasureApi } from "./apis/failed_measure/failedMeasureApi";
import { safetyBarrierApi } from "./apis/safety_barrier/safetyBarrierApi";
import { riskFactorApi } from "./apis/risk_factor/riskFactorApi";
import { protocolApi } from "./apis/protocol/protocolApi";
import { unsafeActionApi } from "./apis/unsafe_action/unsafeActionApi";
import { movementReportApi } from "./apis/movement_report/movementReportApi";
import { serviceApi } from "./apis/service/serviceApi";
import { subOriginApi } from "./apis/sub_origin/subOriginApi";
import { priorityApi } from "./apis/priority/priorityApi";
import { reasonReturnCaseApi } from "./apis/reason_return_case/reasonReturnCaseApi";
import { eventTypeApi } from "./apis/event_type/eventTypeApi";
import { eventApi } from "./apis/event/eventApi";
import { compressionConceptReportApi } from "./apis/compression_concept_report/compressionConceptReportApi";
import { oncologyCategoryApi } from "./apis/oncology_category/oncologyCategoryApi";
import { caseReportValidateApi } from "./apis/case_report_validate/caseReportValidateApi";
import { caseReportOriginalApi } from "./apis/case_report_original/caseReportOriginalApi";
import { patientApi } from "./apis/patient/patientApi";
import { medicineApi } from "./apis/medicine/medicineApi";
import { deviceApi } from "./apis/device/deviceApi";
import { documentTypeApi } from "./apis/document-type/documentTypeApi";
import { reportAnalystAssignmentApi } from "./apis/report_analyst_assignment/reportAnalystAssignmentApi";
import { reportResearcherAssignmentApi } from "./apis/report_researcher_assignment/reportResearcherAssignmentApi";
import { verifyActiveUserApi } from "./apis/users_b_hub/verifyActiveUserApi";
import { synergyApi } from "./apis/synergy/synergyApi";
import { observationCancellationCaseApi } from "./apis/observation_cancellation_case/observationCancellationCaseApi";
import { reasonCancellationCaseApi } from "./apis/reason_cancellation_case/reasonCancellationCaseApi";
import { observationReturnCaseApi } from "./apis/observation_return_case/observationReturnCaseApi";
import { researchCategoryApi } from "./apis/research_category/researchCategoryApi";
import { clinicalResearchApi } from "./apis/clinical_research/clinicalResearchApi";
import { riskCauseApi } from "./apis/risk_cause/riskCauseApi";
import { riskMitigationMeasureApi } from "./apis/risk_mitigation_measure/riskMitigationMeasure";
import { riskConsequenceApi } from "./apis/risk_consequence/riskConsequence";
import { probabilityOcurrenceApi } from "./apis/probability_ocurrence/probabilityOcurrenceApi";
import { impactApi } from "./apis/impact/impactApi";
import { quarterYearApi } from "./apis/quarter_year/quarterYearApi";
import { scoreComplianceControlApi } from "./apis/score_compliance_control/scoreComplianceControlApi";
import { controlEvaluationApi } from "./apis/control_evaluation/controlEvaluationApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "changeOfCaseType",
    "messageState",
    "caseReportValidate",
    "adverseEventOriginal",
    "deviceCaseReport",
    "medicineCaseReport",
    "modal",
    "movementReport",
    "userSession",
    "selectedCases",
    "clinicalResearch",
    "researchInstrument",
    "vascularAccessResearchInstrument",
    "event",
    "unit",
    "riskCause",
  ],
  blacklist: [],
};

const rootReducer = combineReducers({
  caseReportValidate: caseReportValidateReducer,
  caseReportOriginal: caseReportOriginalReducer,
  caseType: caseTypeReducer,
  characterizationCase: characterizationCaseReducer,
  clinicalResearch: clinicalResearchReducer,
  damageType: damageTypeReducer,
  deviceType: deviceTypeReducer,
  deviceCaseReport: deviceCaseReportReducer,
  event: eventReducer,
  eventType: eventTypeReducer,
  failedMeasure: failedMeasureReducer,
  fluidType: fluidTypeReducer,
  InfluencingFactor: InfluencingFactorReducer,
  log: logReducer,
  medicineCaseReport: medicineCaseReportReducer,
  movementReport: movementReportReducer,
  origin: originReducer,
  priority: priorityReducer,
  protocol: protocolReducer,
  reportAnalistAssignment: reportAnalistAssignmentReducer,
  reportResearchAssignment: reportResearcherAssignmentReducer,
  researchInstrument: researchInstrumentReducer,
  riskFactor: riskFactorReducer,
  riskCause: riskCauseReducer,
  riskLevel: riskLevelReducer,
  riskType: riskTypeReducer,
  role: roleSReducer,
  roleReponsteTyme: roleResponseTimeReducer,
  safetyBarrier: safetyBarrierReducer,
  service: serviceReducer,
  severityClasification: severityClasificationReducer,
  subOrigin: subOriginReducer,
  unit: unitReducer,
  unsafeAction: unsafeActionReducer,
  compressionConceptReport: compressionConceptReportReducer,
  changeOfCaseType: changeOfCaseTypeReducer,
  oncologyCategory: oncologyCategoryReducer,
  messageState: messageStateReducer,
  patient: patientReducer,
  modal: modalReducer,
  userSession: userSessionReducer,
  synergy: synergyReducer,
  observationReturnCase: observationReturnCaseReducer,
  reasonReturnCase: reasonReturnCaseReducer,
  observationCancellationCase: observationCancellationCaseReducer,
  reasonCancellationCase: reasonCancellationCaseReducer,
  selectedCases: selectedCasesReducer,
  vascularAccessResearchInstrument: vascularAccessResearchInstrumentReducer,

  [unitApi.reducerPath]: unitApi.reducer,
  [caseTypeApi.reducerPath]: caseTypeApi.reducer,
  [riskTypeApi.reducerPath]: riskTypeApi.reducer,
  [severityClasificationApi.reducerPath]: severityClasificationApi.reducer,
  [originApi.reducerPath]: originApi.reducer,
  [riskLevelApi.reducerPath]: riskLevelApi.reducer,
  [characterizationCaseApi.reducerPath]: characterizationCaseApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [researchInstrumentApi.reducerPath]: researchInstrumentApi.reducer,
  [researchCategoryApi.reducerPath]: researchCategoryApi.reducer,
  [deviceTypeApi.reducerPath]: deviceTypeApi.reducer,
  [damageTypeApi.reducerPath]: damageTypeApi.reducer,
  [fluidTypeApi.reducerPath]: fluidTypeApi.reducer,
  [influencingFactorApi.reducerPath]: influencingFactorApi.reducer,
  [failedMeasureApi.reducerPath]: failedMeasureApi.reducer,
  [safetyBarrierApi.reducerPath]: safetyBarrierApi.reducer,
  [riskFactorApi.reducerPath]: riskFactorApi.reducer,
  [protocolApi.reducerPath]: protocolApi.reducer,
  [unsafeActionApi.reducerPath]: unsafeActionApi.reducer,
  [movementReportApi.reducerPath]: movementReportApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [subOriginApi.reducerPath]: subOriginApi.reducer,
  [priorityApi.reducerPath]: priorityApi.reducer,
  [eventTypeApi.reducerPath]: eventTypeApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [compressionConceptReportApi.reducerPath]:
    compressionConceptReportApi.reducer,
  [oncologyCategoryApi.reducerPath]: oncologyCategoryApi.reducer,
  [caseReportValidateApi.reducerPath]: caseReportValidateApi.reducer,
  [caseReportOriginalApi.reducerPath]: caseReportOriginalApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,
  [medicineApi.reducerPath]: medicineApi.reducer,
  [deviceApi.reducerPath]: deviceApi.reducer,
  [documentTypeApi.reducerPath]: documentTypeApi.reducer,
  [reportAnalystAssignmentApi.reducerPath]: reportAnalystAssignmentApi.reducer,
  [reportResearcherAssignmentApi.reducerPath]:
    reportResearcherAssignmentApi.reducer,
  [verifyActiveUserApi.reducerPath]: verifyActiveUserApi.reducer,
  [synergyApi.reducerPath]: synergyApi.reducer,
  [observationReturnCaseApi.reducerPath]: observationReturnCaseApi.reducer,
  [reasonReturnCaseApi.reducerPath]: reasonReturnCaseApi.reducer,
  [observationCancellationCaseApi.reducerPath]:
    observationCancellationCaseApi.reducer,
  [reasonCancellationCaseApi.reducerPath]: reasonCancellationCaseApi.reducer,
  [clinicalResearchApi.reducerPath]: clinicalResearchApi.reducer,
  [riskCauseApi.reducerPath]: riskCauseApi.reducer,
  [riskMitigationMeasureApi.reducerPath]: riskMitigationMeasureApi.reducer,
  [riskConsequenceApi.reducerPath]: riskConsequenceApi.reducer,
  [probabilityOcurrenceApi.reducerPath]: probabilityOcurrenceApi.reducer,
  [impactApi.reducerPath]: impactApi.reducer,
  [quarterYearApi.reducerPath]: quarterYearApi.reducer,
  [scoreComplianceControlApi.reducerPath]: scoreComplianceControlApi.reducer,
  [controlEvaluationApi.reducerPath]: controlEvaluationApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      inmutableCheck: false,
    }).concat([
      unitApi.middleware,
      caseTypeApi.middleware,
      riskTypeApi.middleware,
      severityClasificationApi.middleware,
      originApi.middleware,
      riskLevelApi.middleware,
      characterizationCaseApi.middleware,
      roleApi.middleware,
      researchInstrumentApi.middleware,
      researchCategoryApi.middleware,
      deviceTypeApi.middleware,
      damageTypeApi.middleware,
      fluidTypeApi.middleware,
      influencingFactorApi.middleware,
      failedMeasureApi.middleware,
      safetyBarrierApi.middleware,
      riskFactorApi.middleware,
      protocolApi.middleware,
      unsafeActionApi.middleware,
      movementReportApi.middleware,
      serviceApi.middleware,
      subOriginApi.middleware,
      priorityApi.middleware,
      eventTypeApi.middleware,
      eventApi.middleware,
      compressionConceptReportApi.middleware,
      oncologyCategoryApi.middleware,
      caseReportValidateApi.middleware,
      caseReportOriginalApi.middleware,
      patientApi.middleware,
      medicineApi.middleware,
      deviceApi.middleware,
      documentTypeApi.middleware,
      reportAnalystAssignmentApi.middleware,
      reportResearcherAssignmentApi.middleware,
      verifyActiveUserApi.middleware,
      synergyApi.middleware,
      observationReturnCaseApi.middleware,
      reasonReturnCaseApi.middleware,
      observationCancellationCaseApi.middleware,
      reasonCancellationCaseApi.middleware,
      clinicalResearchApi.middleware,
      riskCauseApi.middleware,
      riskMitigationMeasureApi.middleware,
      riskConsequenceApi.middleware,
      probabilityOcurrenceApi.middleware,
      impactApi.middleware,
      quarterYearApi.middleware,
      scoreComplianceControlApi.middleware,
      controlEvaluationApi.middleware,
    ]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
