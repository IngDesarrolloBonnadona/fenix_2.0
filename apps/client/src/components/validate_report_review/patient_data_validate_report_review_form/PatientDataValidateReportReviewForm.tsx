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
import { IdcardOutlined } from "@ant-design/icons";
import { AiOutlineNumber } from "react-icons/ai";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaRegBuilding } from "react-icons/fa6";
import { IoMedicalOutline } from "react-icons/io5";

const PatientDataValidateReportReviewForm: React.FC<{
  form: FormInstance<any>;
  patientDataLoading: boolean;
  isAssociatedPatientLocalState: boolean;
  identificationPatientLocalState: string;
  setIdentificationPatientLocalState: (value: string) => void;
  identificationTypePatientLocalState: string;
  setIdentificationTypePatientLocalState: (value: string) => void;
  firstNamePatientLocalState: string;
  setFirstNamePatientLocalState: (value: string) => void;
  secondNamePatientLocalState: string;
  setSecondNamePatientLocalState: (value: string) => void;
  firstLastNamePatientLocalState: string;
  setFirstLastNamePatientLocalState: (value: string) => void;
  secondLastNamePatientLocalState: string;
  setSecondLastNamePatientLocalState: (value: string) => void;
  agePatientLocalState: string;
  setAgePatientLocalState: (value: string) => void;
  genderPatientLocalState: string;
  setGenderPatientLocalState: (value: string) => void;
  epsPatientLocalState: string;
  setEpsPatientLocalState: (value: string) => void;
  diagnosticCodeLocalState: string;
  setDiagnosticCodeLocalState: (value: string) => void;
  diagnosticDescriptionLocalState: string;
  setDiagnosticDescriptionLocalState: (value: string) => void;
  consecutivePatientLocalState: number;
  folioPatientLocalState: string;
  setFolioPatientLocalState: (value: string) => void;
  findAdmissionsPatientDataLocalState: any[];
  findAvailableFolioPatientDataLocalState: any[];
  handleChangeConsecutive: (value: number) => void;
}> = ({
  patientDataLoading,
  isAssociatedPatientLocalState,
  identificationPatientLocalState,
  setIdentificationPatientLocalState,
  identificationTypePatientLocalState,
  setIdentificationTypePatientLocalState,
  firstNamePatientLocalState,
  setFirstNamePatientLocalState,
  secondNamePatientLocalState,
  setSecondNamePatientLocalState,
  firstLastNamePatientLocalState,
  setFirstLastNamePatientLocalState,
  secondLastNamePatientLocalState,
  setSecondLastNamePatientLocalState,
  agePatientLocalState,
  setAgePatientLocalState,
  genderPatientLocalState,
  setGenderPatientLocalState,
  epsPatientLocalState,
  setEpsPatientLocalState,
  diagnosticCodeLocalState,
  setDiagnosticCodeLocalState,
  diagnosticDescriptionLocalState,
  setDiagnosticDescriptionLocalState,
  consecutivePatientLocalState,
  folioPatientLocalState,
  setFolioPatientLocalState,
  findAdmissionsPatientDataLocalState,
  findAvailableFolioPatientDataLocalState,
  handleChangeConsecutive,
}) => {
  const { Title } = Typography;
  return (
    <>
      {isAssociatedPatientLocalState && (
        <>
          <div>
            <Title
              level={5}
              style={{
                color: "#f28322",
                marginTop: "5px",
              }}
            >
              Datos del paciente
            </Title>
          </div>

          <Divider style={{ marginTop: "8px", marginBottom: "15px" }} />
          <div>
            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Form.Item
                  label="Tipo de identificación"
                  id="identification-type-patient"
                  className="identification-type-patient"
                  name="identification-type-patient"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) =>
                      setIdentificationTypePatientLocalState(e.target.value)
                    }
                    value={identificationTypePatientLocalState}
                    prefix={<IdcardOutlined />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={4}>
                <Form.Item
                  label="Identificación"
                  id="identification-patient"
                  className="identification-patient"
                  name="identification-patient"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) =>
                      setIdentificationPatientLocalState(e.target.value)
                    }
                    value={identificationPatientLocalState}
                    prefix={<AiOutlineNumber />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={4}>
                <Form.Item
                  label="Primer nombre"
                  id="first-name-patient"
                  className="first-name-patient"
                  name="first-name-patient"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) =>
                      setFirstNamePatientLocalState(e.target.value)
                    }
                    value={firstNamePatientLocalState}
                    prefix={<MdOutlinePersonalInjury />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={4}>
                <Form.Item
                  label="Segundo nombre"
                  id="second-name-patient"
                  className="second-name-patient"
                  name="second-name-patient"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) =>
                      setSecondNamePatientLocalState(e.target.value)
                    }
                    value={secondNamePatientLocalState}
                    prefix={<MdOutlinePersonalInjury />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={4}>
                <Form.Item
                  label="Primer apellido"
                  id="first-last-name-patient"
                  className="first-last-name-patient"
                  name="first-last-name-patient"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) =>
                      setFirstLastNamePatientLocalState(e.target.value)
                    }
                    value={firstLastNamePatientLocalState}
                    prefix={<MdOutlinePersonalInjury />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={4}>
                <Form.Item
                  label="Segundo apellido"
                  id="second-last-name-patient"
                  className="second-last-name-patient"
                  name="second-last-name-patient"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) =>
                      setSecondLastNamePatientLocalState(e.target.value)
                    }
                    value={secondLastNamePatientLocalState}
                    prefix={<MdOutlinePersonalInjury />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={2}>
                <Form.Item
                  label="Edad"
                  id="age-patient"
                  className="age-patient"
                  name="age-patient"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) => setAgePatientLocalState(e.target.value)}
                    value={agePatientLocalState}
                    prefix={<MdOutlinePersonalInjury />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={2}>
                <Form.Item
                  label="Genero"
                  id="gender-patient"
                  className="gender-patient"
                  name="gender-patient"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) => setGenderPatientLocalState(e.target.value)}
                    value={genderPatientLocalState}
                    prefix={<BsGenderAmbiguous />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={4}>
                <Form.Item
                  label="Empresa (EPS"
                  id="eps-patient"
                  className="eps-patient"
                  name="eps-patient"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) => setEpsPatientLocalState(e.target.value)}
                    value={epsPatientLocalState}
                    prefix={<FaRegBuilding />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={3}>
                <Form.Item
                  label="Cód. diagnóstico"
                  id="diagnostic-code-patient"
                  className="diagnostic-code-patient"
                  name="diagnostic-code-patient"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) =>
                      setDiagnosticCodeLocalState(e.target.value)
                    }
                    value={diagnosticCodeLocalState}
                    prefix={<IoMedicalOutline />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={9}>
                <Form.Item
                  label="Descripción diagnóstico"
                  id="diagnostic-description-patient"
                  className="diagnostic-description-patient"
                  name="diagnostic-description-patient"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) =>
                      setDiagnosticDescriptionLocalState(e.target.value)
                    }
                    value={diagnosticDescriptionLocalState}
                    prefix={<IoMedicalOutline />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              {/* consecutivo paciente */}
              <Col xs={24} sm={12} md={8} lg={2}>
                <Form.Item
                  label={"Consecutivo"}
                  id="consecutive-patient"
                  className="consecutive-patient"
                  name="consecutive-patient"
                  rules={[
                    {
                      required: false,
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
                    onChange={handleChangeConsecutive}
                    value={consecutivePatientLocalState}
                    size="small"
                    allowClear
                    disabled={
                      !identificationPatientLocalState ||
                      !identificationTypePatientLocalState ||
                      findAdmissionsPatientDataLocalState.length === 0
                    }
                    loading={patientDataLoading}
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
                    {Array.isArray(findAdmissionsPatientDataLocalState) &&
                      findAdmissionsPatientDataLocalState?.map((item: any) => (
                        <Select.Option
                          key={item.patAdmConsecutive}
                          value={item.patAdmConsecutive}
                        >
                          {item.patAdmConsecutive}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              {/* folio paciente */}
              <Col xs={24} sm={12} md={8} lg={2}>
                <Form.Item
                  label={"Folio"}
                  id="folio-patient"
                  className="folio-patient"
                  name="folio-patient"
                  rules={[
                    {
                      required: false,
                      message: "¡Seleccione una opción!",
                    },
                  ]}
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Select
                    placeholder={
                      !consecutivePatientLocalState
                        ? "Seleccione el consecutivo"
                        : "Seleccione una opción"
                    }
                    onChange={(value) => setFolioPatientLocalState(value)}
                    value={folioPatientLocalState}
                    size="small"
                    showSearch
                    allowClear
                    disabled={
                      consecutivePatientLocalState === 0 ||
                      consecutivePatientLocalState === undefined
                    }
                    loading={patientDataLoading}
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
                    {Array.isArray(findAvailableFolioPatientDataLocalState) &&
                      findAvailableFolioPatientDataLocalState?.map(
                        (folio: any) => (
                          <Select.Option key={folio} value={folio}>
                            {folio}
                          </Select.Option>
                        )
                      )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default PatientDataValidateReportReviewForm;
