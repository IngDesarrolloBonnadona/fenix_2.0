"use client";

import React from "react";

import { titleStyleCss } from "@/theme/text_styles";

import { Card, Descriptions, Image, List } from "antd";

const ContentCaseDataDetails: React.FC<{
  caseValidateData: CaseReportValidate | undefined;
  caseOriginalData: CaseReportOriginal | undefined;
}> = ({ caseValidateData, caseOriginalData }) => {
  return (
    <>
      <Card
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
          Datos del caso
        </h3>

        <Descriptions bordered={false} layout={"vertical"} column={1}>
          <Descriptions.Item
            labelStyle={{
              color: "#fb9a34",
              fontWeight: "bold",
            }}
            label="Priorización"
          >
            {caseValidateData?.priority?.prior_name}
          </Descriptions.Item>

          <Descriptions.Item
            labelStyle={{
              color: "#fb9a34",
              fontWeight: "bold",
            }}
            label="Clasificación de Severidad"
          >
            {caseValidateData?.severityClasification?.sev_c_description} (
            {caseValidateData?.severityClasification?.sev_c_name})
          </Descriptions.Item>

          <Descriptions.Item
            labelStyle={{
              color: "#fb9a34",
              fontWeight: "bold",
            }}
            label="Estrategia"
          >
            {caseValidateData?.eventType?.eve_t_name}
          </Descriptions.Item>

          <Descriptions.Item
            labelStyle={{
              color: "#fb9a34",
              fontWeight: "bold",
            }}
            label="Suceso"
          >
            {caseValidateData?.event?.eve_name}
          </Descriptions.Item>

          {caseValidateData?.val_cr_descriptionothers && (
            <Descriptions.Item
              labelStyle={{
                color: "#fb9a34",
                fontWeight: "bold",
              }}
              label="Descripción otros"
            >
              {caseValidateData?.val_cr_descriptionothers}
            </Descriptions.Item>
          )}

          {caseOriginalData?.device?.length! > 0 && (
            <Descriptions.Item
              labelStyle={{
                color: "#fb9a34",
                fontWeight: "bold",
              }}
              label="Dispositivos asociados al caso"
            >
              <List
                size="small"
                dataSource={caseOriginalData?.device}
                renderItem={(device) => (
                  <List.Item>
                    {device.dev_code}-{device.dev_name}
                  </List.Item>
                )}
              />
            </Descriptions.Item>
          )}

          {caseOriginalData?.medicine?.length! > 0 && (
            <Descriptions.Item
              labelStyle={{
                color: "#fb9a34",
                fontWeight: "bold",
              }}
              label="Medicamentos asociados al caso"
            >
              <List
                size="small"
                dataSource={caseOriginalData?.medicine}
                renderItem={(medicine) => (
                  <List.Item>
                    {medicine.med_code}-{medicine.med_name}
                  </List.Item>
                )}
              />
            </Descriptions.Item>
          )}

          <Descriptions.Item
            labelStyle={{
              color: "#fb9a34",
              fontWeight: "bold",
            }}
            label="Descripción del caso"
          >
            {caseValidateData?.val_cr_description}
          </Descriptions.Item>

          {caseValidateData?.val_cr_inmediateaction && (
            <Descriptions.Item
              labelStyle={{
                color: "#fb9a34",
                fontWeight: "bold",
              }}
              label="Acciones imediatas realizadas sobre el caso"
            >
              {caseValidateData?.val_cr_inmediateaction}
            </Descriptions.Item>
          )}

          <Descriptions.Item
            labelStyle={{
              color: "#fb9a34",
              fontWeight: "bold",
            }}
            label="Evidencias del caso"
          >
            <Image
              width={200}
              height={200}
              src="error"
              alt="Evidencia del caso"
              fallback="data:image/png;base64,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"
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default React.memo(ContentCaseDataDetails);
