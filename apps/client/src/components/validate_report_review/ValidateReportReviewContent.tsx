"use client";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import {
  Card,
  Col,
  DatePickerProps,
  Divider,
  Form,
  Row,
  Typography,
} from "antd";

import { FaSave } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";

import dayjs from "dayjs";

import Content_button_back_router from "../shared/content_button_back_router/Content_button_back_router";
import CustomButton from "../common/custom_button/CustomButton";
import CustomModalNoContent from "../common/custom_modal_no_content/CustomModalNoContent";
import ReporterDataValidateReportReviewForm from "./reporter_data_validate_report_review_form/ReporterDataValidateReportReviewForm";
import PatientDataValidateReportReviewForm from "./patient_data_validate_report_review_form/PatientDataValidateReportReviewForm";
import OptionsValidateReportReviewButton from "./options_validate_report_review_button/OptionsValidateReportReviewButton";
import AdverseEventDataValidateReportReviewForm from "./adverse_event_data_validate_report_review_form/AdverseEventDataValidateReportReviewForm";
import SelectCaseTypeRadio from "./select_case_type_radio/SelectCaseTypeRadio";
import IndicationsUnsafeCareDataValidateReportReviewForm from "./indications_unsafe_care_data_validate_report_review_form/IndicationsUnsafeCareDataValidateReportReviewForm";
import IncidentDataValidateReportReviewForm from "./incident_data_validate_report_review_form/IncidentDataValidateReportReviewForm";
import RiskDataValidateReportReviewForm from "./risk_data_validate_report_review_form/RiskDataValidateReportReviewForm";
import CharacterizatonDataValidateReportReviewForm from "./characterization_data_validate_report_review_form/CharacterizatonDataValidateReportReviewForm";

import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";
import { setNewCaseValidateId } from "@/redux/features/case_report_validate/selectedCasesSlice";

import { CaseTypeReportEnum } from "@/utils/enums/case_type_color.enum";
import { areDataDifferent } from "./helpers/are_data_diferent";
import { DescriptionOtherEnum } from "@/utils/enums/description_other";
import ContentAssignAnalyst from "./content_assing_analyst/ContentAssignAnalyst";
import ContentMessageSuccessfully from "../shared/content_message_successfully/ContentAssignedAnalystSuccessfully";

import { useGetAllOriginsQuery } from "@/redux/apis/origin/originApi";
import { useGetAllSubOriginsByOriginIdQuery } from "@/redux/apis/sub_origin/subOriginApi";
import { useGetAllServicesQuery } from "@/redux/apis/service/serviceApi";
import { useFindPatientMutation } from "@/redux/apis/patient/patientApi";
import { useGetAllSeverityClasificationsQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";
import { useGetEventTypeByCaseTypeIdQuery } from "@/redux/apis/event_type/eventTypeApi";
import {
  useGetAllCaseTypesQuery,
  useGetCaseTypeByIdQuery,
} from "@/redux/apis/case_type/caseTypeApi";
import {
  useGetAllEventsByEventTypeIdAndUnitIdQuery,
  useGetAllEventsByEventTypeIdQuery,
} from "@/redux/apis/event/eventApi";
import { useGetAllRiskLevelsQuery } from "@/redux/apis/risk_level/riskLevelApi";
import { useGetExternalDeviceQuery } from "@/redux/apis/device/deviceApi";
import { useGetExternalMedicineQuery } from "@/redux/apis/medicine/medicineApi";
import {
  useCancelCaseReportValidateMutation,
  useCreateCaseReportValidateMutation,
} from "@/redux/apis/case_report_validate/caseReportValidateApi";
import {
  setCasetypeIdCaseReportValidate,
  setDefaultValuesCaseReportValidate,
  setSeverityClasifIdCaseReportValidate,
} from "@/redux/features/case_report_validate/caseReportValidateSlice";
import { setListDevicesCaseReport } from "@/redux/features/device_case_report/deviceCaseReportSlice";
import { setListMedicinesCaseReport } from "@/redux/features/medicine_case_report/medicineCaseReportSlice";
import { useGetAllCharacterizationCasesQuery } from "@/redux/apis/characterization_case/charecterizationCaseApi";

import {
  setmodalIsOpen,
  setSuccessFullMessage,
} from "@/redux/features/common/modal/modalSlice";
import ContentConfirmCancelCase from "../shared/content_confirm_cancel_case/ContentConfirmCancelCase";
import { useCreateObservationCancellationCaseMutation } from "@/redux/apis/observation_cancellation_case/observationCancellationCaseApi";
import { useGetAllReasonCancellationCasesQuery } from "@/redux/apis/reason_cancellation_case/reasonCancellationCaseApi";
import CustomSpin from "../common/custom_spin/CustomSpin";

const ValidateReportReviewContent: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form] = Form.useForm();

  const { Title } = Typography;

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const caseReportValidateIdState = useAppSelector(
    (state) => state.caseReportValidate.id
  );

  const caseReportOriginalIdState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_originalcase_id_fk
  );

  const caseTypeIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_casetype_id_fk
  );

  const filingNumberCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_filingnumber
  );

  const dateOfCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_dateofcase
  );

  const creationDateCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_creationdate
  );

  const originIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_origin_id_fk
  );

  const subOriginIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_suborigin_id_fk
  );

  const annonymousReporterCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_anonymoususer
  );

  const identificationReporterCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_documentreporter
  );

  const fullNameReporterCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_fullnamereporter
  );

  const originServiceIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_originservice_id_fk
  );

  const reportingServiceIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_reportingservice_id_fk
  );

  const associatedPatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_associatedpatient
  );

  const identificationTypePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_doctypepatient
  );

  const identificationPatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_documentpatient
  );

  const firstNamePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_firstnamepatient
  );

  const firstLastNamePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_firstlastnamepatient
  );

  const secondNamePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_secondnamepatient
  );

  const secondLastNamePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_secondlastnamepatient
  );

  const agePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_agepatient
  );

  const genderPatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_genderpatient
  );

  const epsPatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_epspatient
  );

  const diagnosticCodePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_diagnosticcodepatient
  );

  const diagnosticDescriptionPatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_diagnosticdescriptionpatient
  );

  const consecutivePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_admconsecutivepatient
  );

  const folioPatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_foliopatient
  );

  const eventTypeIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_eventtype_id_fk
  );

  const eventIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_event_id_fk
  );

  const descriptionOthersCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_descriptionothers
  );

  const isVisitbleDescriptionOthersCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.isVisibleDesriptionOther
  );

  const riskLevelIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_risklevel_id_fk
  );

  const severityClasificationIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_severityclasif_id_fk
  );

  const descriptionCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_description
  );

  const inmediateActionsCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_inmediateaction
  );

  const characterizationIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_characterization_id_fk
  );

  const infoprovidedFamilyCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_infoprovidedfamily
  );

  const clinicalFollowRequiredCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_clinicalfollowrequired
  );

  const observationsCharacterizationCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_observationscharacterization
  );

  const devicesCaseReportState = useAppSelector(
    (state) => state.deviceCaseReport.listDevices
  );

  const medicinesCaseReportState = useAppSelector(
    (state) => state.medicineCaseReport.listMedicines
  );

  const movementReportName = useAppSelector(
    (state) => state.movementReport.mov_r_name
  );

  const isModalOpenState = useAppSelector((state) => state.modal.modalIsOpen);

  const successfullMessageState = useAppSelector(
    (state) => state.modal.successfullMessage
  );

  //REPORTER DATA
  const [isAnonymousReporterLocalState, setIsAnonymousReporterLocalState] =
    useState(false);
  const [identificationUserLocalState, setIdentificationUserLocalState] =
    useState("");
  const [fullNameUserLocalState, setFullNameUserLocalState] = useState("");
  const [originIdLocalState, setOriginIdLocalState] = useState(0);
  const [subOriginIdLocalState, setSubOriginIdLocalState] = useState(0);
  const [dateCaseLocalState, setDateCaseLocalState] = useState("");
  const [reportingServiceIdLocalState, setReportingServiceIdLocalState] =
    useState(0);
  const [originServiceIdLocalState, setOriginServiceIdLocalState] = useState(0);

  //PATIENT DATA
  const [isAssociatedPatientLocalState, setIsAssociatedPatientLocalState] =
    useState(true);
  const [identificationPatientLocalState, setIdentificationPatientLocalState] =
    useState("");
  const [
    identificationTypePatientLocalState,
    setIdentificationTypePatientLocalState,
  ] = useState("");
  const [firstNamePatientLocalState, setFirstNamePatientLocalState] =
    useState("");
  const [secondNamePatientLocalState, setSecondNamePatientLocalState] =
    useState("");
  const [firstLastNamePatientLocalState, setFirstLastNamePatientLocalState] =
    useState("");
  const [secondLastNamePatientLocalState, setSecondLastNamePatientLocalState] =
    useState("");
  const [agePatientLocalState, setAgePatientLocalState] = useState("");
  const [genderPatientLocalState, setGenderPatientLocalState] = useState("");
  const [epsPatientLocalState, setEpsPatientLocalState] = useState("");
  const [diagnosticCodeLocalState, setDiagnosticCodeLocalState] = useState("");
  const [diagnosticDescriptionLocalState, setDiagnosticDescriptionLocalState] =
    useState("");
  const [consecutivePatientLocalState, setConsecutivePatientLocalState] =
    useState(0);
  const [folioPatientLocalState, setFolioPatientLocalState] = useState("");
  const [
    findAdmissionsPatientDataLocalState,
    setFindAdmissionsPatientDataLocalState,
  ] = useState<Admission[]>([]);

  const [
    findAvailableFoliosDataLocalState,
    setFindAvailableFoliosDataLocalState,
  ] = useState<string[]>([]);

  const [isModalAssignAnalyst, setIsModalAssignAnalyst] = useState(false);
  const [isModalConfirmCancelCase, setIsModalConfirmCancelCase] =
    useState(false);

  // CASE DATA
  const [caseTypeIdLocalState, setCaseTypeIdLocalState] = useState(0);
  const [unitIdLocalState, setUnitIdLocalState] = useState(0);
  const [eventTypeIdLocalState, setEventTypeIdLocalState] = useState(0);
  const [eventIdLocalState, setEventIdLocalState] = useState(0);
  const [riskLevelIdLocalState, setRiskLevelIdLocalState] = useState(0);
  const [
    severityClasificationIdLocalState,
    setSeverityClasificationIdLocalState,
  ] = useState(0);

  const [descriptionCaseLocalState, setDescriptionCaseLocalState] =
    useState("");
  const [inmediateActionsLocalState, setInmediateActionsLocalState] =
    useState("");
  const [descriptionOthersLocalState, setDescriptionOthersLocalState] =
    useState("");
  const [showDescriptionOthersLocalState, setShowDescriptionOthersLocalState] =
    useState(false);

  const [searchDeviceLocalState, setSearchDeviceLocalState] = useState("");
  const [selectedDevicesLocalState, setSelectedDevicesLocalState] = useState<
    DeviceExternal[]
  >([]);
  const [isAssociatedDevicesShow, setIsAssociatedDevicesShow] = useState(false);

  const [searchMedicineLocalState, setSearchMedicineLocalState] = useState("");
  const [selectedMedicinesLocalState, setSelectedMedicinesLocalState] =
    useState<MedicineExternal[]>([]);
  const [isAssociatedMedicinesShow, setIsAssociatedMedicinesShow] =
    useState(false);

  //CHARACTERIZATION
  const [characterizationIdLocalState, setCharacterizationIdLocalState] =
    useState(0);
  const [infoprovidedFamilyLocalState, setInfoprovidedFamilyLocalState] =
    useState(false);
  const [
    clinicalFollowRequiredLocalState,
    setClinicalFollowRequiredLocalState,
  ] = useState(false);
  const [
    observationsCharacterizationLocalState,
    setObservationsCharacterizationLocalState,
  ] = useState("");

  const [observationCancellationCase, setObservationCancellationCase] =
    useState("");
  const [reasonCancellationCaseId, setReasonCancellationCaseId] = useState(0);

  const [isSubmittinCancellationCase, setIsSubmittinCancellationCase] =
    useState(false);

  const [getPatient, { isLoading: patientDataLoading }] =
    useFindPatientMutation();

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const {
    data: caseTypeByIdData,
    isFetching: caseTypeByIdDataFetching,
    isLoading: caseTypeByIdDataLoading,
    error: caseTypeByIdDataError,
    refetch: caseTypeByIdDataRefetch,
  } = useGetCaseTypeByIdQuery(caseTypeIdLocalState, {
    skip: !caseTypeIdLocalState,
  });

  const {
    data: allOriginsData,
    isFetching: allOriginsDataFetching,
    isLoading: allOriginsDataLoading,
    error: allOriginsDataError,
    refetch: allOriginsDataRefetch,
  } = useGetAllOriginsQuery(null);

  const {
    data: allSubOriginsByOriginIdData,
    isFetching: allSubOriginsByOriginIdDataFetching,
    isLoading: allSubOriginsByOriginIdDataLoading,
    error: allSubOriginsByOriginIdDataError,
    refetch: allSubOriginsByOriginIdDataRefetch,
  } = useGetAllSubOriginsByOriginIdQuery(originIdLocalState, {
    skip: !originIdLocalState,
  });

  const {
    data: allServicesData,
    isFetching: allServicesDataFetching,
    isLoading: allServicesDataLoading,
    error: allServicesByDataError,
    refetch: allServicesDataRefetch,
  } = useGetAllServicesQuery(null);

  const {
    data: allEventTypeByCaseTypeIdData,
    isFetching: allEventTypeByCaseTypeIdDataFetching,
    isLoading: allEventTypeByCaseTypeIdDataLoading,
    error: allEventTypeByCaseTypeIdDataError,
    refetch: allEventTypeByCaseTypeIdDataRefetch,
  } = useGetEventTypeByCaseTypeIdQuery(caseTypeIdLocalState, {
    skip: !caseTypeIdLocalState,
  });

  const {
    data: allRiskLevelData,
    isFetching: allRiskLevelDataFetching,
    isLoading: allRiskLevelDataLoading,
    error: allRiskLevelDataError,
    refetch: allRiskLevelDataRefetch,
  } = useGetAllRiskLevelsQuery(null);

  const {
    data: allEventsByEventTypeIdData,
    isFetching: allEventsByEventTypeIdDataFetching,
    isLoading: allEventsByEventTypeIdDataLoading,
    error: allEventsByEventTypeIdDataError,
    refetch: allEventsByEventTypeIdDataRefetch,
  } = useGetAllEventsByEventTypeIdQuery(eventTypeIdLocalState, {
    skip: !eventTypeIdLocalState,
  });

  const {
    data: allSeverityClasificationsData,
    isFetching: allSeverityClasificationsDataFetching,
    isLoading: allSeverityClasificationsDataLoading,
    error: allSeverityClasificationsDataError,
    refetch: allSeverityClasificationsDataRefetch,
  } = useGetAllSeverityClasificationsQuery(null);

  const {
    data: allEventsByEventTypeIdAndUnitIdData,
    isFetching: allEventsByEventTypeIdAndUnitIdDataFetching,
    isLoading: allEventsByEventTypeIdAndUnitIdDataLoading,
    error: allEventsByEventTypeIdAndUnitIdDataError,
    refetch: allEventsByEventTypeIdAndUnitIdDataRefetch,
  } = useGetAllEventsByEventTypeIdAndUnitIdQuery(
    { eventTypeId: eventTypeIdLocalState, unitId: unitIdLocalState },
    { skip: !eventTypeIdLocalState }
  );

  const {
    data: allDevicesData,
    isFetching: allDevicesDataFetching,
    isLoading: allDevicesDataLoading,
    error: allDevicesDataError,
    refetch: allDevicesDataRefetch,
  } = useGetExternalDeviceQuery(searchDeviceLocalState, {
    skip: !searchDeviceLocalState,
  });

  const {
    data: allMedicinesData,
    isFetching: allMedicinesDataFetching,
    isLoading: allMedicinesDataLoading,
    error: allMedicinesDataError,
    refetch: allMedicinesDataRefetch,
  } = useGetExternalMedicineQuery(searchMedicineLocalState, {
    skip: !searchMedicineLocalState,
  });

  const {
    data: allCharacterizationCasesData,
    isFetching: allCharacterizationCasesDataFetching,
    isLoading: allCharacterizationCasesDataLoading,
    error: allCharacterizationCasesDataError,
    refetch: allCharacterizationCasesDataRefetch,
  } = useGetAllCharacterizationCasesQuery(null);

  const {
    data: allReasonCancellationData,
    isFetching: allReasonCancellationDataFetching,
    isLoading: allReasonCancellationDataLoading,
    error: allReasonCancellationDataError,
    refetch: allReasonCancellationDataRefetch,
  } = useGetAllReasonCancellationCasesQuery(null);

  const [
    createCaseReportValidate,
    { isLoading: createdCaseReportValidateDataLoading },
  ] = useCreateCaseReportValidateMutation();

  const [
    cancelCaseReportValidate,
    { isLoading: cancelCaseReportValidateDataLoading },
  ] = useCancelCaseReportValidateMutation();

  const [
    createObservationCancellationCase,
    { isLoading: createObservationCancellationCaseLoading },
  ] = useCreateObservationCancellationCaseMutation();

  useEffect(() => {
    setCaseTypeIdLocalState(caseTypeIdCaseReportValidateState);
    setOriginIdLocalState(originIdCaseReportValidateState);
    setSubOriginIdLocalState(subOriginIdCaseReportValidateState);
    setIsAnonymousReporterLocalState(annonymousReporterCaseReportValidateState);
    setIdentificationUserLocalState(
      identificationReporterCaseReportValidateState || ""
    );
    setFullNameUserLocalState(fullNameReporterCaseReportValidateState || "");
    setDateCaseLocalState(dateOfCaseReportValidateState);
    setOriginServiceIdLocalState(originServiceIdCaseReportValidateState);
    setReportingServiceIdLocalState(reportingServiceIdCaseReportValidateState);
    setIsAssociatedPatientLocalState(associatedPatientCaseReportValidateState);
    setIdentificationPatientLocalState(
      identificationPatientCaseReportValidateState || ""
    );
    setIdentificationTypePatientLocalState(
      identificationTypePatientCaseReportValidateState || ""
    );
    setFirstNamePatientLocalState(
      firstNamePatientCaseReportValidateState || ""
    );

    setSecondNamePatientLocalState(
      secondNamePatientCaseReportValidateState || ""
    );
    setFirstLastNamePatientLocalState(
      firstLastNamePatientCaseReportValidateState || ""
    );
    setSecondLastNamePatientLocalState(
      secondLastNamePatientCaseReportValidateState || ""
    );
    setAgePatientLocalState(agePatientCaseReportValidateState || "");
    setGenderPatientLocalState(genderPatientCaseReportValidateState || "");
    setEpsPatientLocalState(epsPatientCaseReportValidateState || "");
    setDiagnosticCodeLocalState(
      diagnosticCodePatientCaseReportValidateState || ""
    );
    setDiagnosticDescriptionLocalState(
      diagnosticDescriptionPatientCaseReportValidateState || ""
    );
    setConsecutivePatientLocalState(
      consecutivePatientCaseReportValidateState || 0
    );
    setFolioPatientLocalState(folioPatientCaseReportValidateState || "");
    setEventTypeIdLocalState(eventTypeIdCaseReportValidateState || 0);
    setEventIdLocalState(eventIdCaseReportValidateState || 0);
    setDescriptionOthersLocalState(
      descriptionOthersCaseReportValidateState || ""
    );
    setShowDescriptionOthersLocalState(
      isVisitbleDescriptionOthersCaseReportValidateState
    );
    setRiskLevelIdLocalState(riskLevelIdCaseReportValidateState || 0);
    setSeverityClasificationIdLocalState(
      severityClasificationIdCaseReportValidateState || 0
    );
    setDescriptionCaseLocalState(descriptionCaseReportValidateState || "");
    setInmediateActionsLocalState(
      inmediateActionsCaseReportValidateState || ""
    );
    setCharacterizationIdLocalState(
      characterizationIdCaseReportValidateState || 0
    );
    setInfoprovidedFamilyLocalState(infoprovidedFamilyCaseReportValidateState);
    setClinicalFollowRequiredLocalState(
      clinicalFollowRequiredCaseReportValidateState
    );
    setObservationsCharacterizationLocalState(
      observationsCharacterizationCaseReportValidateState || ""
    );

    if (
      identificationTypePatientCaseReportValidateState &&
      identificationPatientCaseReportValidateState
    ) {
      onFindPatientData();
    }

    if (medicinesCaseReportState) {
      const initialSelectedMedicines = medicinesCaseReportState.map(
        (med: MedicineCaseReport) => ({
          drugCode: med.med_code,
          drugDescription: med.med_name,
        })
      );
      setSelectedMedicinesLocalState(initialSelectedMedicines);

      if (initialSelectedMedicines.length > 0) {
        setIsAssociatedMedicinesShow(true);
      }
    }

    if (devicesCaseReportState) {
      const initialSelectedDevices = devicesCaseReportState.map(
        (dev: DeviceCaseReport) => ({
          deviceCode: dev.dev_code,
          deviceDescription: dev.dev_name,
        })
      );
      setSelectedDevicesLocalState(initialSelectedDevices);
      if (initialSelectedDevices.length > 0) {
        setIsAssociatedDevicesShow(true);
      }
    }
  }, [
    caseTypeIdCaseReportValidateState,
    originIdCaseReportValidateState,
    subOriginIdCaseReportValidateState,
    annonymousReporterCaseReportValidateState,
    identificationReporterCaseReportValidateState,
    fullNameReporterCaseReportValidateState,
    dateOfCaseReportValidateState,
    originServiceIdCaseReportValidateState,
    reportingServiceIdCaseReportValidateState,
    associatedPatientCaseReportValidateState,
    identificationPatientCaseReportValidateState,
    identificationTypePatientCaseReportValidateState,
    firstNamePatientCaseReportValidateState,
    secondNamePatientCaseReportValidateState,
    firstLastNamePatientCaseReportValidateState,
    secondLastNamePatientCaseReportValidateState,
    agePatientCaseReportValidateState,
    genderPatientCaseReportValidateState,
    epsPatientCaseReportValidateState,
    diagnosticCodePatientCaseReportValidateState,
    diagnosticDescriptionPatientCaseReportValidateState,
    consecutivePatientCaseReportValidateState,
    folioPatientCaseReportValidateState,
    eventTypeIdCaseReportValidateState,
    eventIdCaseReportValidateState,
    descriptionOthersCaseReportValidateState,
    isVisitbleDescriptionOthersCaseReportValidateState,
    riskLevelIdCaseReportValidateState,
    severityClasificationIdCaseReportValidateState,
    descriptionCaseReportValidateState,
    inmediateActionsCaseReportValidateState,
    characterizationIdCaseReportValidateState,
    infoprovidedFamilyCaseReportValidateState,
    clinicalFollowRequiredCaseReportValidateState,
    observationsCharacterizationCaseReportValidateState,
    devicesCaseReportState,
    medicinesCaseReportState,
  ]);

  const hasChanges = () => {
    const initialData = {
      dataCaseTypeId: caseTypeIdCaseReportValidateState,
      dataOriginId: originIdCaseReportValidateState,
      dataSubOriginId: subOriginIdCaseReportValidateState,
      dataOriginServiceId: originServiceIdCaseReportValidateState,
      dataReportingServiceId: reportingServiceIdCaseReportValidateState,
      dataAdmConsecutivePatient: consecutivePatientCaseReportValidateState,
      dataFolioPatient: folioPatientCaseReportValidateState,
      dataEventTypeId: eventTypeIdCaseReportValidateState,
      dataEventId: eventIdCaseReportValidateState,
      dataDescriptionOthers: descriptionOthersCaseReportValidateState,
      dataRiskLevelId: riskLevelIdCaseReportValidateState,
      dataSeverityClasificationId:
        severityClasificationIdCaseReportValidateState,
      dataDescriptionCase: descriptionCaseReportValidateState,
      dataInmediateActions: inmediateActionsCaseReportValidateState,
      dataCharacterizationCaseId: characterizationIdCaseReportValidateState,
      dataInfoprovidedFamily: infoprovidedFamilyCaseReportValidateState,
      dataClinicalFollowRequired: clinicalFollowRequiredCaseReportValidateState,
      dataObservationsCharacterization:
        observationsCharacterizationCaseReportValidateState,
      dataMedicines:
        medicinesCaseReportState?.map((med: MedicineCaseReport) => ({
          drugCode: med.med_code,
          drugDescription: med.med_name,
        })) || [],
      dataDevices:
        devicesCaseReportState?.map((dev: DeviceCaseReport) => ({
          deviceCode: dev.dev_code,
          deviceDescription: dev.dev_name,
        })) || [],
    };

    const currentData = {
      dataCaseTypeId: caseTypeIdLocalState,
      dataOriginId: originIdLocalState,
      dataSubOriginId: subOriginIdLocalState,
      dataOriginServiceId: originServiceIdLocalState,
      dataReportingServiceId: reportingServiceIdLocalState,
      dataAdmConsecutivePatient: consecutivePatientLocalState,
      dataFolioPatient: folioPatientLocalState,
      dataEventTypeId: eventTypeIdLocalState,
      dataEventId: eventIdLocalState,
      dataDescriptionOthers: descriptionOthersLocalState,
      dataRiskLevelId: riskLevelIdLocalState,
      dataSeverityClasificationId: severityClasificationIdLocalState,
      dataDescriptionCase: descriptionCaseLocalState,
      dataInmediateActions: inmediateActionsLocalState,
      dataCharacterizationCaseId: characterizationIdLocalState,
      dataInfoprovidedFamily: infoprovidedFamilyLocalState,
      dataClinicalFollowRequired: clinicalFollowRequiredLocalState,
      dataObservationsCharacterization: observationsCharacterizationLocalState,
      dataMedicines:
        selectedMedicinesLocalState?.map((med) => ({
          drugCode: med.drugCode,
          drugDescription: med.drugDescription,
        })) || [],
      dataDevices:
        selectedDevicesLocalState?.map((dev) => ({
          deviceCode: dev.deviceCode,
          deviceDescription: dev.deviceDescription,
        })) || [],
    };

    return areDataDifferent(initialData, currentData);
  };

  const filteredCaseTypes = allCaseTypesData?.filter((caseType) => {
    if (caseTypeByIdData?.cas_t_name === CaseTypeReportEnum.RISK) {
      return caseType.cas_t_name === CaseTypeReportEnum.RISK;
    } else {
      return caseType.cas_t_name !== CaseTypeReportEnum.RISK;
    }
  });

  const handleSelectDeviceChange = (value: string) => {
    const device = allDevicesData?.data.find(
      (dev: DeviceExternal) => dev.deviceCode === value
    );

    if (
      device &&
      !selectedDevicesLocalState.find((dev) => dev.deviceCode === value)
    ) {
      setSelectedDevicesLocalState([...selectedDevicesLocalState, device]);
    }
  };

  const handleSelectMedicineChange = (value: string) => {
    const medicine = allMedicinesData?.data.find(
      (med: MedicineExternal) => med.drugCode === value
    );
    if (
      medicine &&
      !selectedMedicinesLocalState.find((med) => med.drugCode === value)
    ) {
      setSelectedMedicinesLocalState([
        ...selectedMedicinesLocalState,
        medicine,
      ]);
    }
  };

  const handleChangeService = (value: number) => {
    setReportingServiceIdLocalState(value);

    setEventTypeIdLocalState(0);
    setEventIdLocalState(0);
    setDescriptionOthersLocalState("");
    setShowDescriptionOthersLocalState(false);

    form.setFieldsValue({ "event-id": undefined });
    form.setFieldsValue({ "event-type-id": undefined });
    form.setFieldsValue({ "description-others": undefined });

    if (caseTypeByIdData?.cas_t_name === CaseTypeReportEnum.RISK) {
      const selectedOptionService = allServicesData?.find(
        (item) => item.id === value
      );

      if (selectedOptionService && selectedOptionService.serv_unit_id_fk) {
        setUnitIdLocalState(selectedOptionService.serv_unit_id_fk);
      }
    }
  };

  const handleChangeEvent = async (value: number) => {
    setEventIdLocalState(value);

    setDescriptionOthersLocalState("");
    setIsAssociatedMedicinesShow(false);
    setSelectedMedicinesLocalState([]);
    setSearchMedicineLocalState("");
    setIsAssociatedDevicesShow(false);
    setSelectedDevicesLocalState([]);
    setSearchDeviceLocalState("");

    form.setFieldsValue({
      "description-others": undefined,
      "medicines-name": undefined,
      "devices-name": undefined,
    });

    if (caseTypeByIdData?.cas_t_name === CaseTypeReportEnum.RISK) {
      const selectedOptionEvent = allEventsByEventTypeIdAndUnitIdData?.find(
        (item) => item.id === value
      );

      setShowDescriptionOthersLocalState(
        selectedOptionEvent?.eve_name ===
          DescriptionOtherEnum.DESCRIPTION_EVENT_RISK_OTHER
      );
    } else {
      const selectedOptionEvent = allEventsByEventTypeIdData?.find(
        (item) => item.id === value
      );

      setShowDescriptionOthersLocalState(
        selectedOptionEvent?.eve_name ===
          DescriptionOtherEnum.DESCRIPTION_EVENT_OTHER
      );

      setIsAssociatedMedicinesShow(
        selectedOptionEvent?.eve_medicineassociated!
      );
      setIsAssociatedDevicesShow(selectedOptionEvent?.eve_deviceassociated!);
    }
  };

  const handleChangeConsecutive = (value: number) => {
    setConsecutivePatientLocalState(value);

    setFolioPatientLocalState("");
    form.setFieldsValue({ "folio-patient": undefined });

    const selectedAdmision = findAdmissionsPatientDataLocalState.find(
      (admission: any) => admission.patAdmConsecutive === value
    );

    if (selectedAdmision) {
      setFindAvailableFoliosDataLocalState(selectedAdmision.folios);
    } else {
      setFindAvailableFoliosDataLocalState([]);
    }
  };

  const handleChangeSelectCaseTypeRadio = (value: number) => {
    setCaseTypeIdLocalState(value);
    dispatch(setCasetypeIdCaseReportValidate(value));
    setEventIdLocalState(0);
    setEventTypeIdLocalState(0);
    setSeverityClasificationIdLocalState(0);
    dispatch(setSeverityClasifIdCaseReportValidate(0));

    form.setFieldsValue({
      "event-id": undefined,
      "event-type-id": undefined,
      "severity-clasification-id": undefined,
    });
  };

  const onChangeDateCase: DatePickerProps["onChange"] = (date, dateString) => {
    setDateCaseLocalState(dateString.toString());
    form.setFieldsValue({ "date-case": dateString.toString() });
  };

  const onFindPatientData = async () => {
    try {
      const response: any = await getPatient({
        idNumber: identificationPatientCaseReportValidateState,
        type: identificationTypePatientCaseReportValidateState,
      });

      if (response?.data) {
        setFindAdmissionsPatientDataLocalState(response.data.admissions);
      } else if (response?.error) {
        dispatch(
          setShowMessage({
            type: "error",
            content: response.error.data.message,
          })
        );
      } else {
        dispatch(
          setShowMessage({
            type: "error",
            content: "¡Error en la petición!",
          })
        );
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleClickCLoseModalAssignedAnalystSuccesfull = () => {
    router.push(`/validate_report`);
    dispatch(setmodalIsOpen(false));
    dispatch(setSuccessFullMessage(""));
  };

  const handleCLickCancelCase = async () => {
    try {
      setIsSubmittinCancellationCase(true);
      const cancelResponse: any = await cancelCaseReportValidate({
        id: caseReportValidateIdState,
        idUser: idNumberUserSessionState.toString(),
      });

      let isCancelError = cancelResponse.error;
      let isCancelSuccess = cancelResponse.data;

      if (isCancelError) {
        const errorMessage = isCancelError?.data.message;
        dispatch(
          setShowMessage({
            type: "error",
            content: errorMessage,
          })
        );
        return;
      }

      if (isCancelSuccess) {
        await createObservationCancellationCase({
          idUser: idNumberUserSessionState.toString(),
          idCaseValidate: caseReportValidateIdState,
          newReasonCancellationCase: {
            cac_o_reasoncancellation_id_fk: reasonCancellationCaseId,
            cac_o_observation: observationCancellationCase,
          },
        });

        const successMessage = isCancelSuccess?.message;
        dispatch(
          setShowMessage({
            type: "success",
            content: successMessage,
          })
        );

        router.push(`/validate_report`);
        dispatch(setDefaultValuesCaseReportValidate());
        dispatch(setListDevicesCaseReport([]));
        dispatch(setListMedicinesCaseReport([]));
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
    } finally {
      setIsSubmittinCancellationCase(false);
    }
  };

  const handleClickGeneratePdf = () => {};

  const handleClickSubmit = async () => {
    try {
      const formattedMedicines = selectedMedicinesLocalState.map(
        (medicine) => ({
          med_code: medicine.drugCode,
          med_name: medicine.drugDescription,
        })
      );

      const formattedDevices = selectedDevicesLocalState.map((device) => ({
        dev_code: device.deviceCode,
        dev_name: device.deviceDescription,
      }));

      let newReportValidate: Partial<CaseReportValidate> = {
        val_cr_originalcase_id_fk: caseReportOriginalIdState,
        val_cr_dateofcase: dateCaseLocalState,
        val_cr_casetype_id_fk: caseTypeIdLocalState,
        val_cr_anonymoususer: annonymousReporterCaseReportValidateState,
        val_cr_fullnamereporter: fullNameReporterCaseReportValidateState,
        val_cr_documentreporter: identificationReporterCaseReportValidateState,
        val_cr_origin_id_fk: originIdLocalState,
        val_cr_suborigin_id_fk: subOriginIdLocalState,
        val_cr_originservice_id_fk: originServiceIdLocalState,
        val_cr_reportingservice_id_fk: reportingServiceIdLocalState,
        val_cr_associatedpatient: associatedPatientCaseReportValidateState,
        val_cr_documentpatient: identificationPatientCaseReportValidateState,
        val_cr_doctypepatient: identificationTypePatientCaseReportValidateState,
        val_cr_firstnamepatient: firstNamePatientCaseReportValidateState,
        val_cr_secondnamepatient: secondNamePatientCaseReportValidateState,
        val_cr_firstlastnamepatient:
          firstLastNamePatientCaseReportValidateState,
        val_cr_secondlastnamepatient:
          secondLastNamePatientCaseReportValidateState,
        val_cr_agepatient: agePatientCaseReportValidateState,
        val_cr_genderpatient: genderPatientCaseReportValidateState,
        val_cr_epspatient: epsPatientCaseReportValidateState,
        val_cr_diagnosticcodepatient:
          diagnosticCodePatientCaseReportValidateState,
        val_cr_diagnosticdescriptionpatient:
          diagnosticDescriptionPatientCaseReportValidateState,
        val_cr_admconsecutivepatient: consecutivePatientLocalState || null,
        val_cr_foliopatient: folioPatientLocalState || null,
        val_cr_eventtype_id_fk: eventTypeIdLocalState,
        val_cr_event_id_fk: eventIdLocalState,
        val_cr_descriptionothers: descriptionOthersLocalState
          ? descriptionOthersLocalState
          : null,
        val_cr_severityclasif_id_fk: severityClasificationIdLocalState,
        val_cr_description: descriptionCaseLocalState,
        val_cr_characterization_id_fk: characterizationIdLocalState,
        val_cr_infoprovidedfamily: infoprovidedFamilyLocalState,
        val_cr_clinicalfollowrequired: clinicalFollowRequiredLocalState,
        val_cr_observationscharacterization:
          observationsCharacterizationLocalState,
      };

      if (caseTypeByIdData?.cas_t_name === CaseTypeReportEnum.ADVERSE_EVENT) {
        newReportValidate = {
          ...newReportValidate,
          val_cr_risklevel_id_fk: riskLevelIdLocalState,
          val_cr_severityclasif_id_fk: severityClasificationIdLocalState,
          val_cr_inmediateaction: inmediateActionsLocalState || null,
          medicines: isAssociatedMedicinesShow ? formattedMedicines : [],
          devices: isAssociatedDevicesShow ? formattedDevices : [],
        };
      } else if (caseTypeByIdData?.cas_t_name === CaseTypeReportEnum.INCIDENT) {
        newReportValidate = {
          ...newReportValidate,
          val_cr_risklevel_id_fk: riskLevelIdLocalState,
          val_cr_severityclasif_id_fk:
            severityClasificationIdLocalState || null,
          val_cr_inmediateaction: inmediateActionsLocalState || null,
          medicines: isAssociatedMedicinesShow ? formattedMedicines : [],
          devices: isAssociatedDevicesShow ? formattedDevices : [],
        };
      } else if (
        caseTypeByIdData?.cas_t_name ===
        CaseTypeReportEnum.INDICATING_UNSAFE_CARE
      ) {
        newReportValidate = {
          ...newReportValidate,
          val_cr_risklevel_id_fk: riskLevelIdLocalState,
          val_cr_severityclasif_id_fk: severityClasificationIdLocalState,
          val_cr_inmediateaction: inmediateActionsLocalState || null,
          devices: formattedDevices,
        };
      }

      const response: any = await createCaseReportValidate({
        idValidator: idNumberUserSessionState.toString(),
        reportId: caseReportValidateIdState,
        newReportValidate,
      });

      let dataError = response.error;
      let validationData = response.data?.message;
      let responseData = response.data;

      if (dataError || !responseData) {
        const errorMessage = dataError?.data.message;
        const validationDataMessage = validationData;

        if (Array.isArray(errorMessage)) {
          dispatch(
            setShowMessage({
              type: "error",
              content: errorMessage[0],
            })
          );
        } else if (typeof errorMessage === "string") {
          dispatch(
            setShowMessage({
              type: "error",
              content: errorMessage,
            })
          );
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(
            setShowMessage({
              type: "error",
              content: validationDataMessage[0],
            })
          );
        } else if (typeof validationDataMessage === "string") {
          dispatch(
            setShowMessage({
              type: "error",
              content: validationDataMessage,
            })
          );
        }
      }

      if (responseData && !dataError) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        // dispatch(setDefaultValuesCaseReportValidate());
        // dispatch(setListDevicesCaseReport([]));
        // dispatch(setListMedicinesCaseReport([]));
        // router.push(`/validate_report`);
        dispatch(setNewCaseValidateId(response.data.response.data.id));
        setIsModalAssignAnalyst(true);
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
    }
  };

  return (
    <div className="validate-report-review" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      <div className="options-validate-report-review-button">
        <OptionsValidateReportReviewButton
          handleCLickCancelCase={() => setIsModalConfirmCancelCase(true)}
          handleClickAssignAnalyst={() => setIsModalAssignAnalyst(true)}
          handleClickGeneratePdf={handleClickGeneratePdf}
        />
      </div>

      {caseTypeByIdDataLoading ||
      allOriginsDataLoading ||
      allSubOriginsByOriginIdDataLoading ||
      allEventTypeByCaseTypeIdDataLoading ||
      allRiskLevelDataLoading ||
      allEventsByEventTypeIdDataLoading ||
      allSeverityClasificationsDataLoading ||
      allEventsByEventTypeIdAndUnitIdDataLoading ||
      allCharacterizationCasesDataLoading ? (
        <div style={{ marginTop: "20px" }}>
          <CustomSpin />
        </div>
      ) : (
        <>
          <div>
            <Card
              size="small"
              style={{
                width: "100%",
                border: "1px solid #477bb6",
                marginTop: "10px",
                background: "#D5E5FF",
              }}
            >
              <div>
                <Row
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "-5px",
                  }}
                >
                  <Col>
                    <Title
                      level={5}
                      style={{
                        color: "#002140",
                      }}
                    >
                      Codigo del caso: #{filingNumberCaseReportValidateState}
                    </Title>
                  </Col>
                  <Col>
                    <Title
                      level={5}
                      style={{
                        color: "#002140",
                      }}
                    >
                      Fecha ocurrencia: {dateOfCaseReportValidateState}
                    </Title>
                  </Col>
                  <Col>
                    <Title
                      level={5}
                      style={{
                        color: "#002140",
                      }}
                    >
                      Fecha Reporte:{" "}
                      {dayjs(creationDateCaseReportValidateState).format(
                        "YYYY-MM-DD"
                      )}
                    </Title>
                  </Col>
                </Row>
              </div>
            </Card>
          </div>

          <div>
            <Card
              size="small"
              style={{
                width: "100%",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "16px",
                marginTop: "10px",
              }}
            >
              <Form
                form={form}
                id="validate-report-review-form"
                name="validate-report-review-form"
                className="validate-report-review-form"
                layout="vertical"
                initialValues={{
                  "origin-id": originIdCaseReportValidateState || undefined,
                  "sub-origin-id":
                    subOriginIdCaseReportValidateState || undefined,
                  "identification-user":
                    identificationReporterCaseReportValidateState || undefined,
                  "full-name-user":
                    fullNameReporterCaseReportValidateState || undefined,
                  "date-case": dateOfCaseReportValidateState
                    ? dayjs(dateOfCaseReportValidateState, "YYYY-MM-DD")
                    : undefined,
                  "origin-service-id":
                    originServiceIdCaseReportValidateState || undefined,
                  "reporting-service-id":
                    reportingServiceIdCaseReportValidateState || undefined,
                  "identification-type-patient":
                    identificationTypePatientCaseReportValidateState ||
                    undefined,
                  "identification-patient":
                    identificationPatientCaseReportValidateState || undefined,
                  "first-name-patient":
                    firstNamePatientCaseReportValidateState || undefined,
                  "second-name-patient":
                    secondNamePatientCaseReportValidateState || undefined,
                  "first-last-name-patient":
                    firstLastNamePatientCaseReportValidateState || undefined,
                  "second-last-name-patient":
                    secondLastNamePatientCaseReportValidateState || undefined,
                  "age-patient": agePatientCaseReportValidateState || undefined,
                  "gender-patient":
                    genderPatientCaseReportValidateState || undefined,
                  "eps-patient": epsPatientCaseReportValidateState || undefined,
                  "diagnostic-code-patient":
                    diagnosticCodePatientCaseReportValidateState || undefined,
                  "diagnostic-description-patient":
                    diagnosticDescriptionPatientCaseReportValidateState ||
                    undefined,
                  "consecutive-patient":
                    consecutivePatientCaseReportValidateState || undefined,
                  "folio-patient":
                    folioPatientCaseReportValidateState || undefined,
                  "case-type-id":
                    caseTypeIdCaseReportValidateState || undefined,
                  "event-type-id":
                    eventTypeIdCaseReportValidateState || undefined,
                  "event-id": eventIdCaseReportValidateState || undefined,
                  "description-others":
                    descriptionOthersCaseReportValidateState || undefined,
                  "risk-level-id":
                    riskLevelIdCaseReportValidateState || undefined,
                  "severity-clasification-id":
                    severityClasificationIdCaseReportValidateState || undefined,
                  "description-case":
                    descriptionCaseReportValidateState || undefined,
                  "inmediate-actions":
                    inmediateActionsCaseReportValidateState || undefined,
                  "characterization-case-id":
                    characterizationIdCaseReportValidateState || undefined,
                  "infoprovided-family":
                    infoprovidedFamilyCaseReportValidateState,
                  "clinical-follow-required":
                    clinicalFollowRequiredCaseReportValidateState,
                  "observations-characterization":
                    observationsCharacterizationCaseReportValidateState ||
                    undefined,
                }}
                autoComplete="off"
                onFinish={handleClickSubmit}
              >
                <div className="component-form">
                  <div className="reporter-data-validate-report-review-form">
                    <ReporterDataValidateReportReviewForm
                      form={form}
                      originIdLocalState={originIdLocalState}
                      setOriginIdLocalState={setOriginIdLocalState}
                      subOriginIdLocalState={subOriginIdLocalState}
                      setSubOriginIdLocalState={setSubOriginIdLocalState}
                      originServiceIdLocalState={originServiceIdLocalState}
                      setOriginServiceIdLocalState={
                        setOriginServiceIdLocalState
                      }
                      isAnonymousReporterLocalState={
                        isAnonymousReporterLocalState
                      }
                      setIsAnonymousReporterLocalState={
                        setIsAnonymousReporterLocalState
                      }
                      reportingServiceIdLocalState={
                        reportingServiceIdLocalState
                      }
                      setReportingServiceIdLocalState={
                        setReportingServiceIdLocalState
                      }
                      identificationUserLocalState={
                        identificationUserLocalState
                      }
                      setIdentificationUserLocalState={
                        setIdentificationUserLocalState
                      }
                      fullNameUserLocalState={fullNameUserLocalState}
                      setFullNameUserLocalState={setFullNameUserLocalState}
                      allOriginsData={allOriginsData}
                      allSubOriginsByOriginIdData={allSubOriginsByOriginIdData}
                      allServicesData={allServicesData}
                      allOriginsDataLoading={allOriginsDataLoading}
                      allOriginsDataFetching={allOriginsDataFetching}
                      allSubOriginsByOriginIdDataLoading={
                        allSubOriginsByOriginIdDataFetching
                      }
                      allSubOriginsByOriginIdDataFetching={
                        allSubOriginsByOriginIdDataFetching
                      }
                      allServicesDataLoading={allServicesDataLoading}
                      allServicesDataFetching={allServicesDataFetching}
                      dateCaseLocalState={dateCaseLocalState}
                      onChangeDateCase={onChangeDateCase}
                      handleChangeService={handleChangeService}
                    />
                  </div>

                  <div className="patient-data-validate-report-review-form">
                    <PatientDataValidateReportReviewForm
                      form={form}
                      isAssociatedPatientLocalState={
                        isAssociatedPatientLocalState
                      }
                      patientDataLoading={patientDataLoading}
                      identificationPatientLocalState={
                        identificationPatientLocalState
                      }
                      setIdentificationPatientLocalState={
                        setIdentificationPatientLocalState
                      }
                      identificationTypePatientLocalState={
                        identificationTypePatientLocalState
                      }
                      setIdentificationTypePatientLocalState={
                        setIdentificationTypePatientLocalState
                      }
                      firstNamePatientLocalState={firstNamePatientLocalState}
                      setFirstNamePatientLocalState={
                        setFirstNamePatientLocalState
                      }
                      secondNamePatientLocalState={secondNamePatientLocalState}
                      setSecondNamePatientLocalState={
                        setSecondNamePatientLocalState
                      }
                      firstLastNamePatientLocalState={
                        firstLastNamePatientLocalState
                      }
                      setFirstLastNamePatientLocalState={
                        setFirstLastNamePatientLocalState
                      }
                      secondLastNamePatientLocalState={
                        secondLastNamePatientLocalState
                      }
                      setSecondLastNamePatientLocalState={
                        setSecondLastNamePatientLocalState
                      }
                      agePatientLocalState={agePatientLocalState}
                      setAgePatientLocalState={setAgePatientLocalState}
                      genderPatientLocalState={genderPatientLocalState}
                      setGenderPatientLocalState={setGenderPatientLocalState}
                      epsPatientLocalState={epsPatientLocalState}
                      setEpsPatientLocalState={setEpsPatientLocalState}
                      diagnosticCodeLocalState={diagnosticCodeLocalState}
                      setDiagnosticCodeLocalState={setDiagnosticCodeLocalState}
                      diagnosticDescriptionLocalState={
                        diagnosticDescriptionLocalState
                      }
                      setDiagnosticDescriptionLocalState={
                        setDiagnosticDescriptionLocalState
                      }
                      consecutivePatientLocalState={
                        consecutivePatientLocalState
                      }
                      folioPatientLocalState={folioPatientLocalState}
                      setFolioPatientLocalState={setFolioPatientLocalState}
                      handleChangeConsecutive={handleChangeConsecutive}
                      findAdmissionsPatientDataLocalState={
                        findAdmissionsPatientDataLocalState
                      }
                      findAvailableFolioPatientDataLocalState={
                        findAvailableFoliosDataLocalState
                      }
                    />
                  </div>

                  <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />

                  <div className="select-case-type-radio">
                    <SelectCaseTypeRadio
                      allCaseTypesDataLoading={allCaseTypesDataLoading}
                      caseTypeIdLocalState={caseTypeIdLocalState}
                      handleChangeSelectCaseTypeRadio={
                        handleChangeSelectCaseTypeRadio
                      }
                      filteredCaseTypes={filteredCaseTypes}
                    />
                  </div>

                  <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />

                  <div className="adverse-event-data-validate-report-review-form">
                    {caseTypeByIdData?.cas_t_name ===
                      CaseTypeReportEnum.ADVERSE_EVENT && (
                      <AdverseEventDataValidateReportReviewForm
                        form={form}
                        eventIdLocalState={eventIdLocalState}
                        setEventIdLocalState={setEventIdLocalState}
                        eventTypeIdLocalState={eventTypeIdLocalState}
                        setEventTypeIdLocalState={setEventTypeIdLocalState}
                        descriptionOthersLocalState={
                          descriptionOthersLocalState
                        }
                        setDescriptionOthersLocalState={
                          setDescriptionOthersLocalState
                        }
                        showDescriptionOthersLocalState={
                          showDescriptionOthersLocalState
                        }
                        setShowDescriptionOthersLocalState={
                          setShowDescriptionOthersLocalState
                        }
                        allEventTypeByCaseTypeIdDataLoading={
                          allEventTypeByCaseTypeIdDataLoading
                        }
                        allEventTypeByCaseTypeIdDataFetching={
                          allEventTypeByCaseTypeIdDataFetching
                        }
                        allEventTypeByCaseTypeIdData={
                          allEventTypeByCaseTypeIdData
                        }
                        allEventsByEventTypeIdData={allEventsByEventTypeIdData}
                        allEventsByEventTypeIdDataFetching={
                          allEventsByEventTypeIdDataFetching
                        }
                        allEventsByEventTypeIdDataLoading={
                          allEventsByEventTypeIdDataLoading
                        }
                        riskLevelIdLocalState={riskLevelIdLocalState}
                        setRiskLevelIdLocalState={setRiskLevelIdLocalState}
                        allRiskLevelData={allRiskLevelData}
                        allRiskLevelDataLoading={allRiskLevelDataLoading}
                        severityClasificationIdLocalState={
                          severityClasificationIdLocalState
                        }
                        setSeverityClasificationIdLocalState={
                          setSeverityClasificationIdLocalState
                        }
                        allSeverityClasificationsData={
                          allSeverityClasificationsData
                        }
                        allSeverityClasificationsDataLoading={
                          allSeverityClasificationsDataLoading
                        }
                        descriptionCaseLocalState={descriptionCaseLocalState}
                        setDescriptionCaseLocalState={
                          setDescriptionCaseLocalState
                        }
                        inmediateActionsLocalState={inmediateActionsLocalState}
                        setInmediateActionsLocalState={
                          setInmediateActionsLocalState
                        }
                        allMedicinesData={allMedicinesData}
                        allMedicinesDataFetching={allMedicinesDataFetching}
                        allMedicinesDataLoading={allMedicinesDataLoading}
                        isAssociatedMedicinesShow={isAssociatedMedicinesShow}
                        handleSelectMedicineChange={handleSelectMedicineChange}
                        selectedMedicinesLocalState={
                          selectedMedicinesLocalState
                        }
                        setSelectedMedicinesLocalState={
                          setSelectedMedicinesLocalState
                        }
                        setSearchMedicineLocalState={
                          setSearchMedicineLocalState
                        }
                        allDevicesData={allDevicesData}
                        allDevicesDataFetching={allDevicesDataFetching}
                        allDevicesDataLoading={allDevicesDataLoading}
                        isAssociatedDevicesShow={isAssociatedDevicesShow}
                        handleSelectDeviceChange={handleSelectDeviceChange}
                        selectedDevicesLocalState={selectedDevicesLocalState}
                        setSelectedDevicesLocalState={
                          setSelectedDevicesLocalState
                        }
                        setSearchDeviceLocalState={setSearchDeviceLocalState}
                        handleChangeEvent={handleChangeEvent}
                      />
                    )}
                  </div>

                  <div className="indications-unsafe-care-data-validate-report-review-form">
                    {caseTypeByIdData?.cas_t_name ===
                      CaseTypeReportEnum.INDICATING_UNSAFE_CARE && (
                      <IndicationsUnsafeCareDataValidateReportReviewForm
                        form={form}
                        eventIdLocalState={eventIdLocalState}
                        setEventIdLocalState={setEventIdLocalState}
                        eventTypeIdLocalState={eventTypeIdLocalState}
                        setEventTypeIdLocalState={setEventTypeIdLocalState}
                        descriptionOthersLocalState={
                          descriptionOthersLocalState
                        }
                        setDescriptionOthersLocalState={
                          setDescriptionOthersLocalState
                        }
                        showDescriptionOthersLocalState={
                          showDescriptionOthersLocalState
                        }
                        setShowDescriptionOthersLocalState={
                          setShowDescriptionOthersLocalState
                        }
                        allEventTypeByCaseTypeIdDataLoading={
                          allEventTypeByCaseTypeIdDataLoading
                        }
                        allEventTypeByCaseTypeIdDataFetching={
                          allEventTypeByCaseTypeIdDataFetching
                        }
                        allEventTypeByCaseTypeIdData={
                          allEventTypeByCaseTypeIdData
                        }
                        allEventsByEventTypeIdData={allEventsByEventTypeIdData}
                        allEventsByEventTypeIdDataFetching={
                          allEventsByEventTypeIdDataFetching
                        }
                        allEventsByEventTypeIdDataLoading={
                          allEventsByEventTypeIdDataLoading
                        }
                        riskLevelIdLocalState={riskLevelIdLocalState}
                        setRiskLevelIdLocalState={setRiskLevelIdLocalState}
                        allRiskLevelData={allRiskLevelData}
                        allRiskLevelDataLoading={allRiskLevelDataLoading}
                        severityClasificationIdLocalState={
                          severityClasificationIdLocalState
                        }
                        setSeverityClasificationIdLocalState={
                          setSeverityClasificationIdLocalState
                        }
                        allSeverityClasificationsData={
                          allSeverityClasificationsData
                        }
                        allSeverityClasificationsDataLoading={
                          allSeverityClasificationsDataLoading
                        }
                        descriptionCaseLocalState={descriptionCaseLocalState}
                        setDescriptionCaseLocalState={
                          setDescriptionCaseLocalState
                        }
                        inmediateActionsLocalState={inmediateActionsLocalState}
                        setInmediateActionsLocalState={
                          setInmediateActionsLocalState
                        }
                        allDevicesData={allDevicesData}
                        allDevicesDataFetching={allDevicesDataFetching}
                        allDevicesDataLoading={allDevicesDataLoading}
                        handleSelectDeviceChange={handleSelectDeviceChange}
                        selectedDevicesLocalState={selectedDevicesLocalState}
                        setSelectedDevicesLocalState={
                          setSelectedDevicesLocalState
                        }
                        setSearchDeviceLocalState={setSearchDeviceLocalState}
                        handleChangeEvent={handleChangeEvent}
                      />
                    )}
                  </div>

                  <div className="incident-data-validate-report-review-form">
                    {caseTypeByIdData?.cas_t_name ===
                      CaseTypeReportEnum.INCIDENT && (
                      <IncidentDataValidateReportReviewForm
                        form={form}
                        eventIdLocalState={eventIdLocalState}
                        setEventIdLocalState={setEventIdLocalState}
                        eventTypeIdLocalState={eventTypeIdLocalState}
                        setEventTypeIdLocalState={setEventTypeIdLocalState}
                        descriptionOthersLocalState={
                          descriptionOthersLocalState
                        }
                        setDescriptionOthersLocalState={
                          setDescriptionOthersLocalState
                        }
                        showDescriptionOthersLocalState={
                          showDescriptionOthersLocalState
                        }
                        setShowDescriptionOthersLocalState={
                          setShowDescriptionOthersLocalState
                        }
                        allEventTypeByCaseTypeIdDataLoading={
                          allEventTypeByCaseTypeIdDataLoading
                        }
                        allEventTypeByCaseTypeIdDataFetching={
                          allEventTypeByCaseTypeIdDataFetching
                        }
                        allEventTypeByCaseTypeIdData={
                          allEventTypeByCaseTypeIdData
                        }
                        allEventsByEventTypeIdData={allEventsByEventTypeIdData}
                        allEventsByEventTypeIdDataFetching={
                          allEventsByEventTypeIdDataFetching
                        }
                        allEventsByEventTypeIdDataLoading={
                          allEventsByEventTypeIdDataLoading
                        }
                        riskLevelIdLocalState={riskLevelIdLocalState}
                        setRiskLevelIdLocalState={setRiskLevelIdLocalState}
                        allRiskLevelData={allRiskLevelData}
                        allRiskLevelDataLoading={allRiskLevelDataLoading}
                        severityClasificationIdLocalState={
                          severityClasificationIdLocalState
                        }
                        setSeverityClasificationIdLocalState={
                          setSeverityClasificationIdLocalState
                        }
                        allSeverityClasificationsData={
                          allSeverityClasificationsData
                        }
                        allSeverityClasificationsDataLoading={
                          allSeverityClasificationsDataLoading
                        }
                        descriptionCaseLocalState={descriptionCaseLocalState}
                        setDescriptionCaseLocalState={
                          setDescriptionCaseLocalState
                        }
                        inmediateActionsLocalState={inmediateActionsLocalState}
                        setInmediateActionsLocalState={
                          setInmediateActionsLocalState
                        }
                        allMedicinesData={allMedicinesData}
                        allMedicinesDataFetching={allMedicinesDataFetching}
                        allMedicinesDataLoading={allMedicinesDataLoading}
                        isAssociatedMedicinesShow={isAssociatedMedicinesShow}
                        handleSelectMedicineChange={handleSelectMedicineChange}
                        selectedMedicinesLocalState={
                          selectedMedicinesLocalState
                        }
                        setSelectedMedicinesLocalState={
                          setSelectedMedicinesLocalState
                        }
                        setSearchMedicineLocalState={
                          setSearchMedicineLocalState
                        }
                        allDevicesData={allDevicesData}
                        allDevicesDataFetching={allDevicesDataFetching}
                        allDevicesDataLoading={allDevicesDataLoading}
                        isAssociatedDevicesShow={isAssociatedDevicesShow}
                        handleSelectDeviceChange={handleSelectDeviceChange}
                        selectedDevicesLocalState={selectedDevicesLocalState}
                        setSelectedDevicesLocalState={
                          setSelectedDevicesLocalState
                        }
                        setSearchDeviceLocalState={setSearchDeviceLocalState}
                        handleChangeEvent={handleChangeEvent}
                      />
                    )}
                  </div>

                  <div className="risk-data-validate-report-review-form">
                    {caseTypeByIdData?.cas_t_name ===
                      CaseTypeReportEnum.RISK && (
                      <RiskDataValidateReportReviewForm
                        form={form}
                        reportingServiceIdLocalState={
                          reportingServiceIdLocalState
                        }
                        eventIdLocalState={eventIdLocalState}
                        setEventIdLocalState={setEventIdLocalState}
                        eventTypeIdLocalState={eventTypeIdLocalState}
                        setEventTypeIdLocalState={setEventTypeIdLocalState}
                        descriptionCaseLocalState={descriptionCaseLocalState}
                        setDescriptionCaseLocalState={
                          setDescriptionCaseLocalState
                        }
                        descriptionOthersLocalState={
                          descriptionOthersLocalState
                        }
                        setDescriptionOthersLocalState={
                          setDescriptionOthersLocalState
                        }
                        showDescriptionOthersLocalState={
                          showDescriptionOthersLocalState
                        }
                        setShowDescriptionOthersLocalState={
                          setShowDescriptionOthersLocalState
                        }
                        allEventTypeByCaseTypeIdData={
                          allEventTypeByCaseTypeIdData
                        }
                        allEventTypeByCaseTypeIdDataFetching={
                          allEventTypeByCaseTypeIdDataFetching
                        }
                        allEventTypeByCaseTypeIdDataLoading={
                          allEventTypeByCaseTypeIdDataLoading
                        }
                        allEventsByEventTypeIdAndUnitIdData={
                          allEventsByEventTypeIdAndUnitIdData
                        }
                        allEventsByEventTypeIdAndUnitIdDataFetching={
                          allEventsByEventTypeIdAndUnitIdDataFetching
                        }
                        allEventsByEventTypeIdAndUnitIdDataLoading={
                          allEventsByEventTypeIdAndUnitIdDataLoading
                        }
                        handleChangeEvent={handleChangeEvent}
                      />
                    )}
                  </div>
                </div>

                <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />

                <div className="characterizaton-data-validate-report-review-form">
                  <CharacterizatonDataValidateReportReviewForm
                    form={form}
                    characterizationIdLocalState={characterizationIdLocalState}
                    setCharacterizationIdLocalState={
                      setCharacterizationIdLocalState
                    }
                    infoprovidedFamilyLocalState={infoprovidedFamilyLocalState}
                    setInfoprovidedFamilyLocalState={
                      setInfoprovidedFamilyLocalState
                    }
                    clinicalFollowRequiredLocalState={
                      clinicalFollowRequiredLocalState
                    }
                    setClinicalFollowRequiredLocalState={
                      setClinicalFollowRequiredLocalState
                    }
                    observationsCharacterizationLocalState={
                      observationsCharacterizationLocalState
                    }
                    setObservationsCharacterizationLocalState={
                      setObservationsCharacterizationLocalState
                    }
                    allCharacterizationCasesData={allCharacterizationCasesData}
                    allCharacterizationCasesDataFetching={
                      allCharacterizationCasesDataFetching
                    }
                    allCharacterizationCasesDataLoading={
                      allCharacterizationCasesDataLoading
                    }
                  />
                </div>

                <Row
                  gutter={[16, 16]}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <Col>
                    <Form.Item
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginBottom: 0,
                      }}
                    >
                      <CustomButton
                        classNameCustomButton="validate-report-button"
                        idCustomButton="validate-report-button"
                        titleCustomButton="Validar reporte"
                        typeCustomButton="primary"
                        htmlTypeCustomButton="submit"
                        iconCustomButton={
                          !createdCaseReportValidateDataLoading ? (
                            <FaSave />
                          ) : (
                            <LoadingOutlined />
                          )
                        }
                        onClickCustomButton={() => ({})}
                        styleCustomButton={{
                          background:
                            hasChanges() &&
                            !createdCaseReportValidateDataLoading
                              ? "#002140"
                              : "#6C757D",
                          color: "#fff",
                          fontSize: "12px",
                          borderRadius: "16px",
                        }}
                        iconPositionCustomButton={"end"}
                        sizeCustomButton={"small"}
                        disabledCustomButton={
                          hasChanges() && !createdCaseReportValidateDataLoading
                            ? false
                            : true
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
        </>
      )}
      <CustomModalNoContent
        key={"custom-modal-assign-analyst"}
        widthCustomModalNoContent="50%"
        openCustomModalState={isModalAssignAnalyst}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => {
          dispatch(setDefaultValuesCaseReportValidate());
          dispatch(setListDevicesCaseReport([]));
          dispatch(setListMedicinesCaseReport([]));
          setIsModalAssignAnalyst(false);
          router.push(`/validate_report`);
        }}
        contentCustomModal={
          <ContentAssignAnalyst
            onCloseModal={() => {
              setIsModalAssignAnalyst(false);
            }}
          />
        }
      />
      <CustomModalNoContent
        key={"custom-modal-assigned-analyst-successfully"}
        widthCustomModalNoContent="35%"
        openCustomModalState={isModalOpenState}
        closableCustomModal={false}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => {
          dispatch(setmodalIsOpen(false));
          dispatch(setSuccessFullMessage(""));
          router.push(`/validate_report`);
        }}
        contentCustomModal={
          <ContentMessageSuccessfully
            messageData={successfullMessageState}
            handleClickCLoseModal={
              handleClickCLoseModalAssignedAnalystSuccesfull
            }
          />
        }
      />
      <CustomModalNoContent
        key={"custom-modal-confirm-cancel-case"}
        widthCustomModalNoContent="25%"
        openCustomModalState={isModalConfirmCancelCase}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalConfirmCancelCase(false)}
        contentCustomModal={
          <ContentConfirmCancelCase
            observationCancellationCase={observationCancellationCase}
            setObservationCancellationCase={setObservationCancellationCase}
            reasonCancellationCaseId={reasonCancellationCaseId}
            setReasonCancellationCaseId={setReasonCancellationCaseId}
            allReasonCancellationData={allReasonCancellationData}
            onCloseModal={() => setIsModalConfirmCancelCase(false)}
            handleCLickCancelCase={handleCLickCancelCase}
            isSubmittinCancellationCase={isSubmittinCancellationCase}
            allReasonCancellationDataFetching={
              allReasonCancellationDataFetching
            }
            allReasonCancellationDataLoading={allReasonCancellationDataLoading}
          />
        }
      />
    </div>
  );
};

export default ValidateReportReviewContent;
