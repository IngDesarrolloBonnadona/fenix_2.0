"use client";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { useRouter } from "next/navigation";

import CustomTableFiltersAndSorting from "../common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllEventsQuery } from "@/redux/apis/event/eventApi";
import { useGetAllPrioritiesQuery } from "@/redux/apis/priority/priorityApi";
import { useGetAllMovementReportsQuery } from "@/redux/apis/movement_report/movementReportApi";
import {
  useGetAllValidateCasesQuery,
  useGetReportValidateByIdQuery,
} from "@/redux/apis/case_report_validate/caseReportValidateApi";
import { useGetReportOriginalByIdQuery } from "@/redux/apis/case_report_original/caseReportOriginalApi";

import TableColumnsValidateReport from "./table_columns_validate_report/TableColumsValidateReport";

import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { getNameOfEventMap } from "@/helpers/get_name_by_id/get_name_of_event";
import { getNameOfPriorityMap } from "@/helpers/get_name_by_id/get_name_of_priority";
import { getNameOfMovementReportMap } from "@/helpers/get_name_by_id/get_name_of_movement_report";

import { titleStyleCss } from "@/theme/text_styles";

import {
  setAdmConsecutivePatientCaseReportValidate,
  setAgePatientCaseReportValidate,
  setAnonynousUserCaseReportValidate,
  setAssociatedPatientCaseReportValidate,
  setCasetypeIdCaseReportValidate,
  setCharacterizationIdCaseReportValidate,
  setClinicalFollowRequiredCaseReportValidate,
  setCreateDateCaseReportValidate,
  setCreationDateCaseReportValidate,
  setDateOfCaseReportValidate,
  setDefaultValuesCaseReportValidate,
  setDescriptionCaseReportValidate,
  setDescriptionOthersCaseReportValidate,
  setDiagnosticCodeCaseReportValidate,
  setDiagnosticDescriptionCaseReportValidate,
  setDoctypePatientCaseReportValidate,
  setDocumentPatientCaseReportValidate,
  setEpsPatientCaseReportValidate,
  setEventIdCaseReportValidate,
  setEventtypeIdCaseReportValidate,
  setFilingnumberCaseReportValidate,
  setFirstLastNamePatientCaseReportValidate,
  setFirstNamePatientCaseReportValidate,
  setFolioPatientCaseReportValidate,
  setGenderPatienCaseReportValidatet,
  setIdCaseReportValidate,
  setInfoprovidedFamilyCaseReportValidate,
  setInmediateActionCaseReportValidate,
  setIsVisibleDescriptionOthersCaseReportValidate,
  setObservationsCharacterizationCaseReportValidate,
  setOriginalCaseIdCaseReportValidate,
  setOriginIdCaseReportValidate,
  setOriginServiceIdCaseReportValidate,
  setReporterDocumentCaseReportValidate,
  setReporterFullNameCaseReportValidate,
  // setReporterIdCaseReportValidate,
  setReportingServiceIdCaseReportValidate,
  setRisklevelIdCaseReportValidate,
  setSecondLastNamePatientCaseReportValidate,
  setSecondNamePatientCaseReportValidate,
  setSeverityClasifIdCaseReportValidate,
  setSuboriginIdCaseReportValidate,
} from "@/redux/features/case_report_validate/caseReportValidateSlice";
import {
  setDefaultValuesMovementReport,
  setNameMovementReport,
} from "@/redux/features/movement_report/movementReportSlice";
import { setListDevicesCaseReport } from "@/redux/features/device_case_report/deviceCaseReportSlice";
import { setListMedicinesCaseReport } from "@/redux/features/medicine_case_report/medicineCaseReportSlice";
import { setNewCaseValidateId } from "@/redux/features/case_report_validate/selectedCasesSlice";

const ValidateReportContent: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [caseReportValidateIdLocalState, setCaseReportValidateIdLocalState] =
    useState("");
  const [caseReportOriginalIdLocalState, setCaseReportOriginalIdLocalState] =
    useState("");

  const {
    data: allValidateCasesData,
    isFetching: allValidateCasesDataFetching,
    isLoading: allValidateCasesDataLoading,
    error: allValidateCasesDataError,
    refetch: allValidateCasesDataRefetch,
  } = useGetAllValidateCasesQuery(null);

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const {
    data: allEventsData,
    isFetching: allEventsDataFetching,
    isLoading: allEventsDataLoading,
    error: allEventsDataError,
    refetch: allEventsDataRefetch,
  } = useGetAllEventsQuery(null);

  const {
    data: allPrioritiesData,
    isFetching: allPrioritiesDataFetching,
    isLoading: allPrioritiesDataLoading,
    error: allPrioritiesDataError,
    refetch: allPrioritiesDataRefetch,
  } = useGetAllPrioritiesQuery(null);

  const {
    data: allMovementReportsData,
    isFetching: allMovementReportsDataFetching,
    isLoading: allMovementReportsDataLoading,
    error: allMovementReportsDataError,
    refetch: allMovementReportsDataRefetch,
  } = useGetAllMovementReportsQuery(null);

  const {
    data: reportValidateByIdData,
    isFetching: reportValidateByIdDataFetching,
    isLoading: reportValidateByIdDataLoading,
    error: reportValidateByIdDataError,
    refetch: reportValidateByIdDataRefetch,
  } = useGetReportValidateByIdQuery(caseReportValidateIdLocalState!, {
    skip: !caseReportValidateIdLocalState,
  });

  const {
    data: reportOriginalByIdData,
    isFetching: reportOriginalByIdDataFetching,
    isLoading: reportOriginalByIdDataLoading,
    error: reportOriginalByIdDataError,
    refetch: reportOriginalByIdDataRefetch,
  } = useGetReportOriginalByIdQuery(caseReportOriginalIdLocalState, {
    skip: !caseReportOriginalIdLocalState,
  });

  useEffect(() => {
    if (reportValidateByIdData && reportOriginalByIdData) {
      dispatch(setIdCaseReportValidate(caseReportValidateIdLocalState));
      dispatch(
        setOriginalCaseIdCaseReportValidate(
          reportValidateByIdData?.val_cr_originalcase_id_fk
        )
      );
      dispatch(
        setAnonynousUserCaseReportValidate(
          reportValidateByIdData?.val_cr_anonymoususer
        )
      );
      dispatch(
        setDateOfCaseReportValidate(reportValidateByIdData?.val_cr_dateofcase)
      );
      dispatch(
        setCreationDateCaseReportValidate(
          reportValidateByIdData?.val_cr_creationdate
        )
      );
      dispatch(
        setCasetypeIdCaseReportValidate(
          reportValidateByIdData?.val_cr_casetype_id_fk
        )
      );
      dispatch(
        setFilingnumberCaseReportValidate(
          reportValidateByIdData?.val_cr_filingnumber
        )
      );
      dispatch(
        setAssociatedPatientCaseReportValidate(
          reportValidateByIdData?.val_cr_associatedpatient
        )
      );
      dispatch(
        setDocumentPatientCaseReportValidate(
          reportValidateByIdData?.val_cr_documentpatient
        )
      );
      dispatch(
        setDoctypePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_doctypepatient
        )
      );
      dispatch(
        setFirstNamePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_firstnamepatient
        )
      );
      dispatch(
        setSecondNamePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_secondnamepatient
        )
      );
      dispatch(
        setFirstLastNamePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_firstlastnamepatient
        )
      );
      dispatch(
        setSecondLastNamePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_secondlastnamepatient
        )
      );
      dispatch(
        setAgePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_agepatient
        )
      );
      dispatch(
        setGenderPatienCaseReportValidatet(
          reportValidateByIdData?.val_cr_genderpatient
        )
      );
      dispatch(
        setEpsPatientCaseReportValidate(
          reportValidateByIdData?.val_cr_epspatient
        )
      );
      dispatch(
        setAdmConsecutivePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_admconsecutivepatient
        )
      );
      dispatch(
        setFolioPatientCaseReportValidate(
          reportValidateByIdData?.val_cr_foliopatient
        )
      );
      dispatch(
        setDiagnosticCodeCaseReportValidate(
          reportValidateByIdData?.val_cr_diagnosticcodepatient
        )
      );
      dispatch(
        setDiagnosticDescriptionCaseReportValidate(
          reportValidateByIdData?.val_cr_diagnosticdescriptionpatient
        )
      );

      dispatch(
        setReporterFullNameCaseReportValidate(
          reportValidateByIdData?.val_cr_fullnamereporter
        )
      );
      dispatch(
        setReporterDocumentCaseReportValidate(
          reportValidateByIdData?.val_cr_documentreporter
        )
      );
      dispatch(
        setEventtypeIdCaseReportValidate(
          reportValidateByIdData?.val_cr_eventtype_id_fk
        )
      );
      dispatch(
        setEventIdCaseReportValidate(reportValidateByIdData?.val_cr_event_id_fk)
      );
      dispatch(
        setDescriptionOthersCaseReportValidate(
          reportValidateByIdData?.val_cr_descriptionothers
        )
      );
      dispatch(
        setIsVisibleDescriptionOthersCaseReportValidate(
          !!reportValidateByIdData?.val_cr_descriptionothers
        )
      );
      dispatch(
        setOriginServiceIdCaseReportValidate(
          reportValidateByIdData?.val_cr_originservice_id_fk
        )
      );
      dispatch(
        setReportingServiceIdCaseReportValidate(
          reportValidateByIdData?.val_cr_reportingservice_id_fk
        )
      );
      dispatch(
        setSeverityClasifIdCaseReportValidate(
          reportValidateByIdData?.val_cr_severityclasif_id_fk
        )
      );
      dispatch(
        setOriginIdCaseReportValidate(
          reportValidateByIdData?.val_cr_origin_id_fk
        )
      );
      dispatch(
        setSuboriginIdCaseReportValidate(
          reportValidateByIdData?.val_cr_suborigin_id_fk
        )
      );
      dispatch(
        setRisklevelIdCaseReportValidate(
          reportValidateByIdData?.val_cr_risklevel_id_fk
        )
      );
      dispatch(
        setCharacterizationIdCaseReportValidate(
          reportValidateByIdData?.val_cr_characterization_id_fk
        )
      );
      dispatch(
        setInfoprovidedFamilyCaseReportValidate(
          reportValidateByIdData?.val_cr_infoprovidedfamily
        )
      );
      dispatch(
        setClinicalFollowRequiredCaseReportValidate(
          reportValidateByIdData?.val_cr_clinicalfollowrequired
        )
      );
      dispatch(
        setObservationsCharacterizationCaseReportValidate(
          reportValidateByIdData?.val_cr_observationscharacterization
        )
      );
      dispatch(
        setDescriptionCaseReportValidate(
          reportValidateByIdData?.val_cr_description
        )
      );
      dispatch(
        setInmediateActionCaseReportValidate(
          reportValidateByIdData?.val_cr_inmediateaction
        )
      );
      dispatch(
        setCreateDateCaseReportValidate(reportValidateByIdData?.createdAt)
      );
      if (reportOriginalByIdData?.device) {
        dispatch(setListDevicesCaseReport(reportOriginalByIdData?.device));
      }
      if (reportOriginalByIdData?.medicine) {
        dispatch(setListMedicinesCaseReport(reportOriginalByIdData?.medicine));
      }

      dispatch(
        setNameMovementReport(reportValidateByIdData.movementReport?.mov_r_name)
      );

      router.push(`/validate_report_review/`);
    }
  }, [
    reportValidateByIdData,
    reportOriginalByIdData,
    caseReportValidateIdLocalState,
  ]);

  const caseTypeGetName = getNameOfCaseTypeMap(allCaseTypesData);
  const eventGetName = getNameOfEventMap(allEventsData);
  const priorityGetName = getNameOfPriorityMap(allPrioritiesData);
  const movementReportGetName = getNameOfMovementReportMap(
    allMovementReportsData
  );

  const transformedData = Array.isArray(allValidateCasesData)
    ? allValidateCasesData?.map((req: CaseReportValidate) => ({
        ...req,
        val_cr_casetype_id_fk: caseTypeGetName?.[req.val_cr_casetype_id_fk],
        val_cr_statusmovement_id_fk:
          movementReportGetName?.[req.val_cr_statusmovement_id_fk],
        val_cr_event_id_fk: eventGetName?.[req.val_cr_event_id_fk],
        val_cr_priority_id_fk:
          req.val_cr_priority_id_fk !== null
            ? priorityGetName?.[req.val_cr_priority_id_fk]
            : null,
      }))
    : [];

  const handleClickSeeMore = (id: string, caseOriginalId: string) => {
    dispatch(setDefaultValuesCaseReportValidate());
    dispatch(setListDevicesCaseReport([]));
    dispatch(setListMedicinesCaseReport([]));
    dispatch(setDefaultValuesMovementReport());
    dispatch(setNewCaseValidateId(""));
    setCaseReportValidateIdLocalState(id);
    setCaseReportOriginalIdLocalState(caseOriginalId);
  };

  return (
    <div style={{ padding: "22px" }}>
      <div className="title-module">
        <h2
          style={{
            ...titleStyleCss,
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Validar casos
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allValidateCasesDataRefetch}
        loading={
          allValidateCasesDataFetching ||
          allValidateCasesDataLoading ||
          allMovementReportsDataLoading ||
          allMovementReportsDataFetching ||
          allCaseTypesDataLoading ||
          allCaseTypesDataFetching ||
          allEventsDataLoading ||
          allEventsDataFetching ||
          allPrioritiesDataLoading ||
          allPrioritiesDataFetching
        }
        columnsCustomTable={TableColumnsValidateReport({
          caseTypeData: allCaseTypesData,
          eventData: allEventsData,
          priorityData: allPrioritiesData,
          movementReportData: allMovementReportsData,
          handleClickSeeMore,
          reportValidateByIdDataLoading,
        })}
      />
    </div>
  );
};

export default ValidateReportContent;
