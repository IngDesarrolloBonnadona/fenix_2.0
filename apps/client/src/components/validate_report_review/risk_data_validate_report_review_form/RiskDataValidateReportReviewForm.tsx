import React from "react";

import {
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Typography,
} from "antd";

import TextArea from "antd/es/input/TextArea";

import { MdOutlineDescription } from "react-icons/md";
import { titleStyleCss } from "@/theme/text_styles";

const RiskDataValidateReportReviewForm: React.FC<{
  form: FormInstance<any>;
  reportingServiceIdLocalState: number;
  eventTypeIdLocalState: number;
  setEventTypeIdLocalState: (value: number) => void;
  eventIdLocalState: number;
  setEventIdLocalState: (value: number) => void;
  descriptionOthersLocalState: string;
  setDescriptionOthersLocalState: (value: string) => void;
  showDescriptionOthersLocalState: boolean;
  setShowDescriptionOthersLocalState: (value: boolean) => void;
  descriptionCaseLocalState: string;
  setDescriptionCaseLocalState: (value: string) => void;
  allEventTypeByCaseTypeIdDataLoading: boolean;
  allEventTypeByCaseTypeIdDataFetching: boolean;
  allEventsByEventTypeIdAndUnitIdDataLoading: boolean;
  allEventsByEventTypeIdAndUnitIdDataFetching: boolean;
  allEventTypeByCaseTypeIdData: EventType[] | undefined;
  allEventsByEventTypeIdAndUnitIdData: Events[] | undefined;
  handleChangeEvent: (value: number) => void;
}> = ({
  form,
  reportingServiceIdLocalState,
  eventTypeIdLocalState,
  setEventTypeIdLocalState,
  eventIdLocalState,
  setEventIdLocalState,
  descriptionOthersLocalState,
  setDescriptionOthersLocalState,
  showDescriptionOthersLocalState,
  setShowDescriptionOthersLocalState,
  descriptionCaseLocalState,
  setDescriptionCaseLocalState,
  allEventTypeByCaseTypeIdDataLoading,
  allEventTypeByCaseTypeIdDataFetching,
  allEventsByEventTypeIdAndUnitIdDataLoading,
  allEventsByEventTypeIdAndUnitIdDataFetching,
  allEventTypeByCaseTypeIdData,
  allEventsByEventTypeIdAndUnitIdData,
  handleChangeEvent,
}) => {
  const { Title } = Typography;
  return (
    <>
      <div>
        <Title
          level={5}
          style={{ ...titleStyleCss, color: "#f28322", marginBottom: 0 }}
        >
          Datos del caso
        </Title>
      </div>

      <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />

      <div>
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col xs={24} sm={12} md={8} lg={9}>
            <Form.Item
              label="Subsistema"
              id="event-type-id"
              className="event-type-id"
              name="event-type-id"
              rules={[
                {
                  required: true,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
              style={{ width: "100%", marginBottom: 0 }}
            >
              <Select
                placeholder={
                  !reportingServiceIdLocalState
                    ? "Seleccione primero el servicio que reporta"
                    : "Seleccione una opción"
                }
                onChange={(value) => {
                  setEventTypeIdLocalState(value);
                  setEventIdLocalState(0);
                  setDescriptionOthersLocalState("");
                  setShowDescriptionOthersLocalState(false);

                  form.setFieldsValue({
                    "event-id": undefined,
                    "description-others": undefined,
                  });
                  form.validateFields(["event-id"]);
                }}
                value={eventTypeIdLocalState}
                showSearch
                allowClear
                size="small"
                disabled={
                  reportingServiceIdLocalState === 0 ||
                  reportingServiceIdLocalState === undefined
                }
                loading={
                  allEventTypeByCaseTypeIdDataLoading ||
                  allEventTypeByCaseTypeIdDataFetching
                }
                filterOption={(input, option) => {
                  return (
                    (option?.children &&
                      option.children
                        .toString()
                        .toUpperCase()
                        .includes(input.toUpperCase())) ||
                    false
                  );
                }}
                style={{ width: "100%" }}
              >
                {Array.isArray(allEventTypeByCaseTypeIdData) &&
                  allEventTypeByCaseTypeIdData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.eve_t_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          {/* suceso */}
          <Col xs={24} sm={12} md={8} lg={9}>
            <Form.Item
              label="Riesgo"
              id="event-id"
              className="event-id"
              name="event-id"
              rules={[
                {
                  required: true,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
              style={{ width: "100%", marginBottom: 0 }}
            >
              <Select
                placeholder={
                  !eventTypeIdLocalState
                    ? "Seleccione primero el subsistema"
                    : "Seleccione una opción"
                }
                onChange={handleChangeEvent}
                value={eventIdLocalState}
                showSearch
                allowClear
                size="small"
                disabled={
                  eventTypeIdLocalState === 0 ||
                  eventTypeIdLocalState === undefined
                }
                loading={
                  allEventsByEventTypeIdAndUnitIdDataLoading ||
                  allEventsByEventTypeIdAndUnitIdDataFetching
                }
                filterOption={(input, option) => {
                  return (
                    (option?.children &&
                      option.children
                        .toString()
                        .toUpperCase()
                        .includes(input.toUpperCase())) ||
                    false
                  );
                }}
                style={{ width: "100%" }}
              >
                {Array.isArray(allEventsByEventTypeIdAndUnitIdData) &&
                  allEventsByEventTypeIdAndUnitIdData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.eve_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          {showDescriptionOthersLocalState && (
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Describe otros"
                id="description-others"
                className="description-others"
                name="description-others"
                style={{ width: "100%", marginBottom: 0 }}
                normalize={(value) => {
                  if (!value) return "";

                  const filteredValue = value
                    .toUpperCase()
                    .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                  return filteredValue;
                }}
                rules={[
                  {
                    required: true,
                    message: "¡Por favor ingresa la descripción!",
                  },
                ]}
              >
                <Input
                  onChange={(e) =>
                    setDescriptionOthersLocalState(e.target.value.toUpperCase())
                  }
                  type="text"
                  value={descriptionOthersLocalState}
                  prefix={<MdOutlineDescription />}
                  placeholder="Describe..."
                  size="small"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          )}
        </Row>

        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col xs={6} sm={8} md={12} lg={24}>
            <Form.Item
              label="Describa brevemente el riesgo (Hallazgo al examen físico, posibles consecuencias)"
              id="description-case"
              className="description-case"
              name="description-case"
              style={{
                width: "100%",
                marginTop: "10px",
                marginBottom: 0,
              }}
              rules={[
                {
                  required: true,
                  message: "Escribe la descripción del caso!",
                },
              ]}
            >
              <TextArea
                rows={4}
                onChange={(e) =>
                  setDescriptionCaseLocalState(e.target.value.toUpperCase())
                }
                value={descriptionCaseLocalState}
                style={{ width: "100%", textTransform: "uppercase" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RiskDataValidateReportReviewForm;
