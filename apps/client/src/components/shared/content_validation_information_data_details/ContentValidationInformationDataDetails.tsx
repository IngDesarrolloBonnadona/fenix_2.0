import React from "react";

import { titleStyleCss } from "@/theme/text_styles";

import { Card, Col, Descriptions, Row } from "antd";

const ContentValidationInformationDataDetails: React.FC<{
  caseValidateData: CaseReportValidate | undefined;
}> = ({ caseValidateData }) => {
  return (
    <>
      {caseValidateData?.val_cr_characterization_id_fk && (
        <Row>
          <Col>
            <Card
              bordered={false}
              style={{
                background: "transparent",
                border: "1px solid #477bb6",
              }}
            >
              <h3
                className="title-case-data"
                style={{
                  ...titleStyleCss,
                  textAlign: "center",
                  fontSize: "17px",
                  marginBottom: "16px",
                }}
              >
                Información de la Validación
              </h3>

              <Descriptions bordered={false} layout={"vertical"} column={1}>
                <Descriptions.Item
                  labelStyle={{
                    color: "#fb9a34",
                    fontWeight: "bold",
                  }}
                  label="Caracterización del caso"
                >
                  {caseValidateData.characterizationCase?.cha_c_name}
                </Descriptions.Item>

                <Descriptions.Item
                  labelStyle={{
                    color: "#fb9a34",
                    fontWeight: "bold",
                  }}
                  label="¿Se brindó información a la familia?"
                >
                  {caseValidateData.val_cr_infoprovidedfamily ? "SI" : "NO"}
                </Descriptions.Item>

                <Descriptions.Item
                  labelStyle={{
                    color: "#fb9a34",
                    fontWeight: "bold",
                  }}
                  label="¿Requiere seguimiento clínico?"
                >
                  {caseValidateData.val_cr_clinicalfollowrequired ? "SI" : "NO"}
                </Descriptions.Item>

                <Descriptions.Item
                  labelStyle={{
                    color: "#fb9a34",
                    fontWeight: "bold",
                  }}
                  label="Observaciones"
                >
                  {caseValidateData.val_cr_observationscharacterization}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default React.memo(ContentValidationInformationDataDetails);
