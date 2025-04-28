"use client";

import CustomPopoverNoContent from "@/components/common/custom_popover_no_content/CustomPopoverNoContent";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import ContentSimpleCaseDataDetails from "@/components/shared/content_simple_case_data_details/ContentSimpleCaseDataDetails";
import { getSeverityClasificarionName } from "@/helpers/get_severity_clasification_name/get_severity_clasification_name";
import { SeverityClasificationEnum } from "@/utils/enums/severity_clasif.enum";
import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";

const ContentRiskSelected: React.FC<{
  riskTitleData: string | undefined;
  controlPercentageData: number;
  materializedCasesData: CaseReportValidate[] | undefined;
  allSeverityClasificationsData: SeverityClasification[] | undefined;
  allSeverityClasificationsLoadingData: boolean;
  allSeverityClasificationsFetchingData: boolean;
}> = ({
  riskTitleData,
  controlPercentageData,
  materializedCasesData,
  allSeverityClasificationsData,
  allSeverityClasificationsLoadingData,
  allSeverityClasificationsFetchingData,
}) => {
  return (
    <div style={{ maxHeight: "600px", overflowY: "auto" }}>
      <Card
        style={{
          width: "100%",
          border: "1px solid #477bb6",
          background: "#D5E5FF",
          borderRadius: "12px",
          padding: "0px 7px",
          marginBottom: "10px",
        }}
        size="small"
      >
        <Row gutter={[16, 8]} justify="center" align="middle">
          <Col span={10} style={{ textAlign: "center" }}>
            <CustomTags
              labelCustom="Riesgo"
              colorCustom="#fd7e14"
              stylesCustom={{
                fontSize: "11px",
                fontWeight: "bold",
                padding: "4px 12px",
                borderRadius: "16px",
              }}
            />
          </Col>

          <Col span={10} style={{ textAlign: "center" }}>
            <CustomTags
              labelCustom="Casos materializados"
              colorCustom="#fd7e14"
              stylesCustom={{
                fontSize: "11px",
                fontWeight: "bold",
                padding: "4px 12px",
                borderRadius: "16px",
              }}
            />
          </Col>

          <Col span={4} style={{ textAlign: "center" }}>
            <CustomTags
              labelCustom="Control de cumplimiento"
              colorCustom="#fd7e14"
              stylesCustom={{
                fontSize: "11px",
                fontWeight: "bold",
                padding: "4px 12px",
                borderRadius: "16px",
              }}
            />
          </Col>
        </Row>

        <Row
          gutter={[16, 8]}
          justify="center"
          align="middle"
          style={{ marginTop: "8px" }}
        >
          <Col span={10} style={{ textAlign: "center" }}>
            <span>{riskTitleData || "-"}</span>
          </Col>

          <Col span={10} style={{ textAlign: "center" }}>
            {allSeverityClasificationsLoadingData ||
            allSeverityClasificationsFetchingData ? (
              <CustomSpin />
            ) : (
              <>
                <div style={{ maxHeight: "70px", overflowY: "auto" }}>
                  {Array.isArray(materializedCasesData) &&
                  materializedCasesData.flat().length > 0 ? (
                    materializedCasesData.flat().map((item) => {
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
                </div>
              </>
            )}
          </Col>

          <Col span={4} style={{ textAlign: "center" }}>
            <span>{`${controlPercentageData}%`}</span>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ContentRiskSelected;
