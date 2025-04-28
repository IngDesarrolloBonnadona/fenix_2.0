"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/hook";

import { Button, Card, Col, Row, Select, Typography } from "antd";

import Content_button_back_router from "../shared/content_button_back_router/Content_button_back_router";
import CustomTableFiltersAndSorting from "../common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsTeamResearchers from "./table_columns_team_researchers/TableColumsTeamResearchers";

import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { getNameOfEventMap } from "@/helpers/get_name_by_id/get_name_of_event";
import { getNameOfPriorityMap } from "@/helpers/get_name_by_id/get_name_of_priority";
import { getNameOfMovementReportMap } from "@/helpers/get_name_by_id/get_name_of_movement_report";

import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllEventsQuery } from "@/redux/apis/event/eventApi";
import { useGetAllPrioritiesQuery } from "@/redux/apis/priority/priorityApi";
import { useGetAllMovementReportsQuery } from "@/redux/apis/movement_report/movementReportApi";
import { useAllActiveUsersQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";
import {
  useGetAssignedResearchersByIdNumberAnalystQuery,
  useGetReportsAssignedByIdNumberResearcherQuery,
} from "@/redux/apis/report_researcher_assignment/reportResearcherAssignmentApi";
import CustomSpin from "../common/custom_spin/CustomSpin";
import { titleStyleCss } from "@/theme/text_styles";
import TeamResearchSelect from "./team_research_select/TeamResearchSelect";

const TeamResearchersContent: React.FC = () => {
  const { Title } = Typography;

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const [idNumberResearcherLocalState, setIdNumberResearcherLocalState] =
    useState("");

  const {
    data: allAssignedResearchersByIdNumberAnalystData,
    isFetching: allAssignedResearchersByIdNumberAnalystFetching,
    isLoading: allAssignedResearchersByIdNumberAnalystLoading,
    error: allAssignedResearchersByIdNumberAnalystError,
  } = useGetAssignedResearchersByIdNumberAnalystQuery(
    idNumberUserSessionState.toString(),
    {
      skip: !idNumberUserSessionState,
    }
  );

  const {
    data: allReportsAssignedByIdNumberResearcherData,
    isFetching: allReportsAssignedByIdNumberResearcherFetching,
    isLoading: allReportsAssignedByIdNumberResearcherLoading,
    error: allReportsAssignedByIdNumberResearcherError,
    refetch: allReportsAssignedByIdNumberResearcherRefetch,
  } = useGetReportsAssignedByIdNumberResearcherQuery(
    idNumberResearcherLocalState,
    {
      skip: !idNumberResearcherLocalState,
    }
  );

  const {
    data: allUsersActiveData,
    isFetching: allUsersActiveFetching,
    isLoading: allUsersActiveLoading,
    error: allUsersActiveError,
  } = useAllActiveUsersQuery(null);

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

  const researcherOptions = React.useMemo(() => {
    if (!allAssignedResearchersByIdNumberAnalystData || !allUsersActiveData)
      return [];

    const userIds = allAssignedResearchersByIdNumberAnalystData.map(
      (researcher) => researcher.res_userresearch_id
    );

    return allUsersActiveData
      .filter((user) => userIds.includes(String(user.id_number)))
      .map((user) => ({
        value: user.id_number,
        label: `${user.id_number} - ${user.name} ${user.last_name}`,
      }));
  }, [allAssignedResearchersByIdNumberAnalystData, allUsersActiveData]);

  const caseTypeGetName = getNameOfCaseTypeMap(allCaseTypesData);
  const eventGetName = getNameOfEventMap(allEventsData);
  const priorityGetName = getNameOfPriorityMap(allPrioritiesData);
  const movementReportGetName = getNameOfMovementReportMap(
    allMovementReportsData
  );

  const transformedData = Array.isArray(
    allReportsAssignedByIdNumberResearcherData
  )
    ? allReportsAssignedByIdNumberResearcherData?.map(
        (req: CaseReportValidate) => ({
          ...req,
          val_cr_casetype_id_fk: caseTypeGetName?.[req.val_cr_casetype_id_fk],
          val_cr_statusmovement_id_fk:
            movementReportGetName?.[req.val_cr_statusmovement_id_fk],
          val_cr_event_id_fk: eventGetName?.[req.val_cr_event_id_fk],
          val_cr_priority_id_fk:
            req.val_cr_priority_id_fk !== null
              ? priorityGetName?.[req.val_cr_priority_id_fk]
              : null,
        })
      )
    : [];

  return (
    <div className="team-researcher" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      <div>
        <div style={{ padding: "16px" }}>
          <div>
            <Title
              className="title-researchers-team"
              level={3}
              style={{
                ...titleStyleCss,
                marginBottom: "13px",
                textAlign: "center",
              }}
            >
              Equipo de investigadores
            </Title>
          </div>

          <div>
            <Title
              level={5}
              style={{
                color: "#002140",
              }}
            >
              Selecciona el investigador:
            </Title>
          </div>

          <Row>
            <Col span={8}>
              <div className="team-researchers-select">
                {allAssignedResearchersByIdNumberAnalystLoading ||
                allAssignedResearchersByIdNumberAnalystFetching ||
                allUsersActiveLoading ||
                allUsersActiveFetching ? (
                  <CustomSpin />
                ) : (
                  <TeamResearchSelect
                    researcherOptionsData={researcherOptions}
                    onChangeIdNumberResearcherLocalStateData={
                      setIdNumberResearcherLocalState
                    }
                    idNumberResearcherLocalStateData={
                      idNumberResearcherLocalState
                    }
                    allUsersActiveLoadingData={allUsersActiveLoading}
                    allUsersActiveFetchingData={allUsersActiveFetching}
                    allAssignedResearchersByIdNumberAnalystFetchingData={
                      allAssignedResearchersByIdNumberAnalystFetching
                    }
                    allAssignedResearchersByIdNumberAnalystLoadingData={
                      allAssignedResearchersByIdNumberAnalystLoading
                    }
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>

        <div className="team-researchers-table" style={{ padding: "16px" }}>
          {idNumberResearcherLocalState && (
            <CustomTableFiltersAndSorting
              dataCustomTable={transformedData || []}
              onClickRechargeCustomTable={
                allReportsAssignedByIdNumberResearcherRefetch
              }
              loading={
                allReportsAssignedByIdNumberResearcherFetching ||
                allReportsAssignedByIdNumberResearcherLoading
              }
              columnsCustomTable={TableColumnsTeamResearchers({
                caseTypeData: allCaseTypesData,
                eventData: allEventsData,
                priorityData: allPrioritiesData,
                movementReportData: allMovementReportsData,
              })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamResearchersContent;
