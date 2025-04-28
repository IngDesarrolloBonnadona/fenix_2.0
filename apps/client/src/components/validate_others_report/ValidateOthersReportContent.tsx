"use client";

import React from "react";

import { useRouter } from "next/navigation";

import CustomTableFiltersAndSorting from "../common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { getNameOfEventMap } from "@/helpers/get_name_by_id/get_name_of_event";
import { getNameOfPriorityMap } from "@/helpers/get_name_by_id/get_name_of_priority";
import { getNameOfMovementReportMap } from "@/helpers/get_name_by_id/get_name_of_movement_report";

import TableColumnsValidateOthersReport from "./table_columns_validate_others_report/TableColumnsValidateOthersReport";

import { useGetAllValidateOthersCasesQuery } from "@/redux/apis/case_report_validate/caseReportValidateApi";
import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllEventsQuery } from "@/redux/apis/event/eventApi";
import { useGetAllPrioritiesQuery } from "@/redux/apis/priority/priorityApi";
import { useGetAllMovementReportsQuery } from "@/redux/apis/movement_report/movementReportApi";
import { titleStyleCss } from "@/theme/text_styles";

const ValidateOthersReportContent = () => {
  const router = useRouter();

  const {
    data: allValidateOthersCasesData,
    isFetching: allValidateOthersCasesDataFetching,
    isLoading: allValidateOthersCasesDataLoading,
    error: allValidateOthersCasesDataError,
    refetch: allValidateOthersCasesDataRefetch,
  } = useGetAllValidateOthersCasesQuery(null);

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

  const caseTypeGetName = getNameOfCaseTypeMap(allCaseTypesData);
  const eventGetName = getNameOfEventMap(allEventsData);
  const priorityGetName = getNameOfPriorityMap(allPrioritiesData);
  const movementReportGetName = getNameOfMovementReportMap(
    allMovementReportsData
  );

  const transformedData = Array.isArray(allEventsData)
    ? allValidateOthersCasesData?.map((req: CaseReportValidate) => ({
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

  const handleClickSeeMore = (id: string) => {
    router.push(`/validate_others_report_review/${id}`);
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
          Otros casos
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allValidateOthersCasesDataRefetch}
        loading={
          allValidateOthersCasesDataLoading ||
          allValidateOthersCasesDataFetching ||
          allMovementReportsDataLoading ||
          allMovementReportsDataFetching ||
          allCaseTypesDataLoading ||
          allCaseTypesDataFetching ||
          allEventsDataLoading ||
          allEventsDataFetching ||
          allPrioritiesDataLoading ||
          allPrioritiesDataFetching
        }
        columnsCustomTable={TableColumnsValidateOthersReport({
          caseTypeData: allCaseTypesData,
          eventData: allEventsData,
          priorityData: allPrioritiesData,
          movementReportData: allMovementReportsData,
          handleClickSeeMore,
        })}
      />
    </div>
  );
};

export default ValidateOthersReportContent;
