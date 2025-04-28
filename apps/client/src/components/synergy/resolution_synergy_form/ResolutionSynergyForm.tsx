"use client";

import CustomButton from "@/components/common/custom_button/CustomButton";
import { Col, Form, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";

const ResolutionSynergyForm: React.FC<{
  onChangePatientContentFormData: (e: any) => void;
  patientContentFormData: string;
  onChangesPossibleFaultsFormData: (e: any) => void;
  possibleFaultsFormData: string;
  onChangeConsequencesFormData: (e: any) => void;
  consequencesFormData: string;
  onChangeClinicalManagementFormData: (e: any) => void;
  clinicalManagementFormData: string;
  onChangesWhomWasNotifiedFormData: (e: any) => void;
  whomWasNotifiedFormData: string;
  managinSynergyFormData: boolean;
  resolutionSynergyLoading: boolean;
  statusSynergy: boolean;
  showResolutionSynergyConfirmation: (e: any) => void;
}> = ({
  onChangePatientContentFormData,
  patientContentFormData,
  onChangesPossibleFaultsFormData,
  possibleFaultsFormData,
  onChangeConsequencesFormData,
  consequencesFormData,
  onChangeClinicalManagementFormData,
  clinicalManagementFormData,
  onChangesWhomWasNotifiedFormData,
  whomWasNotifiedFormData,
  managinSynergyFormData,
  resolutionSynergyLoading,
  statusSynergy,
  showResolutionSynergyConfirmation,
}) => {
  const [form] = Form.useForm();

  return (
    <div>
      <Form
        form={form}
        id="resolution-synergy-form"
        name="resolution-synergy-form"
        className="resolution-synergy-form"
        layout="vertical"
        autoComplete="off"
        initialValues={{
          "patient-content": patientContentFormData,
          "possible-faults": possibleFaultsFormData,
          "consequences-patient": consequencesFormData,
          "clinical-management": clinicalManagementFormData,
          "whom-was-notified": whomWasNotifiedFormData,
        }}
        onFinish={() => showResolutionSynergyConfirmation(true)}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Contexto del paciente"
              id="patient-content"
              className="patient-content"
              name="patient-content"
              tooltip="Quien es el paciente, antecedentes, edad, comorbilidad entre otros datos de importancia que tengan relevancia con el caso, ejemplo: Fecha de procedimiento"
              style={{
                width: "100%",
                marginTop: 0,
                marginBottom: "10px",
              }}
              rules={[
                {
                  required: true,
                  message: "¡Escribe el contexto del paciente!",
                },
              ]}
            >
              <TextArea
                rows={4}
                onChange={onChangePatientContentFormData}
                value={patientContentFormData}
                size="small"
                disabled={!managinSynergyFormData}
                style={{ width: "100%", textTransform: "uppercase" }}
                placeholder="Escribe..."
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Posibles fallas"
              id="possible-faults"
              className="possible-faults"
              name="possible-faults"
              tooltip="Causas preliminares que dieron origen al caso"
              style={{
                width: "100%",
                marginTop: 0,
                marginBottom: "10px",
              }}
              rules={[
                {
                  required: true,
                  message: "¡Escribe las posibles fallas!",
                },
              ]}
            >
              <TextArea
                rows={4}
                onChange={onChangesPossibleFaultsFormData}
                value={possibleFaultsFormData}
                size="small"
                disabled={!managinSynergyFormData}
                style={{ width: "100%", textTransform: "uppercase" }}
                placeholder="Escribe..."
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Consecuencias"
              id="consequences-patient"
              className="consequences-patient"
              name="consequences-patient"
              tooltip="Impacto en el paciente"
              style={{
                width: "100%",
                marginTop: 0,
                marginBottom: "10px",
              }}
              rules={[
                {
                  required: true,
                  message: "¡Escribe las consecuencias!",
                },
              ]}
            >
              <TextArea
                rows={4}
                onChange={onChangeConsequencesFormData}
                value={consequencesFormData}
                size="small"
                disabled={!managinSynergyFormData}
                style={{ width: "100%", textTransform: "uppercase" }}
                placeholder="Escribe..."
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Manejo clínico"
              id="clinical-management"
              className="clinical-management"
              name="clinical-management"
              tooltip="Que le están haciendo actualmente y como está la familia y si hay molestias de parte de ellos"
              style={{
                width: "100%",
                marginTop: 0,
                marginBottom: "10px",
              }}
              rules={[
                {
                  required: true,
                  message: "¡Escribe el manejo clínico!",
                },
              ]}
            >
              <TextArea
                rows={4}
                onChange={onChangeClinicalManagementFormData}
                value={clinicalManagementFormData}
                size="small"
                disabled={!managinSynergyFormData}
                style={{ width: "100%", textTransform: "uppercase" }}
                placeholder="Escribe..."
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="¿A quien se notificó?"
              id="whom-was-notified"
              className="whom-was-notified"
              name="whom-was-notified"
              tooltip="Evaluar que el personal clínico se le haya notificado por mensaje y al jefe de la especialidad"
              style={{
                width: "100%",
                marginTop: 0,
                marginBottom: "10px",
              }}
              rules={[
                {
                  required: true,
                  message: "¡Escribe a quién fue notificado!",
                },
              ]}
            >
              <TextArea
                rows={4}
                onChange={onChangesWhomWasNotifiedFormData}
                value={whomWasNotifiedFormData}
                size="small"
                disabled={!managinSynergyFormData}
                style={{ width: "100%", textTransform: "uppercase" }}
                placeholder="Escribe..."
              />
            </Form.Item>
          </Col>

          {!statusSynergy && (
            <Row
              gutter={24}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Col>
                <Form.Item style={{ width: "100%", marginBottom: "-5px" }}>
                  <CustomButton
                    classNameCustomButton="resolution-case-button"
                    idCustomButton="resolution-case-button"
                    titleCustomButton="Guardar"
                    typeCustomButton="primary"
                    htmlTypeCustomButton="submit"
                    iconCustomButton={
                      !resolutionSynergyLoading ? (
                        <FaSave />
                      ) : (
                        <LoadingOutlined />
                      )
                    }
                    onClickCustomButton={() => ({})}
                    styleCustomButton={{
                      background:
                        managinSynergyFormData && !resolutionSynergyLoading
                          ? "#002140"
                          : "#6C757D",
                      color: "#fff",
                      fontSize: "12px",
                      borderRadius: "16px",
                    }}
                    iconPositionCustomButton={"end"}
                    sizeCustomButton={"small"}
                    disabledCustomButton={
                      !managinSynergyFormData && !resolutionSynergyLoading
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default ResolutionSynergyForm;
