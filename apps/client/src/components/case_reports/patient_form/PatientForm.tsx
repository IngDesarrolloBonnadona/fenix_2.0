"use client";

import React from "react";

import { Card, Col, Form, Input, Row, Select, Typography } from "antd";

import { IdcardOutlined, LoadingOutlined } from "@ant-design/icons";
import { BsFillFileMedicalFill, BsGenderAmbiguous } from "react-icons/bs";
import { FaMagnifyingGlass, FaRegBuilding } from "react-icons/fa6";
import { IoMedicalOutline } from "react-icons/io5";
import { MdOutlinePersonalInjury } from "react-icons/md";

import CustomButton from "@/components/common/custom_button/CustomButton";
import { titleStyleCss } from "@/theme/text_styles";

interface PatientForm {
  isAdverseEvent: boolean;
  patientDataLoading: boolean;
  identificationPatientLocalState: string;
  setIdentificationPatientLocalState: (value: string) => void;
  identificationTypePatientLocalState: string | null;
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
  setConsecutivePatientLocalState: (value: number) => void;
  folioPatientLocalState: string;
  setFolioPatientLocalState: (value: string) => void;
  handleClickFindPatientData: () => void;
  handleChangeConsecutive: (value: number) => void;
  findAdmissionsPatientDataLocalState: any[];
  findFolioAvailablePatientDataLocalState: any[];
  allDocumentTypeData: DocumentType[] | undefined;
  allDocumentTypeDataLoading: boolean;
  allDocumentTypeDataFetching: boolean;
}

const PatientForm: React.FC<PatientForm> = ({
  isAdverseEvent,
  patientDataLoading,
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
  setConsecutivePatientLocalState,
  folioPatientLocalState,
  setFolioPatientLocalState,
  handleClickFindPatientData,
  handleChangeConsecutive,
  findAdmissionsPatientDataLocalState,
  findFolioAvailablePatientDataLocalState,
  allDocumentTypeData,
  allDocumentTypeDataLoading,
  allDocumentTypeDataFetching,
}) => {
  return (
    <div>
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
            // marginBottom: "10px",
            // marginTop: "10px",
          }}
        >
          Datos del paciente
        </Typography.Title>

        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          {/* tipo identificacion paciente*/}
          <Col xs={24} sm={12} md={8} lg={5}>
            <Form.Item
              label="Tipo de identificación"
              id="identification-type-patient"
              className="identification-type-patient"
              name="identification-type-patient"
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
                placeholder="Seleccione una opción"
                onChange={(value) =>
                  setIdentificationTypePatientLocalState(value)
                }
                value={identificationTypePatientLocalState}
                size="small"
                showSearch
                allowClear
                loading={
                  allDocumentTypeDataLoading || allDocumentTypeDataFetching
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
                {Array.isArray(allDocumentTypeData) &&
                  allDocumentTypeData?.map((item: DocumentType) => (
                    <Select.Option
                      key={item.doc_t_code}
                      value={item.doc_t_code}
                    >
                      {item.doc_t_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Identificación paciente*/}
          <Col xs={24} sm={12} md={8} lg={5}>
            <Form.Item
              label="Identificación"
              id="identification-patient"
              className="identification-patient"
              name="identification-patient"
              style={{
                width: "100%",
                marginBottom: 0,
              }}
              normalize={(value) => {
                if (!value) return "";

                return value.toUpperCase().replace(/[^a-zA-Z0-9-]/g, "");
              }}
              rules={[
                {
                  required: true,
                  message: "¡Ingresa el número de identificación!",
                },
                // {
                //   pattern: /^[0-9]+$/,
                //   message:
                //     "¡Ingresa número de identificación sin puntos, ni comas!",
                // },
                {
                  min: 5,
                  message: "¡Ingresa mínimo 5 números!",
                },
              ]}
            >
              <Input
                placeholder={
                  !identificationTypePatientLocalState
                    ? "Seleccione el tipo de identificación"
                    : "Escribe..."
                }
                onChange={(e) =>
                  setIdentificationPatientLocalState(
                    e.target.value.toUpperCase()
                  )
                }
                disabled={!identificationTypePatientLocalState}
                value={identificationPatientLocalState}
                prefix={<IdcardOutlined />}
                size="small"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {identificationTypePatientLocalState &&
            identificationPatientLocalState && (
              <Col xs={24} sm={12} md={8} lg={8}>
                <Form.Item
                  style={{
                    width: "100%",
                    marginTop: "28px",
                    marginBottom: 0,
                  }}
                >
                  <CustomButton
                    classNameCustomButton="validate-existence-patient-button"
                    idCustomButton="validate-existence-patient-button"
                    shapeCustomButton="circle"
                    typeCustomButton="primary"
                    htmlTypeCustomButton="button"
                    iconCustomButton={
                      !patientDataLoading ? (
                        <FaMagnifyingGlass />
                      ) : (
                        <LoadingOutlined />
                      )
                    }
                    onClickCustomButton={handleClickFindPatientData}
                    styleCustomButton={{
                      background: "#002140",
                      color: "#fff",
                    }}
                    sizeCustomButton={"small"}
                    disabledCustomButton={!patientDataLoading ? false : true}
                  />
                </Form.Item>
              </Col>
            )}
        </Row>
      </Card>
      <Card
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          marginTop: "10px",
        }}
        bordered={false}
        size="small"
      >
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          {/* Primer nombre paciente*/}
          <Col xs={24} sm={12} md={8} lg={5}>
            <Form.Item
              label="Primer nombre:"
              id="first-name-patient"
              className="first-name-patient"
              name="first-name-patient"
              style={{
                width: "100%",
                marginBottom: 0,
              }}
            >
              <Input
                onChange={(e) => setFirstNamePatientLocalState(e.target.value)}
                value={firstNamePatientLocalState}
                prefix={<MdOutlinePersonalInjury />}
                size="small"
                disabled
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {/* Segundo nombre paciente*/}
          <Col xs={24} sm={12} md={8} lg={5}>
            <Form.Item
              label="Segundo nombre:"
              id="second-name-patient"
              className="second-name-patient"
              name="second-name-patient"
              style={{
                width: "100%",
                marginBottom: 0,
              }}
            >
              <Input
                onChange={(e) => setSecondNamePatientLocalState(e.target.value)}
                value={secondNamePatientLocalState}
                prefix={<MdOutlinePersonalInjury />}
                size="small"
                disabled
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {/* Primer apellido paciente*/}
          <Col xs={24} sm={12} md={8} lg={5}>
            <Form.Item
              label="Primer apellido:"
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

          {/* Segundo apellido paciente*/}
          <Col xs={24} sm={12} md={8} lg={5}>
            <Form.Item
              label="Segundo apellido:"
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

          {/* Edad paciente*/}
          <Col xs={24} sm={12} md={8} lg={2}>
            <Form.Item
              label="Edad:"
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

          {/* genero paciente*/}
          <Col xs={24} sm={12} md={8} lg={2}>
            <Form.Item
              label="Genero:"
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

          {/* eps paciente*/}
          <Col xs={24} sm={12} md={8} lg={5}>
            <Form.Item
              label="Empresa (EPS):"
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

          {/* codigo diagnostico */}
          <Col xs={24} sm={12} md={8} lg={4}>
            <Form.Item
              label="Código diagnóstico:"
              id="diagnostic-code-patient"
              className="diagnostic-code-patient"
              name="diagnostic-code-patient"
              style={{
                width: "100%",
                marginBottom: 0,
              }}
            >
              <Input
                onChange={(e) => setDiagnosticCodeLocalState(e.target.value)}
                value={diagnosticCodeLocalState}
                prefix={<IoMedicalOutline />}
                size="small"
                disabled
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {/* descripcion diagnostico */}
          <Col xs={24} sm={12} md={8} lg={7}>
            <Form.Item
              label="Descripción diagnóstico:"
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
                prefix={<BsFillFileMedicalFill />}
                size="small"
                disabled
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {/* consecutivo paciente */}
          <Col xs={24} sm={12} md={8} lg={4}>
            <Form.Item
              label={isAdverseEvent ? "Cons. de ingreso" : "consecutivo"}
              id="consecutive-patient"
              className="consecutive-patient"
              name="consecutive-patient"
              rules={[
                {
                  required: isAdverseEvent ? true : false,
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
                  !identificationPatientLocalState
                    ? "Escribe la identificación del paciente"
                    : "Seleccione una opción"
                }
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
          <Col xs={24} sm={12} md={8} lg={4}>
            <Form.Item
              label={isAdverseEvent ? "Folio del evento" : "folio"}
              id="folio-patient"
              className="folio-patient"
              name="folio-patient"
              rules={[
                {
                  required: isAdverseEvent ? true : false,
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
                {Array.isArray(findFolioAvailablePatientDataLocalState) &&
                  findFolioAvailablePatientDataLocalState?.map((folio: any) => (
                    <Select.Option key={folio} value={folio}>
                      {folio}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PatientForm;
