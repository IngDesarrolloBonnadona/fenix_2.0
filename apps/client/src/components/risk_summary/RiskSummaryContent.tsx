"use client";

import React, { useState } from "react";

import { Card, Empty, List, Typography } from "antd";
import { DatePickerProps } from "antd/lib";
import { titleStyleCss } from "@/theme/text_styles";

import ContentGenerateControlEvaluationFormData from "../shared/content_generate_control_evaluation_form_data/ContentGenerateControlEvaluationFormData";
import ContentRiskThermometer from "./content_risk_thermometer/ContentRiskThermometer";
import ContentRiskSelected from "./content_risk_selected/ContentRiskSelected";

import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomPiePlotBasic from "../common/custom_pie_plot_basic/CustomPiePlotBasic";

import { filterMaterializedCasesByQuarterAndYear } from "../risk_analysis/helpers/filter_cases_by_current_quarter";
import { filterCasesByUnit } from "../risk_analysis/helpers/filter_cases_by_unit";
import { getRiskLevelProbabilityByImpact } from "../risk_analysis_review/helpers/get_risk_level_probability_by_impact";

import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";
import { useGetAllControlEvaluationByInitialDateAndEndDateQuery } from "@/redux/apis/control_evaluation/controlEvaluationApi";
import { useGetAllServicesQuery } from "@/redux/apis/service/serviceApi";
import { useGetAllSeverityClasificationsQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";

const RiskSummaryContent: React.FC = () => {
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
    data: allServicesData,
    isFetching: allServicesFetching,
    isLoading: allServicesLoading,
    error: allServicesByError,
    refetch: allServicesRefetch,
  } = useGetAllServicesQuery(null);

  const {
    data: allSeverityClasificationsData,
    isFetching: allSeverityClasificationsFetching,
    isLoading: allSeverityClasificationsLoading,
    error: allSeverityClasificationsError,
    refetch: allSeverityClasificationsRefetch,
  } = useGetAllSeverityClasificationsQuery(null);

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

  const groupedData = filtteredData?.reduce(
    (acc, item) => {
      const riskLevel = getRiskLevelProbabilityByImpact(
        item.probabilityOcurrence?.prob_o_level ?? 0,
        item.impact?.imp_level ?? 0
      );

      if (riskLevel) {
        const existing = acc.find((d) => d.type === riskLevel.name);

        if (existing) {
          existing.value += item.con_e_materialized_case;
        } else {
          acc.push({
            type: riskLevel.name,
            value: item.con_e_materialized_case,
            color: riskLevel.color,
          });
        }
      }

      return acc;
    },
    [] as { type: string; value: number; color: string }[]
  );

  const handleCellThermometerClick = (data: ControlEvaluation[]) => {
    setSelectedRiskDataLocalState(data);
  };

  const shouldShowCharts =
    startDateLocalState &&
    endDateLocalState &&
    (seeGeneralInstitutionalLocalState || unitIdLocalState !== 0);

  return (
    <div className="risk-summary" style={{ padding: "16px" }}>
      {allUnitsLoading ||
      allUnitsFetching ||
      allServicesFetching ||
      allServicesLoading ? (
        <CustomSpin />
      ) : (
        <>
          <div className="content-generate-summary-form-data">
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
                Generar resumen:
              </Typography.Title>

              <ContentGenerateControlEvaluationFormData
                unitIdLocalStateFormData={unitIdLocalState}
                seeGeneralInstitutionalFormData={
                  seeGeneralInstitutionalLocalState
                }
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

          {shouldShowCharts && (
            <>
              <div className="content-summary-pie-chart">
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
                      <Typography.Title
                        level={5}
                        style={{
                          ...titleStyleCss,
                          color: "#f28322",
                        }}
                      >
                        Gráfico de torta por niveles de riesgo:
                      </Typography.Title>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {groupedData?.length === 0 ? (
                          <Empty
                            description="No hay datos para mostrar"
                            style={{ marginTop: "10px" }}
                          />
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              height: "222px",
                            }}
                          >
                            <CustomPiePlotBasic
                              groupedData={groupedData || []}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </Card>
              </div>

              <div className="content-summary-thermometer">
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
                      <Typography.Title
                        level={5}
                        style={{
                          ...titleStyleCss,
                          color: "#f28322",
                        }}
                      >
                        Termómetro por niveles de riesgo:
                      </Typography.Title>

                      <div className="content-thermometer-graphic-control-evaluation">
                        {filtteredData?.length === 0 ? (
                          <Empty
                            description="No hay datos para mostrar"
                            style={{ marginTop: "10px" }}
                          />
                        ) : (
                          <ContentRiskThermometer
                            controlEvaluationData={filtteredData}
                            onCellClick={handleCellThermometerClick}
                          />
                        )}
                      </div>
                    </>
                  )}
                </Card>
              </div>

              {selectedRiskDataLocalState?.length !== 0 && (
                <div className="content-selected-risk">
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
                      Riesgos seleccionados:
                    </Typography.Title>

                    <div className="content-list-selected-risk">
                      <List
                        dataSource={selectedRiskDataLocalState}
                        renderItem={(item) => {
                          const materializedCases = item.event
                            ? filterCasesByUnit(
                                filterMaterializedCasesByQuarterAndYear(item),
                                allServicesData,
                                item.event
                              )
                            : [];
                          const riskTitle =
                            item.event?.materializedAdverseEvent?.eve_name ||
                            item.event?.materializedIncident?.eve_name;

                          return (
                            <ContentRiskSelected
                              riskTitleData={riskTitle}
                              controlPercentageData={
                                item.con_e_compliance_control
                              }
                              materializedCasesData={materializedCases}
                              allSeverityClasificationsData={
                                allSeverityClasificationsData
                              }
                              allSeverityClasificationsLoadingData={
                                allSeverityClasificationsLoading
                              }
                              allSeverityClasificationsFetchingData={
                                allSeverityClasificationsFetching
                              }
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
        </>
      )}
    </div>
  );
};

export default RiskSummaryContent;
