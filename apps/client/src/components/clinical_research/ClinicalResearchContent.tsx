"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";

import { Button, Col, Divider, Row, Space, Steps, Typography } from "antd";
import { titleStyleCss } from "@/theme/text_styles";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import Content_button_back_router from "../shared/content_button_back_router/Content_button_back_router";
import CustomButton from "../common/custom_button/CustomButton";
import CustomPopoverNoContent from "../common/custom_popover_no_content/CustomPopoverNoContent";

import SelectInstrumentContent from "../select_instrument/SelectInstrumentContent";
import ContentSimpleCaseDataDetails from "../shared/content_simple_case_data_details/ContentSimpleCaseDataDetails";

import { SeverityClasificationEnum } from "@/utils/enums/severity_clasif.enum";
import { getSeverityClasificarionName } from "@/helpers/get_severity_clasification_name/get_severity_clasification_name";

import { useGetAllSeverityClasificationsQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";

const ClinicalResearchContent: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { Title } = Typography;
  const { Step } = Steps;

  const selectedCasesState = useAppSelector(
    (state) => state.selectedCases.selectedCases
  );

  const {
    data: allSeverityClasificationsData,
    isFetching: allSeverityClasificationsFetching,
    isLoading: allSeverityClasificationsLoading,
    error: allSeverityClasificationsError,
    refetch: allSeverityClasificationsRefetch,
  } = useGetAllSeverityClasificationsQuery(null);

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  return (
    <div className="clinical-research" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      <div className="research-clinic-title">
        <Title
          level={5}
          style={{
            color: "#002140",
            marginTop: "10px",
            marginRight: "10px",
          }}
        >
          Investigación clínica
        </Title>
      </div>

      <Divider style={{ marginTop: 0, marginBottom: 0 }} />

      <div className="selected-cases-title">
        <Title
          level={5}
          style={{
            ...titleStyleCss,
            color: "#f28322",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          Caso(s) seleccionado(s)
        </Title>
      </div>

      <div className="selected-cases-data">
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

      <div style={{ width: "100%", margin: "25px auto" }}>
        <Steps current={current} labelPlacement="vertical" progressDot={true}>
          <Step title="Selecciona el instrumento"></Step>
          <Step title="Selecciona el protocolo"></Step>
          <Step title="Resumen del análisis"></Step>
          <Step title="Plan de acción"></Step>
        </Steps>
      </div>

      <div>
        {current === 0 && <SelectInstrumentContent />}
        {current === 1 && <p>Página de selección del protocolo</p>}
        {current === 2 && <p>Página de selección del resumen del análisis</p>}
        {current === 3 && <p>Página del plan de acción</p>}
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Space>
          <CustomButton
            titleCustomButton="Anterior"
            sizeCustomButton="small"
            styleCustomButton={{
              borderRadius: "16px",
            }}
            onClickCustomButton={prev}
            disabledCustomButton={current === 0}
          />

          <CustomButton
            titleCustomButton={current === 3 ? "Finalizar" : "Siguiente"}
            typeCustomButton="primary"
            sizeCustomButton="small"
            styleCustomButton={{
              borderRadius: "16px",
            }}
            onClickCustomButton={next}
            disabledCustomButton={current > 3}
          />
        </Space>
      </div>
    </div>
  );
};

export default ClinicalResearchContent;
