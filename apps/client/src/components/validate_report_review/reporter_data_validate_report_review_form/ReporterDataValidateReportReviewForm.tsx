import React from "react";

import {
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";

import { IdcardOutlined, UserOutlined } from "@ant-design/icons";
import CustomDatePickerUpdate from "@/components/common/custom_date_picker_update/CustomDatePickerUpdate";
import { validateRequiredDate } from "@/helpers/validate_required_values/validate_required_files";
import dayjs from "dayjs";
import { titleStyleCss } from "@/theme/text_styles";

const ReporterDataValidateReportReviewForm: React.FC<{
  form: FormInstance<any>;
  originIdLocalState: number;
  setOriginIdLocalState: (value: number) => void;
  subOriginIdLocalState: number;
  setSubOriginIdLocalState: (value: number) => void;
  originServiceIdLocalState: number;
  setOriginServiceIdLocalState: (value: number) => void;
  isAnonymousReporterLocalState: boolean;
  setIsAnonymousReporterLocalState: (value: boolean) => void;
  reportingServiceIdLocalState: number;
  setReportingServiceIdLocalState: (value: number) => void;
  identificationUserLocalState: string;
  setIdentificationUserLocalState: (value: string) => void;
  fullNameUserLocalState: string;
  setFullNameUserLocalState: (value: string) => void;
  allOriginsData: Origin[] | undefined;
  allSubOriginsByOriginIdData: SubOrigin[] | undefined;
  allServicesData: Service[] | undefined;
  allOriginsDataLoading: boolean;
  allOriginsDataFetching: boolean;
  allSubOriginsByOriginIdDataLoading: boolean;
  allSubOriginsByOriginIdDataFetching: boolean;
  allServicesDataLoading: boolean;
  allServicesDataFetching: boolean;
  dateCaseLocalState: string;
  onChangeDateCase: (date: dayjs.Dayjs, dateString: string | string[]) => void;
  handleChangeService: (value: number) => void;
}> = ({
  form,
  originIdLocalState,
  setOriginIdLocalState,
  subOriginIdLocalState,
  setSubOriginIdLocalState,
  originServiceIdLocalState,
  setOriginServiceIdLocalState,
  isAnonymousReporterLocalState,
  setIsAnonymousReporterLocalState,
  reportingServiceIdLocalState,
  setReportingServiceIdLocalState,
  identificationUserLocalState,
  setIdentificationUserLocalState,
  fullNameUserLocalState,
  setFullNameUserLocalState,
  allOriginsData,
  allSubOriginsByOriginIdData,
  allServicesData,
  allOriginsDataLoading,
  allOriginsDataFetching,
  allServicesDataFetching,
  allServicesDataLoading,
  allSubOriginsByOriginIdDataLoading,
  allSubOriginsByOriginIdDataFetching,
  dateCaseLocalState,
  onChangeDateCase,
  handleChangeService,
}) => {
  const { Title } = Typography;
  return (
    <>
      <div>
        <Title
          level={5}
          style={{
            ...titleStyleCss,
            color: "#f28322",
            marginBottom: 0,
          }}
        >
          Datos del reportante
        </Title>
      </div>
      <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
      <div>
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col>
            <Form.Item
              label="Fuente"
              id="origin-id"
              className="origin-id"
              name="origin-id"
              rules={[
                {
                  required: true,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
              style={{
                minWidth: "200px",
                marginBottom: 0,
              }}
            >
              <Select
                placeholder="Seleccione una opción"
                onChange={(value) => {
                  setOriginIdLocalState(value);
                  setSubOriginIdLocalState(0);

                  form.setFieldsValue({ "sub-origin-id": undefined });
                  form.validateFields(["sub-origin-id"]);
                }}
                value={originIdLocalState}
                allowClear
                size="small"
                loading={allOriginsDataLoading || allOriginsDataFetching}
                style={{ width: "100%" }}
              >
                {Array.isArray(allOriginsData) &&
                  allOriginsData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.orig_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Sub fuente"
              id="sub-origin-id"
              className="sub-origin-id"
              name="sub-origin-id"
              rules={[
                {
                  required: true,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
              style={{
                minWidth: "200px",
                marginBottom: 0,
              }}
            >
              <Select
                placeholder={
                  !originIdLocalState
                    ? "Seleccione primero la fuente"
                    : "Seleccione una opción"
                }
                onChange={(value) => setSubOriginIdLocalState(value)}
                value={subOriginIdLocalState || undefined}
                allowClear
                size="small"
                disabled={
                  originIdLocalState === 0 || originIdLocalState === undefined
                }
                loading={
                  allSubOriginsByOriginIdDataLoading ||
                  allSubOriginsByOriginIdDataFetching
                }
                style={{ width: "100%" }}
              >
                {Array.isArray(allSubOriginsByOriginIdData) &&
                  allSubOriginsByOriginIdData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.sub_o_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "100%", marginTop: "10px" }}>
          {!isAnonymousReporterLocalState && (
            <>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Form.Item
                  label="Identificación"
                  id="identification-user"
                  className="identification-user"
                  name="identification-user"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) =>
                      setIdentificationUserLocalState(e.target.value)
                    }
                    value={identificationUserLocalState}
                    prefix={<IdcardOutlined />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={5}>
                <Form.Item
                  label="Nombre Completo:"
                  id="full-name-user"
                  className="full-name-user"
                  name="full-name-user"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) => setFullNameUserLocalState(e.target.value)}
                    value={fullNameUserLocalState}
                    prefix={<UserOutlined />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </>
          )}

          <Col xs={24} sm={12} md={8} lg={3}>
            <Form.Item
              label="Fecha"
              id="date-case"
              className="date-case"
              name="date-case"
              rules={[
                {
                  required: true,
                  validator: validateRequiredDate(
                    dateCaseLocalState,
                    "¡Seleccione una fecha!"
                  ),
                },
              ]}
              style={{
                width: "100%",
                marginBottom: 0,
              }}
            >
              <CustomDatePickerUpdate
                onChangeDateCustomDatePicker={onChangeDateCase}
                value={dateCaseLocalState}
              />
            </Form.Item>
          </Col>

          {/* Servicio de ocurrencia */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Servicio de ocurrencia"
              id="origin-service-id"
              className="origin-service-id"
              name="origin-service-id"
              rules={[
                {
                  required: true,
                  message: "¡Seleccione una opción!",
                },
              ]}
              style={{
                width: "100%",
                marginBottom: 0,
              }}
            >
              <Select
                placeholder={"Seleccione una opción"}
                onChange={(value) => setOriginServiceIdLocalState(value)}
                value={originServiceIdLocalState}
                showSearch
                allowClear
                size="small"
                loading={allServicesDataLoading || allServicesDataFetching}
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
                {Array.isArray(allServicesData) &&
                  allServicesData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.serv_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Servicio que reporta */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Servicio que reporta"
              id="reporting-service-id"
              className="reporting-service-id"
              name="reporting-service-id"
              rules={[
                {
                  required: true,
                  message: "¡Seleccione una opción!",
                },
              ]}
              style={{
                width: "100%",
                marginBottom: 0,
              }}
            >
              <Select
                placeholder={"Seleccione una opción"}
                onChange={handleChangeService}
                value={reportingServiceIdLocalState}
                showSearch
                allowClear
                size="small"
                loading={allServicesDataLoading || allServicesDataFetching}
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
                {Array.isArray(allServicesData) &&
                  allServicesData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.serv_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ReporterDataValidateReportReviewForm;
