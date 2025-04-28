"use client";

import React from "react";

import {
  Alert,
  Col,
  Descriptions,
  Form,
  Progress,
  Row,
  Select,
  Switch,
  Table,
  Typography,
} from "antd";

import { titleStyleCss } from "@/theme/text_styles";

import { FaCheck } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import { BsFillSendFill } from "react-icons/bs";
import { LoadingOutlined } from "@ant-design/icons";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSimpleTable from "@/components/common/custom_simple_table/CustomSimpleTable";

import TableColumnsProbabilityOcurrence from "../table_colums_probability_ocurrence/TableColumnsProbabilityOcurrence";
import TableColumnsImpact from "../table_columns_impact/TableColumnsImpact";
import { getAlertTypeRiskLevel } from "../helpers/get_risk_level_probability_by_impact";

const ContentStartEvaluationFormData: React.FC<{
  probabilityOcurrenceIdFormData: number;
  impactIdFormData: number;
  yearFormData: number;
  quarterFormData: number;
  riskLevelFormData: {
    name: string;
    color: string;
  } | null;
  progressScoreComplianceFormData: number;
  nextAvailableQuarterId: number | null;
  createdRiskControlEvaluationLoadingFormData: boolean;
  allProbabilityOcurrencesDataFormData: ProbabilityOcurrence[] | undefined;
  allImpactsDataFormData: Impact[] | undefined;
  allQuarterYearsDataFormData: QuarterYear[] | undefined;
  allScoreComplianceControlDataFormData: ScoreComplianceControl[] | undefined;
  setProbabilityOcurrenceIdFormData: (value: number) => void;
  setImpactIdFormData: (value: number) => void;
  setYearFormData: (value: number) => void;
  setQuarterFormData: (value: number) => void;
  handleSwitchChangeFormData: (checked: boolean, switchName: string) => void;
  handleClickSubmitFormData: () => void;
}> = ({
  probabilityOcurrenceIdFormData,
  impactIdFormData,
  yearFormData,
  quarterFormData,
  riskLevelFormData,
  progressScoreComplianceFormData,
  nextAvailableQuarterId,
  createdRiskControlEvaluationLoadingFormData,
  allProbabilityOcurrencesDataFormData,
  allImpactsDataFormData,
  allQuarterYearsDataFormData,
  allScoreComplianceControlDataFormData,
  setProbabilityOcurrenceIdFormData,
  setImpactIdFormData,
  setYearFormData,
  setQuarterFormData,
  handleSwitchChangeFormData,
  handleClickSubmitFormData,
}) => {
  const [form] = Form.useForm();

  return (
    <>
      <Form
        form={form}
        id="do-control-evaluation-form"
        name="do-control-evaluation-form"
        className="do-control-evaluation-form"
        layout="vertical"
        initialValues={{ remember: false }}
        autoComplete="off"
        onFinish={handleClickSubmitFormData}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Probabilidad de ocurrencia"
              id="probability-occurrence-id"
              className="probability-occurrence-id"
              name="probability-occurrence-id"
              rules={[
                {
                  required: true,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
              tooltip={{
                title: (
                  <div style={{ fontSize: "12px" }}>
                    <CustomSimpleTable
                      columnsCustomTable={TableColumnsProbabilityOcurrence()}
                      loading={false}
                      dataCustomTable={
                        allProbabilityOcurrencesDataFormData?.map((item) => ({
                          ...item,
                          key: item.id,
                        })) || []
                      }
                    />
                  </div>
                ),
                overlayStyle: { maxWidth: "1000px" },
              }}
              style={{ marginBottom: 0 }}
            >
              <Select
                placeholder={"Seleccione una opción"}
                size="small"
                onChange={(value) => setProbabilityOcurrenceIdFormData(value)}
                value={probabilityOcurrenceIdFormData}
                loading={false}
                style={{ width: "100%" }}
              >
                {Array.isArray(allProbabilityOcurrencesDataFormData) &&
                  allProbabilityOcurrencesDataFormData.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {`${item.prob_o_level} - ${item.prob_o_name}`}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Impacto"
              id="impact-id"
              className="impact-id"
              name="impact-id"
              rules={[
                {
                  required: true,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
              tooltip={{
                title: (
                  <CustomSimpleTable
                    columnsCustomTable={TableColumnsImpact()}
                    loading={false}
                    dataCustomTable={
                      allImpactsDataFormData?.map((item) => ({
                        ...item,
                        key: item.id,
                      })) || []
                    }
                  />
                ),
                overlayStyle: { maxWidth: "100%", maxHeight: "100%" },
              }}
              style={{ marginBottom: 0 }}
            >
              <Select
                placeholder={"Seleccione una opción"}
                size="small"
                onChange={(value) => setImpactIdFormData(value)}
                value={impactIdFormData}
                loading={false}
                style={{ width: "100%" }}
              >
                {Array.isArray(allImpactsDataFormData) &&
                  allImpactsDataFormData.map((item) => (
                    <Select.Option
                      key={item.id}
                      value={item.id}
                    >{`${item.imp_level} - ${item.imp_name}`}</Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {riskLevelFormData && (
          <Alert
            message={`Nivel de riesgo: ${riskLevelFormData.name} `}
            type={getAlertTypeRiskLevel(riskLevelFormData.name)}
            showIcon
            style={{ marginTop: "4px", marginBottom: "4px" }}
          />
        )}

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="año"
              id="year"
              className="year"
              name="year"
              rules={[
                {
                  required: true,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
            >
              <Select
                placeholder={"Seleccione una opción"}
                size="small"
                onChange={(value) => {
                  setYearFormData(value);
                  setQuarterFormData(0);

                  form.setFieldsValue({ quarter: undefined });
                }}
                value={yearFormData}
                loading={false}
                style={{ width: "100%" }}
              >
                {Array.from(
                  { length: 2 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <Select.Option key={year} value={year}>
                    {year}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Trimestre"
              id="quarter"
              className="quarter"
              name="quarter"
              rules={[
                {
                  required: true,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
            >
              <Select
                placeholder={
                  !yearFormData ? "Seleccione el año" : "Seleccione una opción"
                }
                size="small"
                onChange={(value) => setQuarterFormData(value)}
                value={quarterFormData}
                loading={false}
                style={{ width: "100%" }}
                disabled={yearFormData === 0 || yearFormData === undefined}
              >
                {Array.isArray(allQuarterYearsDataFormData) &&
                  allQuarterYearsDataFormData.map((item) => (
                    <Select.Option
                      key={item.id}
                      value={item.id}
                      disabled={item.id !== nextAvailableQuarterId}
                    >
                      {item.qua_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          {allScoreComplianceControlDataFormData?.map((item) => (
            <Col span={12} key={item.id}>
              <Form.Item
                key={item.id}
                label={item.sco_name}
                name={item.sco_name}
              >
                <Switch
                  onChange={(checked) =>
                    handleSwitchChangeFormData(checked, item.sco_name)
                  }
                  checkedChildren={<FaCheck />}
                  unCheckedChildren={<TfiClose />}
                />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Typography.Title
              level={5}
              style={{
                ...titleStyleCss,
                color: "#f28322",
              }}
            >
              Puntaje cumplimiento control:
            </Typography.Title>

            <Progress
              percent={progressScoreComplianceFormData}
              percentPosition={{ align: "center", type: "outer" }}
              // size={[200, 20]}
            />
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Form.Item>
                <CustomButton
                  classNameCustomButton="end-evaluation-button"
                  idCustomButton="end-evaluation-button"
                  titleCustomButton="Finalizar evaluación"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdRiskControlEvaluationLoadingFormData ? (
                      <BsFillSendFill />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    !createdRiskControlEvaluationLoadingFormData ? false : true
                  }
                  onClickCustomButton={() => ({})}
                  styleCustomButton={{
                    background: !createdRiskControlEvaluationLoadingFormData
                      ? "#002140"
                      : "#6C757D",
                    color: "#fff",
                    fontSize: "12px",
                    borderRadius: "16px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  iconPositionCustomButton={"end"}
                  sizeCustomButton={"small"}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ContentStartEvaluationFormData;
