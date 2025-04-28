import React from "react";

import { titleStyleCss } from "@/theme/text_styles";

import { Card, Col, Descriptions, Row } from "antd";

const ContentPatientDataDetails: React.FC<{
  caseValidateData: CaseReportValidate | undefined;
}> = ({ caseValidateData }) => {
  return (
    <>
      {caseValidateData?.val_cr_associatedpatient && (
        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <Card
              bordered={false}
              style={{
                background: "transparent",
                border: "1px solid #477bb6",
              }}
            >
              <h3
                className="title-patient-data"
                style={{
                  ...titleStyleCss,
                  textAlign: "center",
                  fontSize: "17px",
                  marginBottom: "16px",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                Datos del paciente
              </h3>

              <Descriptions layout={"vertical"} column={1}>
                <Descriptions.Item
                  labelStyle={{
                    color: "#fb9a34",
                    fontWeight: "bold",
                  }}
                  label="Identificación"
                >
                  {caseValidateData.val_cr_doctypepatient}-
                  {caseValidateData.val_cr_documentpatient}
                </Descriptions.Item>

                <Descriptions.Item
                  labelStyle={{
                    color: "#fb9a34",
                    fontWeight: "bold",
                  }}
                  label="Nombres y Apellidos"
                >
                  {caseValidateData.val_cr_firstnamepatient}{" "}
                  {caseValidateData.val_cr_secondnamepatient}{" "}
                  {caseValidateData.val_cr_firstlastnamepatient}{" "}
                  {caseValidateData.val_cr_secondlastnamepatient}
                </Descriptions.Item>

                <Descriptions.Item
                  labelStyle={{
                    color: "#fb9a34",
                    fontWeight: "bold",
                  }}
                  label="Edad"
                >
                  {caseValidateData.val_cr_agepatient}
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={{
                    color: "#fb9a34",
                    fontWeight: "bold",
                  }}
                  label="Sexo"
                >
                  {caseValidateData.val_cr_genderpatient}
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={{
                    color: "#fb9a34",
                    fontWeight: "bold",
                  }}
                  label="Contrato"
                >
                  {caseValidateData.val_cr_epspatient}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default React.memo(ContentPatientDataDetails);
