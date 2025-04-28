"use client";

import React from "react";

import dayjs from "dayjs";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { Card, Col, Row, Typography } from "antd";
import ContentPatientDataDetails from "@/components/shared/content_patient_data_details/ContentPatientDataDetails";
import ContentValidationInformationDataDetails from "@/components/shared/content_validation_information_data_details/ContentValidationInformationDataDetails";
import ContentCaseDataDetails from "@/components/shared/content_case_data_details/ContentCaseDataDetails";

const ContentDetailsCase: React.FC<{
  reportValidateData: CaseReportValidate | undefined;
  reportOriginalData: CaseReportOriginal | undefined;
  reportValidateFetchingData: boolean;
  reportValidateLoadingData: boolean;
  reportOriginalFetchingData: boolean;
  reportOriginalLoadingData: boolean;
}> = ({
  reportValidateData,
  reportOriginalData,
  reportValidateFetchingData,
  reportValidateLoadingData,
  reportOriginalFetchingData,
  reportOriginalLoadingData,
}) => {
  return (
    <div className="validate-report-review" style={{ padding: "16px" }}>
      <Row justify="center">
        <Col>
          {(!reportValidateData && !reportOriginalData) ||
          reportValidateFetchingData ||
          reportValidateLoadingData ||
          reportOriginalFetchingData ||
          reportOriginalLoadingData ? (
            <CustomSpin />
          ) : (
            <>
              <Row style={{ marginBottom: "16px" }}>
                <Col span={24}>
                  <Card
                    size="small"
                    style={{
                      width: "100%",
                      border: "1px solid #477bb6",
                      background: "#D5E5FF",
                      textAlign: "center",
                      padding: "0px 7px",
                      margin: "0px",
                    }}
                  >
                    <Row>
                      <Col span={8}>
                        <Typography.Title
                          level={5}
                          style={{
                            color: "#002140",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          Código de caso:
                        </Typography.Title>
                        <Typography.Text
                          style={{
                            fontSize: "17px",
                            padding: "0px",
                            margin: "0px",
                            fontWeight: "bold",
                          }}
                        >
                          # {reportValidateData?.val_cr_filingnumber}
                        </Typography.Text>
                      </Col>

                      <Col span={8}>
                        <Typography.Title
                          level={5}
                          style={{
                            color: "#002140",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          Fecha Ocurrencia:
                        </Typography.Title>
                        <Typography.Text
                          style={{
                            fontSize: "17px",
                            padding: "0px",
                            margin: "0px",
                            fontWeight: "bold",
                          }}
                        >
                          {reportValidateData?.val_cr_dateofcase}
                        </Typography.Text>
                      </Col>

                      <Col span={8}>
                        <Typography.Title
                          level={5}
                          style={{
                            color: "#002140",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          Fecha Reporte:
                        </Typography.Title>
                        <Typography.Text
                          style={{
                            fontSize: "17px",
                            padding: "0px",
                            margin: "0px",
                            fontWeight: "bold",
                          }}
                        >
                          {dayjs(
                            reportValidateData?.val_cr_creationdate
                          ).format("YYYY-MM-DD")}
                        </Typography.Text>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <ContentPatientDataDetails
                    caseValidateData={reportValidateData}
                  />

                  <ContentValidationInformationDataDetails
                    caseValidateData={reportValidateData}
                  />
                </Col>

                <Col
                  span={
                    reportValidateData?.val_cr_associatedpatient ||
                    reportValidateData?.val_cr_characterization_id_fk
                      ? 16
                      : 24
                  }
                >
                  <ContentCaseDataDetails
                    caseValidateData={reportValidateData}
                    caseOriginalData={reportOriginalData}
                  />
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ContentDetailsCase;
