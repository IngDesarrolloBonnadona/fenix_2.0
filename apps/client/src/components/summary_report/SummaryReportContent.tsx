"use client";

import React from "react";

import CustomTableFiltersAndSorting from "../common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { getNameOfEventMap } from "@/helpers/get_name_by_id/get_name_of_event";
import { getNameOfPriorityMap } from "@/helpers/get_name_by_id/get_name_of_priority";
import { getNameOfMovementReportMap } from "@/helpers/get_name_by_id/get_name_of_movement_report";

import TableColumnsSummaryReports from "./table_columns_summary_reports/TableColumnsSummaryReports";

import { useGetAllSummaryReportsQuery } from "@/redux/apis/case_report_validate/caseReportValidateApi";
import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllEventsQuery } from "@/redux/apis/event/eventApi";
import { useGetAllPrioritiesQuery } from "@/redux/apis/priority/priorityApi";

import { useRouter } from "next/navigation";
import { useGetAllMovementReportsQuery } from "@/redux/apis/movement_report/movementReportApi";
import { titleStyleCss } from "@/theme/text_styles";

const SummaryReportContent: React.FC = () => {
  const router = useRouter();

  const {
    data: allSummaryReportsData,
    isFetching: allSummaryReportsDataFetching,
    isLoading: allSummaryReportsDataLoading,
    error: allSummaryReportsDataError,
    refetch: allSummaryReportsDataRefetch,
  } = useGetAllSummaryReportsQuery(null);

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
    ? allSummaryReportsData?.map((req: CaseReportValidate) => ({
        ...req,
        val_cr_casetype_id_fk: caseTypeGetName?.[req.val_cr_casetype_id_fk],
        val_cr_event_id_fk: eventGetName?.[req.val_cr_event_id_fk],
        val_cr_priority_id_fk:
          req.val_cr_priority_id_fk !== null
            ? priorityGetName?.[req.val_cr_priority_id_fk]
            : null,
        val_cr_statusmovement_id_fk:
          movementReportGetName?.[req.val_cr_statusmovement_id_fk],
      }))
    : [];

  const handleToRedirectToReportSummary = (id: string) => {
    router.push(`/summary_report_review/${id}`);
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
          Resumen de casos
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allSummaryReportsDataRefetch}
        loading={
          allSummaryReportsDataLoading ||
          allSummaryReportsDataFetching ||
          allMovementReportsDataLoading ||
          allMovementReportsDataFetching ||
          allCaseTypesDataLoading ||
          allCaseTypesDataFetching ||
          allEventsDataLoading ||
          allEventsDataFetching ||
          allPrioritiesDataLoading ||
          allPrioritiesDataFetching
        }
        columnsCustomTable={TableColumnsSummaryReports({
          caseTypeData: allCaseTypesData,
          eventData: allEventsData,
          priorityData: allPrioritiesData,
          movementReportData: allMovementReportsData,
          handleToRedirectToReportSummary,
        })}
      />
    </div>
  );
};

export default SummaryReportContent;
