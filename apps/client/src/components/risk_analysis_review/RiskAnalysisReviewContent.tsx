"use client";

import React, { useState } from "react";

import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";

import { Button, Card, Col, Row, Space, Typography } from "antd";

import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { FaPlay } from "react-icons/fa";

import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";

import CustomButton from "../common/custom_button/CustomButton";
import CustomEmpty from "../common/custom_empty/CustomEmpty";
import Content_button_back_router from "../shared/content_button_back_router/Content_button_back_router";
import CustomDrawerNoContent from "../common/custom_drawer_no_content/CustomDrawerNoContent";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomPopoverNoContent from "../common/custom_popover_no_content/CustomPopoverNoContent";

import ContentSimpleCaseDataDetails from "../shared/content_simple_case_data_details/ContentSimpleCaseDataDetails";
import { PermissionsActionsValidation } from "@/helpers/permission_validation/permissionsActionsValidation";
import { ModuleActionsEnum } from "@/utils/enums/permissions/module_actions/module_actions.enum";
import { SeverityClasificationEnum } from "@/utils/enums/severity_clasif.enum";
import { getSeverityClasificarionName } from "@/helpers/get_severity_clasification_name/get_severity_clasification_name";

import CreateRiskCauseButtonComponent from "./risk_cause/create_risk_cause_button/CreateRiskCauseButton";
import CreateRiskMitigationMeasureButtonComponent from "./risk_mitigation_measure/create_risk_mitigation_measure_button/CreateRiskMitigationMeasureButton";
import CreateRiskConsequenceButtonComponent from "./risk_consequence/create_risk_consequence_button/CreateRiskConsequenceButton";
import EditRiskCauseButtonComponent from "./risk_cause/edit_risk_cause_button/EditRiskCauseButton";
import EditRiskMitigationMeasureButtonComponent from "./risk_mitigation_measure/edit_risk_mitigation_measure_button/EditRiskMitigationMeasureButton";
import DeleteRiskCauseButtonComponent from "./risk_cause/delete_risk_cause_button/DeleteRiskCauseButton";
import DeleteRiskMitigationMeasureButtonComponent from "./risk_mitigation_measure/delete_risk_mitigation_measure_button/DeleteRiskMitigationMeasureButton";
import EditRiskConsequenceButtonComponent from "./risk_consequence/edit_risk_consequence_button/EditRiskConsequenceButton";
import DeleteRiskConsequenceButtonComponent from "./risk_consequence/delete_risk_consequence_button/DeleteRiskConsequenceButton";
import ContentStartvaluationForm from "./content_start_evaluation_form/ContentStartEvaluationForm";
import ContentControlEvaluationCollapse from "./content_control_evaluation_collapse/ContentControlEvaluationCollapse";

import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import { useGetRiskCausesByEventIdQuery } from "@/redux/apis/risk_cause/riskCauseApi";
import { useGetRiskMitigationMeasuresByEventIdQuery } from "@/redux/apis/risk_mitigation_measure/riskMitigationMeasure";
import { useGetRiskConsequencesByEventIdQuery } from "@/redux/apis/risk_consequence/riskConsequence";
import {
  useCreateControlEvaluationMutation,
  useGetAllControlEvaluationByEventAndYearQuery,
} from "@/redux/apis/control_evaluation/controlEvaluationApi";
import { useGetAllSeverityClasificationsQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";

const RiskAnalysisReviewContent = () => {
  const dispatch = useDispatch();
  const routerParams = useParams<Record<string, string>>();

  const deleteRiskCauseAction = PermissionsActionsValidation({
    allowedActions: [ModuleActionsEnum.DELETE_RISK_ANALYSIS_CAUSES],
  });

  const deleteRiskControlsAction = PermissionsActionsValidation({
    allowedActions: [ModuleActionsEnum.DELETE_RISK_ANALYSIS_CONTROLS],
  });

  const deleteRiskConsequecesAction = PermissionsActionsValidation({
    allowedActions: [ModuleActionsEnum.DELETE_RISK_ANALYSIS_CONSEQUENCES],
  });

  let eventId = Number(routerParams?.id);

  const riskNameState = useAppSelector((state) => state.event.eve_name);
  const unitNameState = useAppSelector((state) => state.unit.unit_name);
  const selectedCasesState = useAppSelector(
    (state) => state.selectedCases.selectedCases
  );

  const [isVisibleDrawerStarEvaluation, setIsVisibleDrawerStarEvaluation] =
    useState(false);

  const {
    data: allRiskCausesByEventIdData,
    isFetching: allRiskCausesByEventIdFetching,
    isLoading: allRiskCausesByEventIdLoading,
    error: allRiskCausesByEventIdError,
    refetch: allRiskCausesByEventIdRefetch,
  } = useGetRiskCausesByEventIdQuery(eventId, {
    skip: isNaN(eventId),
  });

  const {
    data: allRiskMitigationMeasuresByEventIdData,
    isFetching: allRiskMitigationMeasuresByEventIdFetching,
    isLoading: allRiskMitigationMeasuresByEventIdLoading,
    error: allRiskMitigationMeasuresByEventIdError,
    refetch: allRiskMitigationMeasuresByEventIdRefetch,
  } = useGetRiskMitigationMeasuresByEventIdQuery(eventId, {
    skip: isNaN(eventId),
  });

  const {
    data: allRiskConsequencesByEventIdData,
    isFetching: allRiskConsequencesByEventIdFetching,
    isLoading: allRiskConsequencesByEventIdLoading,
    error: allRiskConsequencesByEventIdError,
    refetch: allRiskConsequencesByEventIdRefetch,
  } = useGetRiskConsequencesByEventIdQuery(eventId, {
    skip: isNaN(eventId),
  });

  const currentYear = new Date().getFullYear();

  const {
    data: allControlEvaluationByEventAndYearData,
    isFetching: allControlEvaluationByEventAndYearFetching,
    isLoading: allControlEvaluationByEventAndYearLoading,
    error: allControlEvaluationByEventAndYearError,
    refetch: allControlEvaluationByEventAndYearRefetch,
  } = useGetAllControlEvaluationByEventAndYearQuery(
    { eventId, year: currentYear },
    {
      skip: isNaN(eventId),
    }
  );

  const {
    data: allSeverityClasificationsData,
    isFetching: allSeverityClasificationsFetching,
    isLoading: allSeverityClasificationsLoading,
    error: allSeverityClasificationsError,
    refetch: allSeverityClasificationsRefetch,
  } = useGetAllSeverityClasificationsQuery(null);

  const [
    createControlEvaluation,
    { isLoading: createdRiskControlEvaluationLoading },
  ] = useCreateControlEvaluationMutation();

  const handleChangeCLoseDrawer = () => {
    setIsVisibleDrawerStarEvaluation(false);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createControlEvaluation({
        con_e_event_id: eventId,
        con_e_year: currentYear,
        con_e_materialized_case: selectedCasesState.flat().length,
        con_e_is_inherent: true,
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
          setShowMessage({
            type: "success",
            content: responseData.message,
          })
        );
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      dispatch(
        setShowMessage({
          type: "error",
          content: "ERROR INTERNO",
        })
      );
    } finally {
      setIsVisibleDrawerStarEvaluation(true);
      allControlEvaluationByEventAndYearRefetch();
    }
  };

  return (
    <div className="risk-analysis-review" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      {!riskNameState || !unitNameState || !selectedCasesState ? (
        <CustomSpin />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "16px",
            }}
          >
            <CustomButton
              classNameCustomButton="start-evaluation-button"
              idCustomButton="start-evaluation-button"
              titleCustomButton="Iniciar evaluación"
              typeCustomButton="primary"
              htmlTypeCustomButton="button"
              iconCustomButton={
                !createdRiskControlEvaluationLoading ? (
                  <FaPlay />
                ) : (
                  <LoadingOutlined />
                )
              }
              disabledCustomButton={
                !createdRiskControlEvaluationLoading ? false : true
              }
              onClickCustomButton={handleClickSubmit}
              styleCustomButton={{
                background: !createdRiskControlEvaluationLoading
                  ? "#002140"
                  : "#6C757D",
                color: "#fff",
                fontSize: "12px",
                borderRadius: "16px",
              }}
              iconPositionCustomButton={"end"}
              sizeCustomButton={"small"}
            />
          </div>
          <Card
            size="small"
            style={{
              width: "100%",
              border: "1px solid #477bb6",
              background: "#D5E5FF",
              textAlign: "center",
              padding: "0px 7px",
              margin: "0px",
            }}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Typography.Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#002140",
                    marginTop: "10px",
                    marginRight: "10px",
                  }}
                >
                  Análisis de riesgo:
                </Typography.Title>
                <Typography.Text
                  style={{
                    ...subtitleStyleCss,
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  {riskNameState}
                </Typography.Text>
              </Col>

              <Col span={12}>
                <Typography.Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#002140",
                    marginTop: "10px",
                    marginRight: "10px",
                  }}
                >
                  Unidad a analizar:
                </Typography.Title>
                <Typography.Text
                  style={{
                    ...subtitleStyleCss,
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  {unitNameState}
                </Typography.Text>
              </Col>
            </Row>
          </Card>

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
                marginBottom: "10px",
              }}
            >
              Caso(s) reportado(s)
            </Typography.Title>

            <div className="selected-data">
              <Space>
                {allSeverityClasificationsLoading ||
                allSeverityClasificationsFetching ? (
                  <CustomSpin />
                ) : (
                  <>
                    {Array.isArray(selectedCasesState) &&
                    selectedCasesState.flat().length > 0 ? (
                      selectedCasesState.flat().map((item) => {
                        const severityClasificationName =
                          getSeverityClasificarionName(
                            item.val_cr_severityclasif_id_fk,
                            allSeverityClasificationsData
                          );
                        return (
                          <CustomPopoverNoContent
                            key={item.id}
                            titleCustomPopover={`Detalles del Caso #${item.val_cr_filingnumber}`}
                            triggerCustomPopover={"hover"}
                            overlayStyleCustomPopover={{ width: 500 }}
                            componentCustomPopover={
                              <Button
                                key={item.id}
                                size="small"
                                style={{
                                  backgroundColor:
                                    severityClasificationName ===
                                    SeverityClasificationEnum.SERIOUS_SEVERITY
                                      ? "#f5222d"
                                      : undefined,
                                  color:
                                    severityClasificationName ===
                                    SeverityClasificationEnum.SERIOUS_SEVERITY
                                      ? "#fff"
                                      : undefined,
                                  borderRadius: "16px",
                                }}
                              >
                                {`# ${item.val_cr_filingnumber}`}
                              </Button>
                            }
                            contentCustomPopover={
                              <ContentSimpleCaseDataDetails
                                selectedCasesData={item}
                                severityClasificationNameData={
                                  severityClasificationName
                                }
                              />
                            }
                          />
                        );
                      })
                    ) : (
                      <Typography.Text type="secondary">
                        No hay casos reportados
                      </Typography.Text>
                    )}
                  </>
                )}
              </Space>
            </div>
          </Card>
        </>
      )}

      <div style={{ marginTop: "16px" }}>
        <ContentControlEvaluationCollapse
          allControlEvaluationByEventAndYearData={
            allControlEvaluationByEventAndYearData
          }
          allControlEvaluationByEventAndYearFetching={
            allControlEvaluationByEventAndYearFetching
          }
          allControlEvaluationByEventAndYearLoading={
            allControlEvaluationByEventAndYearLoading
          }
        />
      </div>

      <Row gutter={24} style={{ marginTop: "16px" }}>
        <Col span={12}>
          <Card
            size="small"
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#fafafa",
                }}
              >
                <Typography.Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  Causas
                </Typography.Title>

                <div style={{ justifyContent: "end" }}>
                  <Space>
                    <CustomButton
                      typeCustomButton="primary"
                      sizeCustomButton="small"
                      styleCustomButton={{
                        backgroundColor: "#f28322",
                        borderRadius: "16px",
                      }}
                      onClickCustomButton={allRiskCausesByEventIdRefetch}
                      iconCustomButton={
                        !allRiskCausesByEventIdFetching ? (
                          <ReloadOutlined />
                        ) : (
                          <LoadingOutlined />
                        )
                      }
                      titleTooltipCustomButton="Actualizar"
                      iconPositionCustomButton={"start"}
                    />
                    <CreateRiskCauseButtonComponent
                      onRefetch={allRiskCausesByEventIdRefetch}
                      eventId={eventId}
                    />
                  </Space>
                </div>
              </div>
            }
            loading={
              allRiskCausesByEventIdLoading || allRiskCausesByEventIdFetching
            }
            style={{ width: "100%", height: "400px" }}
            styles={{
              header: {
                backgroundColor: "#002140",
                color: "#fafafa",
              },
              body: {
                overflowY: "auto",
                maxHeight: "340px",
                paddingRight: "8px",
              },
            }}
          >
            {Array.isArray(allRiskCausesByEventIdData) &&
            allRiskCausesByEventIdData.length > 0 ? (
              allRiskCausesByEventIdData.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                    padding: "8px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <p style={{ margin: 0, flex: 1, paddingRight: "16px" }}>
                    {item.ris_c_name}
                  </p>
                  <Space direction="vertical" key={item.id}>
                    <EditRiskCauseButtonComponent
                      onRefetch={allRiskCausesByEventIdRefetch}
                      dataRecord={item}
                    />
                    {deleteRiskCauseAction ? (
                      <DeleteRiskCauseButtonComponent
                        dataRecordId={item.id}
                        onRefetch={allRiskCausesByEventIdRefetch}
                      />
                    ) : null}
                  </Space>
                </div>
              ))
            ) : (
              <CustomEmpty titleCustomEmpty="No hay nada para mostrar..." />
            )}
          </Card>
        </Col>

        <Col span={12}>
          <Card
            size="small"
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#fafafa",
                }}
              >
                <Typography.Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  Controles
                </Typography.Title>

                <div style={{ justifyContent: "end" }}>
                  <Space>
                    <CustomButton
                      typeCustomButton="primary"
                      sizeCustomButton="small"
                      styleCustomButton={{
                        backgroundColor: "#f28322",
                        borderRadius: "16px",
                      }}
                      onClickCustomButton={
                        allRiskMitigationMeasuresByEventIdRefetch
                      }
                      iconCustomButton={
                        !allRiskMitigationMeasuresByEventIdFetching ? (
                          <ReloadOutlined />
                        ) : (
                          <LoadingOutlined />
                        )
                      }
                      titleTooltipCustomButton="Actualizar"
                      iconPositionCustomButton={"start"}
                    />
                    <CreateRiskMitigationMeasureButtonComponent
                      onRefetch={allRiskMitigationMeasuresByEventIdRefetch}
                      eventId={eventId}
                    />
                  </Space>
                </div>
              </div>
            }
            loading={
              allRiskMitigationMeasuresByEventIdLoading ||
              allRiskMitigationMeasuresByEventIdFetching
            }
            style={{ width: "100%", height: "400px" }}
            styles={{
              header: {
                backgroundColor: "#002140",
                color: "#fafafa",
              },
              body: {
                overflowY: "auto",
                maxHeight: "340px",
                paddingRight: "8px",
              },
            }}
          >
            {Array.isArray(allRiskMitigationMeasuresByEventIdData) &&
            allRiskMitigationMeasuresByEventIdData.length > 0 ? (
              allRiskMitigationMeasuresByEventIdData.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                    padding: "8px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <p style={{ margin: 0, flex: 1, paddingRight: "16px" }}>
                    {item.ris_m_name}
                  </p>
                  <Space direction="vertical" key={item.id}>
                    <EditRiskMitigationMeasureButtonComponent
                      onRefetch={allRiskMitigationMeasuresByEventIdRefetch}
                      dataRecord={item}
                    />
                    {deleteRiskControlsAction ? (
                      <DeleteRiskMitigationMeasureButtonComponent
                        dataRecordId={item.id}
                        onRefetch={allRiskMitigationMeasuresByEventIdRefetch}
                      />
                    ) : null}
                  </Space>
                </div>
              ))
            ) : (
              <CustomEmpty titleCustomEmpty="No hay nada para mostrar..." />
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: "16px" }}>
        <Col span={12}>
          <Card
            size="small"
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#fafafa",
                }}
              >
                <Typography.Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  Consecuencias
                </Typography.Title>
                <div style={{ justifyContent: "end" }}>
                  <Space>
                    <CustomButton
                      typeCustomButton="primary"
                      sizeCustomButton="small"
                      styleCustomButton={{
                        backgroundColor: "#f28322",
                        borderRadius: "16px",
                      }}
                      onClickCustomButton={allRiskConsequencesByEventIdRefetch}
                      iconCustomButton={
                        !allRiskConsequencesByEventIdFetching ? (
                          <ReloadOutlined />
                        ) : (
                          <LoadingOutlined />
                        )
                      }
                      titleTooltipCustomButton="Actualizar"
                      iconPositionCustomButton={"start"}
                    />
                    <CreateRiskConsequenceButtonComponent
                      onRefetch={allRiskConsequencesByEventIdRefetch}
                      eventId={eventId}
                    />
                  </Space>
                </div>
              </div>
            }
            loading={
              allRiskConsequencesByEventIdLoading ||
              allRiskConsequencesByEventIdFetching
            }
            style={{ width: "100%", height: "400px" }}
            styles={{
              header: {
                backgroundColor: "#002140",
                color: "#fafafa",
              },
              body: {
                overflowY: "auto",
                maxHeight: "340px",
                paddingRight: "8px",
              },
            }}
          >
            {Array.isArray(allRiskConsequencesByEventIdData) &&
            allRiskConsequencesByEventIdData.length > 0 ? (
              allRiskConsequencesByEventIdData.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                    padding: "8px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <p style={{ margin: 0, flex: 1, paddingRight: "16px" }}>
                    {item.ris_co_name}
                  </p>
                  <Space direction="vertical" key={item.id}>
                    <EditRiskConsequenceButtonComponent
                      onRefetch={allRiskConsequencesByEventIdRefetch}
                      dataRecord={item}
                    />
                    {deleteRiskConsequecesAction ? (
                      <DeleteRiskConsequenceButtonComponent
                        dataRecordId={item.id}
                        onRefetch={allRiskConsequencesByEventIdRefetch}
                      />
                    ) : null}
                  </Space>
                </div>
              ))
            ) : (
              <CustomEmpty titleCustomEmpty="No hay nada para mostrar..." />
            )}
          </Card>
        </Col>
      </Row>

      <CustomDrawerNoContent
        titleCustomDrawerContent="Evaluación de control"
        widthCustomDrawerContent="650px"
        openCustomDrawerState={isVisibleDrawerStarEvaluation}
        closableCustomDrawer={true}
        maskClosableCustomDrawer={true}
        handleCancelCustomDrawer={handleChangeCLoseDrawer}
        paddingBlockCustomDrawerNoContent={"1px"}
        contentCustomDrawer={
          <ContentStartvaluationForm
            allControlEvaluationByEventAndYearRefetchData={
              allControlEvaluationByEventAndYearRefetch
            }
            eventIdData={eventId}
            handleChangeCLoseDrawer={handleChangeCLoseDrawer}
          />
        }
      />
    </div>
  );
};

export default RiskAnalysisReviewContent;
