"use client";

import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { Card, Col, Row, Typography } from "antd";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import Content_button_back_router from "../shared/content_button_back_router/Content_button_back_router";

import ContentPatientDataDetails from "../shared/content_patient_data_details/ContentPatientDataDetails";
import ContentValidationInformationDataDetails from "../shared/content_validation_information_data_details/ContentValidationInformationDataDetails";
import ContentCaseDataDetails from "../shared/content_case_data_details/ContentCaseDataDetails";

import dayjs from "dayjs";

import { useGetReportValidateByIdQuery } from "@/redux/apis/case_report_validate/caseReportValidateApi";
import { useGetReportOriginalByIdQuery } from "@/redux/apis/case_report_original/caseReportOriginalApi";
import { useGetAssignedAnalystByCaseIdQuery } from "@/redux/apis/report_analyst_assignment/reportAnalystAssignmentApi";
import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";

const SummaryReportReviewContent = () => {
  const routerParams = useParams<Record<string, string>>();
  const { Title } = Typography;

  const [fullNameValidator, setFullNameValidator] = useState("");

  let caseValidateId = routerParams?.id;

  const {
    data: reportValidateByIdData,
    isFetching: reportValidateByIdDataFetching,
    isLoading: reportValidateByIdDataLoading,
    error: reportValidateByIdDataError,
    refetch: reportValidateByIdDataRefetch,
  } = useGetReportValidateByIdQuery(caseValidateId || "", {
    skip: !caseValidateId,
  });

  const {
    data: reportOriginalByIdData,
    isFetching: reportOriginalByIdDataFetching,
    isLoading: reportOriginalByIdDataLoading,
    error: reportOriginalByIdDataError,
    refetch: reportOriginalByIdDataRefetch,
  } = useGetReportOriginalByIdQuery(
    reportValidateByIdData?.val_cr_originalcase_id_fk!,
    {
      skip: !reportValidateByIdData?.val_cr_originalcase_id_fk,
    }
  );

  const {
    data: assignedByCaseIdData,
    isFetching: assignedByCaseIdDataFetching,
    isLoading: assignedByCaseIdDataLoading,
    error: assignedByCaseIdDataError,
    refetch: assignedByCaseIdDataRefetch,
  } = useGetAssignedAnalystByCaseIdQuery(caseValidateId || "", {
    skip: !caseValidateId,
  });

  let validatorIdNumber = assignedByCaseIdData?.ana_uservalidator_id;

  const {
    data: userVerifyData,
    isFetching: userVerifyFetching,
    isLoading: userVerifyLoading,
    error: userVerifyError,
  } = useGetUserActiveByIdNumberQuery(Number(validatorIdNumber), {
    skip: !validatorIdNumber,
  });

  useEffect(() => {
    if (userVerifyData)
      setFullNameValidator(
        `${userVerifyData.name} ${userVerifyData.last_name}`
      );
  }, [userVerifyData]);

  // const handleClickDownloadSummary = () => {};

  return (
    <div className="validate-report-review" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      {/* <div className="generate-pdf-button">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24} style={{ display: "flex", justifyContent: "end" }}>
            <CustomButton
              idCustomButton="generate-pdf-button"
              typeCustomButton={"primary"}
              sizeCustomButton={"small"}
              onClickCustomButton={handleClickDownloadSummary}
              titleCustomButton={"Generar PDF"}
              iconCustomButton={<FaFilePdf />}
              styleCustomButton={{
                background: "#FF7F50",
                color: "#fff",
                fontSize: "12px",
                borderRadius: "16px",
              }}
            />
          </Col>
        </Row>
      </div> */}

      <Row justify="center">
        <Col>
          {reportValidateByIdDataLoading ||
          reportValidateByIdDataFetching ||
          assignedByCaseIdDataLoading ||
          assignedByCaseIdDataFetching ||
          userVerifyLoading ||
          userVerifyFetching ? (
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
                        <Title
                          level={5}
                          style={{
                            color: "#002140",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          Código de caso:
                        </Title>
                        <Typography.Text
                          style={{
                            fontSize: "17px",
                            padding: "0px",
                            margin: "0px",
                            fontWeight: "bold",
                          }}
                        >
                          # {reportValidateByIdData?.val_cr_filingnumber}
                        </Typography.Text>
                      </Col>

                      <Col span={8}>
                        <Title
                          level={5}
                          style={{
                            color: "#002140",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          Fecha Ocurrencia:
                        </Title>
                        <Typography.Text
                          style={{
                            fontSize: "17px",
                            padding: "0px",
                            margin: "0px",
                            fontWeight: "bold",
                          }}
                        >
                          {reportValidateByIdData?.val_cr_dateofcase}
                        </Typography.Text>
                      </Col>

                      <Col span={8}>
                        <Title
                          level={5}
                          style={{
                            color: "#002140",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          Fecha Reporte:
                        </Title>
                        <Typography.Text
                          style={{
                            fontSize: "17px",
                            padding: "0px",
                            margin: "0px",
                            fontWeight: "bold",
                          }}
                        >
                          {dayjs(
                            reportValidateByIdData?.val_cr_creationdate
                          ).format("YYYY-MM-DD")}
                        </Typography.Text>
                      </Col>
                    </Row>

                    {assignedByCaseIdData && (
                      <Row>
                        <Col span={8}>
                          <Title
                            level={5}
                            style={{
                              color: "#002140",
                              padding: "0px",
                              margin: "0px",
                              marginTop: "10px",
                            }}
                          >
                            Nombre validador:
                          </Title>
                          <Typography.Text
                            style={{
                              fontSize: "17px",
                              padding: "0px",
                              margin: "0px",
                              fontWeight: "bold",
                            }}
                          >
                            {fullNameValidator}
                          </Typography.Text>
                        </Col>
                      </Row>
                    )}
                  </Card>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <ContentPatientDataDetails
                    caseValidateData={reportValidateByIdData}
                  />

                  <ContentValidationInformationDataDetails
                    caseValidateData={reportValidateByIdData}
                  />
                </Col>

                <Col
                  span={
                    reportValidateByIdData?.val_cr_associatedpatient ||
                    reportValidateByIdData?.val_cr_characterization_id_fk
                      ? 16
                      : 24
                  }
                >
                  <ContentCaseDataDetails
                    caseValidateData={reportValidateByIdData}
                    caseOriginalData={reportOriginalByIdData}
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

export default SummaryReportReviewContent;
