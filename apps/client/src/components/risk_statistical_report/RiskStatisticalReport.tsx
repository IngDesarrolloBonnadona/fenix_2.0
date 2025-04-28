"use client";

import React, { useEffect, useState } from "react";

import { Card, List, Typography } from "antd";

import ContentGenerateControlEvaluationFormData from "../shared/content_generate_control_evaluation_form_data/ContentGenerateControlEvaluationFormData";

import { DatePickerProps } from "antd/lib";
import { titleStyleCss } from "@/theme/text_styles";

import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";
import { useGetAllControlEvaluationByInitialDateAndEndDateQuery } from "@/redux/apis/control_evaluation/controlEvaluationApi";
import { useGetAllQuarterYearsQuery } from "@/redux/apis/quarter_year/quarterYearApi";
import { useGetAllRiskTypesQuery } from "@/redux/apis/risk_type/riskTypeApi";
import ContentRiskStatisticalReportTable from "./content_risk_statistical_report_table/ContentRiskStatisticalReportTable";
import CustomSpin from "../common/custom_spin/CustomSpin";
import ContentWeaknessesRiskSelected from "./content-weaknesses-risk-selected/ContentWeaknessesRiskSelected";

const RiskStatisticalReportContent: React.FC = () => {
  const [startDateLocalState, setStartDateLocalState] = useState("");
  const [endDateLocalState, setEndDateLocalState] = useState("");
  const [unitIdLocalState, setUnitIdLocalState] = useState(0);
  const [
    seeGeneralInstitutionalLocalState,
    setSeeGeneralInstitutionalLocalState,
  ] = useState(false);
  const [selectedRiskDataLocalState, setSelectedRiskDataLocalState] = useState<
    ControlEvaluation[] | undefined
  >([]);

  const {
    data: allControlEvaluationByInitialDateAndEndDateData,
    isFetching: allControlEvaluationByInitialDateAndEndDateFetching,
    isLoading: allControlEvaluationByInitialDateAndEndDateLoading,
    error: allControlEvaluationByInitialDateAndEndDateError,
    refetch: allControlEvaluationByInitialDateAndEndDateRefetch,
  } = useGetAllControlEvaluationByInitialDateAndEndDateQuery(
    { startDate: startDateLocalState, endDate: endDateLocalState },
    {
      skip: !startDateLocalState || !endDateLocalState,
    }
  );

  const {
    data: allUnitsData,
    isFetching: allUnitsFetching,
    isLoading: allUnitsLoading,
    error: allUnitsError,
    refetch: allUnitsRefetch,
  } = useGetAllUnitsQuery(null);

  const {
    data: allQuarterYearsData,
    isFetching: allQuarterYearsFetching,
    isLoading: allQuarterYearsLoading,
    error: allQuarterYearsError,
    refetch: allQuarterYearsRefetch,
  } = useGetAllQuarterYearsQuery(null);

  const {
    data: AllRiskTypesData,
    isFetching: AllRiskTypesFetching,
    isLoading: AllRiskTypesLoading,
    error: AllRiskTypesError,
    refetch: AllRiskTypesRefetch,
  } = useGetAllRiskTypesQuery(null);

  const onChangeInitialDate: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    setStartDateLocalState(dateString.toString());
    setSelectedRiskDataLocalState([]);
  };

  const onChangeEndDate: DatePickerProps["onChange"] = (date, dateString) => {
    setEndDateLocalState(dateString.toString());
    setSelectedRiskDataLocalState([]);
  };

  const filtteredData = seeGeneralInstitutionalLocalState
    ? allControlEvaluationByInitialDateAndEndDateData
    : allControlEvaluationByInitialDateAndEndDateData?.filter(
        (item) => item.event?.eve_unit_id_fk === unitIdLocalState
      );

  const handleCellStatisticClick = (data: ControlEvaluation[]) => {
    setSelectedRiskDataLocalState(data);
    console.log("selectedRiskDataLocalState", selectedRiskDataLocalState);
  };

  const groupedAndSortedData = selectedRiskDataLocalState
    ?.reduce(
      (acc, item) => {
        const eventName = item.event?.eve_name;

        if (eventName) {
          const existing = acc.find((d) => d.eventName === eventName);
          if (existing) {
            existing.materializedCases += item.con_e_materialized_case;
          } else {
            acc.push({
              eventName,
              materializedCases: item.con_e_materialized_case,
            });
          }
        }
        return acc;
      },
      [] as { eventName: string; materializedCases: number }[]
    )
    .sort((a, b) => b.materializedCases - a.materializedCases);

  const shouldShowStatistical =
    startDateLocalState &&
    endDateLocalState &&
    (seeGeneralInstitutionalLocalState || unitIdLocalState !== 0);

  return (
    <div className="risk-statistical-report" style={{ padding: "16px" }}>
      <div className="content-generate-statistical-report-form-data">
        <Card
          style={{
            width: "100%",
            height: "100%",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
          }}
          bordered={false}
          size="small"
        >
          <Typography.Title
            level={5}
            style={{
              ...titleStyleCss,
              color: "#f28322",
            }}
          >
            Generar informe estadístico:
          </Typography.Title>

          <ContentGenerateControlEvaluationFormData
            unitIdLocalStateFormData={unitIdLocalState}
            seeGeneralInstitutionalFormData={seeGeneralInstitutionalLocalState}
            onChangeInitialDateFormData={onChangeInitialDate}
            onChangeEndDateFormData={onChangeEndDate}
            setUnitIdLocalStateFormData={(e) => {
              setUnitIdLocalState(e);
              setSelectedRiskDataLocalState([]);
            }}
            setSeeGeneralInstitutionalFormData={
              setSeeGeneralInstitutionalLocalState
            }
            allUnitsDataFormData={allUnitsData}
            allUnitsFetchingFormData={allUnitsFetching}
            allUnitsLoadingFormData={allUnitsLoading}
          />
        </Card>
      </div>

      {shouldShowStatistical && (
        <>
          <div className="content-generate-statistical-report-data">
            <Card
              style={{
                width: "100%",
                height: "100%",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "16px",
                marginTop: "10px",
              }}
              bordered={false}
              size="small"
            >
              {allControlEvaluationByInitialDateAndEndDateLoading ||
              allControlEvaluationByInitialDateAndEndDateFetching ? (
                <CustomSpin />
              ) : (
                <>
                  <ContentRiskStatisticalReportTable
                    controlEvaluationData={filtteredData}
                    quartersYearData={allQuarterYearsData}
                    riskTypeData={AllRiskTypesData}
                    onCellClick={handleCellStatisticClick}
                  />
                </>
              )}
            </Card>
          </div>

          {groupedAndSortedData?.length !== 0 && (
            <div className="content-weaknesses-selected-risk">
              <Card
                style={{
                  width: "100%",
                  height: "100%",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "16px",
                  marginTop: "10px",
                }}
                bordered={false}
                size="small"
              >
                <Typography.Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#f28322",
                  }}
                >
                  {`Ranking de riesgos materializados: ${(selectedRiskDataLocalState?.length ?? 0) >= 5 ? "(Top 5)" : ""}`}
                </Typography.Title>

                <div className="content-list-weaknesses-selected-risk">
                  <List
                    dataSource={groupedAndSortedData}
                    renderItem={(item) => {
                      return (
                        <ContentWeaknessesRiskSelected
                          riskTitleData={item.eventName}
                        />
                      );
                    }}
                  />
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RiskStatisticalReportContent;
