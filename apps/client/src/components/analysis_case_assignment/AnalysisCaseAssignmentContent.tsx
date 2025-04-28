"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { RiTeamLine } from "react-icons/ri";

import CustomTableFiltersAndSorting from "../common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import CustomButton from "../common/custom_button/CustomButton";
import TableColumnsAnalysisCaseAssignment from "./table_columns_analysis_case_assignment/TableColumnsAnalysisCaseAssignment";

import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllEventsQuery } from "@/redux/apis/event/eventApi";
import { useGetAllPrioritiesQuery } from "@/redux/apis/priority/priorityApi";
import { useGetAllMovementReportsQuery } from "@/redux/apis/movement_report/movementReportApi";
import { useGetReportsForAssignCasesQuery } from "@/redux/apis/report_analyst_assignment/reportAnalystAssignmentApi";

import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { getNameOfEventMap } from "@/helpers/get_name_by_id/get_name_of_event";
import { getNameOfPriorityMap } from "@/helpers/get_name_by_id/get_name_of_priority";
import { getNameOfMovementReportMap } from "@/helpers/get_name_by_id/get_name_of_movement_report";

import { useAppSelector } from "@/redux/hook";
import { titleStyleCss } from "@/theme/text_styles";

const AnalysisCaseAssignmentContent = () => {
  const router = useRouter();

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const {
    data: reportForAssignCasesByIdAnalystData,
    isFetching: reportForAssignCasesByIdAnalystFetching,
    isLoading: reportForAssignCasesByIdAnalystLoading,
    error: reportForAssignCasesByIdAnalystError,
    refetch: reportForAssignCasesByIdAnalystRefetch,
  } = useGetReportsForAssignCasesQuery(idNumberUserSessionState.toString(), {
    skip: !idNumberUserSessionState,
  });

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

  const transformedData = Array.isArray(reportForAssignCasesByIdAnalystData)
    ? reportForAssignCasesByIdAnalystData?.map((req: CaseReportValidate) => ({
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
    router.push(`/analysis_case_assignment_review/${id}`);
  };

  return (
    <div className="case-assignment-table" style={{ padding: "22px" }}>
      <div className="title-module">
        <h2
          style={{
            ...titleStyleCss,
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Asignación de casos
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={reportForAssignCasesByIdAnalystRefetch}
        loading={
          reportForAssignCasesByIdAnalystFetching ||
          reportForAssignCasesByIdAnalystLoading ||
          allCaseTypesDataLoading ||
          allCaseTypesDataFetching ||
          allEventsDataLoading ||
          allEventsDataFetching ||
          allPrioritiesDataLoading ||
          allPrioritiesDataFetching ||
          allMovementReportsDataLoading ||
          allMovementReportsDataFetching
        }
        customButton={
          <CustomButton
            classNameCustomButton="researchers-team-button"
            idCustomButton="researchers-team-button"
            titleCustomButton="Equipo"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            iconCustomButton={<RiTeamLine />}
            onClickCustomButton={() => router.push(`/team_researchers`)}
            styleCustomButton={{
              marginLeft: "16px",
              background: "#f28322",
              color: "#ffffff",
              borderRadius: "16px",
            }}
            iconPositionCustomButton={"end"}
            sizeCustomButton={"small"}
          />
        }
        columnsCustomTable={TableColumnsAnalysisCaseAssignment({
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

export default AnalysisCaseAssignmentContent;
