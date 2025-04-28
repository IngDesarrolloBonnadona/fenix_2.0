"use client";

import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import { Card, Col, Row, Typography } from "antd";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import Content_button_back_router from "../shared/content_button_back_router/Content_button_back_router";

import dayjs from "dayjs";

import {
  useCancelCaseReportValidateMutation,
  useGetReportValidateByIdQuery,
} from "@/redux/apis/case_report_validate/caseReportValidateApi";
import { useGetReportOriginalByIdQuery } from "@/redux/apis/case_report_original/caseReportOriginalApi";
import { useGetAllReasonCancellationCasesQuery } from "@/redux/apis/reason_cancellation_case/reasonCancellationCaseApi";
import { useCreateObservationCancellationCaseMutation } from "@/redux/apis/observation_cancellation_case/observationCancellationCaseApi";

import ContentPatientDataDetails from "../shared/content_patient_data_details/ContentPatientDataDetails";
import ContentValidationInformationDataDetails from "../shared/content_validation_information_data_details/ContentValidationInformationDataDetails";
import ContentCaseDataDetails from "../shared/content_case_data_details/ContentCaseDataDetails";
import CustomModalNoContent from "../common/custom_modal_no_content/CustomModalNoContent";
import ContentConfirmCancelCase from "../shared/content_confirm_cancel_case/ContentConfirmCancelCase";
import OptionsAnalysisMyCasesAssignmentReviewButton from "./options_analysis_my_cases_assignment_review_button/OptionsAnalysisMyCasesAssignmentReviewButton";
import ContentConfirmReturnCase from "../shared/content_confirm_return_case/ContentConfirmReturnCase";
import ContentMessageSuccessfully from "../shared/content_message_successfully/ContentAssignedAnalystSuccessfully";

import {
  setmodalIsOpen,
  setSuccessFullMessage,
} from "@/redux/features/common/modal/modalSlice";

import { useGetReasonReturnCaseByRoleIdQuery } from "@/redux/apis/reason_return_case/reasonReturnCaseApi";
import { useGetRoleByNameQuery } from "@/redux/apis/role/roleApi";
import { UserRolesEnum } from "@/utils/enums/user_roles.enum";
import { useCreateObservationReturnCaseMutation } from "@/redux/apis/observation_return_case/observationReturnCaseApi";
import { useGetCaseTypeByIdQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetSeverityClasificationByIdQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";
import {
  useGetAssignedResearchByCaseIdQuery,
  useReturnCaseToAnalystMutation,
} from "@/redux/apis/report_researcher_assignment/reportResearcherAssignmentApi";
import {
  setSelectedCases,
  setSelectedCasesId,
} from "@/redux/features/case_report_validate/selectedCasesSlice";
import { setDefaultValuesClinicalResearch } from "@/redux/features/clinical_research/clinicalResearchSlice";
import { setDefaultValuesResearchInstrument } from "@/redux/features/research_instrument/researchInstrumentSlice";
import { setDefaultValuesVascularAccessInstrument } from "@/redux/features/vascular_access_research_instrument/vascularAccessResearchInstrumentSlice";
import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";

const AnalysisMyCasesAssignedReviewContent = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const routerParams = useParams<Record<string, string>>();
  const router = useRouter();
  const { Title } = Typography;

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const isModalOpenState = useAppSelector((state) => state.modal.modalIsOpen);

  const successfullMessageState = useAppSelector(
    (state) => state.modal.successfullMessage
  );

  const nameUserSessionState = useAppSelector(
    (state) => state.userSession.name
  );

  const [
    isModalConfirmCancelCaseLocalState,
    setIsModalConfirmCancelCaseLocalState,
  ] = useState(false);

  const [
    isModalConfirmReturnCaseToAnalystLocalState,
    setIsModalConfirmReturnCaseToAnalystLocalState,
  ] = useState(false);

  const [
    observationCancellationCaseLocalState,
    setObservationCancellationCaseLocalState,
  ] = useState("");
  const [
    reasonCancellationCaseIdLocalState,
    setReasonCancellationCaseIdLocalState,
  ] = useState(0);
  const [
    observationReturnToAnalystCaseLocalState,
    setObservationReturnToAnalystCaseLocalState,
  ] = useState("");
  const [
    reasonReturnCaseToAnalystIdLocalState,
    setReasonReturnCaseToAnalystIdLocalState,
  ] = useState(0);

  const [
    isSubmittingCancellationCaseLocalState,
    setIsSubmittingCancellationCaseLocalState,
  ] = useState(false);
  const [
    isSubmittingReturnCaseToAnalystCaseLocalState,
    setIsSubmittingReturnCaseToAnalystCaseLocalState,
  ] = useState(false);

  let caseValidateId = routerParams?.id;
  let userEmail = session?.user.email;

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
    isFetching: reportOriginalByIdFetching,
    isLoading: reportOriginalByIdLoading,
    error: reportOriginalByIdError,
    refetch: reportOriginalByIdRefetch,
  } = useGetReportOriginalByIdQuery(
    reportValidateByIdData?.val_cr_originalcase_id_fk!,
    {
      skip: !reportValidateByIdData?.val_cr_originalcase_id_fk,
    }
  );

  const {
    data: caseTypeByIdData,
    isFetching: caseTypeByIdDataFetching,
    isLoading: caseTypeByIdDataLoading,
    error: caseTypeByIdDataError,
    refetch: caseTypeByIdDataRefetch,
  } = useGetCaseTypeByIdQuery(reportValidateByIdData?.val_cr_casetype_id_fk!, {
    skip: !reportValidateByIdData?.val_cr_casetype_id_fk,
  });

  const {
    data: severityClasificationByIdData,
    isFetching: severityClasificationByIdDataFetching,
    isLoading: severityClasificationByIdDataLoading,
    error: severityClasificationByIdDataError,
    refetch: severityClasificationByIdDataRefetch,
  } = useGetSeverityClasificationByIdQuery(
    reportValidateByIdData?.val_cr_severityclasif_id_fk!,
    {
      skip: !reportValidateByIdData?.val_cr_severityclasif_id_fk,
    }
  );

  const {
    data: allReasonCancellationData,
    isFetching: allReasonCancellationFetching,
    isLoading: allReasonCancellationLoading,
    error: allReasonCancellationDataError,
    refetch: allReasonCancellationDataRefetch,
  } = useGetAllReasonCancellationCasesQuery(null);

  const {
    data: roleByNameData,
    isFetching: roleByNameFetching,
    isLoading: roleByNameLoading,
    error: roleByNameDataError,
    refetch: roleByNameDataRefetch,
  } = useGetRoleByNameQuery(UserRolesEnum.RESEARCHER);

  const {
    data: allReasonReturnCaseByRoleIdData,
    isFetching: allReasonReturnCaseByRoleIdFetching,
    isLoading: allReasonReturnCaseByRoleIdLoading,
    error: allReasonReturnCaseByRoleIdError,
    refetch: allReasonReturnCaseByRoleIdRefetch,
  } = useGetReasonReturnCaseByRoleIdQuery(roleByNameData?.id!, {
    skip: !roleByNameData?.id,
  });

  const {
    data: assignedResearchByCaseIdData,
    isFetching: assignedResearchByCaseIdDataFetching,
    isLoading: assignedResearchByCaseIdDataLoading,
    error: assignedResearchByCaseIdDataError,
    refetch: assignedResearchByCaseIdDataRefetch,
  } = useGetAssignedResearchByCaseIdQuery(caseValidateId || "", {
    skip: !caseValidateId,
  });

  const {
    data: userVerifyData,
    isFetching: userVerifyFetching,
    isLoading: userVerifyLoading,
    error: userVerifyError,
  } = useGetUserActiveByIdNumberQuery(Number(idNumberUserSessionState), {
    skip: !idNumberUserSessionState,
  });

  const [
    cancelCaseReportValidate,
    { isLoading: cancelCaseReportValidateDataLoading },
  ] = useCancelCaseReportValidateMutation();

  const [
    createObservationCancellationCase,
    { isLoading: createObservationCancellationCaseLoading },
  ] = useCreateObservationCancellationCaseMutation();

  const [returnCaseToAnalyst, { isLoading: returnCaseToAnalystDataLoading }] =
    useReturnCaseToAnalystMutation();

  const [
    createObservationReturnCase,
    { isLoading: createObservationReturnCaseLoading },
  ] = useCreateObservationReturnCaseMutation();

  const handleClickReturnCaseToAnalyst = async () => {
    try {
      setIsSubmittingReturnCaseToAnalystCaseLocalState(true);

      const returnCaseToAnalystResponse: any = await returnCaseToAnalyst({
        idCaseValidate: reportValidateByIdData?.id!,
        idResearcher: idNumberUserSessionState.toString(),
        userName:
          userVerifyData?.name && userVerifyData?.last_name
            ? `${userVerifyData.name} ${userVerifyData.last_name}`
            : nameUserSessionState,
        userEmail: userVerifyData?.principal_email
          ? userVerifyData?.principal_email
          : userEmail,
      });

      let isReturnCaseError = returnCaseToAnalystResponse.error;
      let isReturnCaseSuccess = returnCaseToAnalystResponse.data;

      if (isReturnCaseError) {
        const errorMessage = isReturnCaseError?.data.message;
        dispatch(
          setShowMessage({
            type: "error",
            content: errorMessage,
          })
        );
        return;
      }

      if (isReturnCaseSuccess) {
        await createObservationReturnCase({
          idUser: idNumberUserSessionState.toString(),
          idCaseValidate: reportValidateByIdData?.id!,
          newReasonReturnCase: {
            rec_o_reasonreturn_id_fk: reasonReturnCaseToAnalystIdLocalState,
            rec_o_observation: observationReturnToAnalystCaseLocalState,
          },
        });

        const successMessage = isReturnCaseSuccess?.message;
        dispatch(
          setShowMessage({
            type: "success",
            content: successMessage,
          })
        );

        router.push(`/analysis_my_cases`);
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar los datos", error);
    } finally {
      setIsSubmittingReturnCaseToAnalystCaseLocalState(false);
    }
  };

  const handleCLickCancelCase = async () => {
    try {
      setIsSubmittingCancellationCaseLocalState(true);
      const cancelResponse: any = await cancelCaseReportValidate({
        id: reportValidateByIdData?.id!,
        idUser: idNumberUserSessionState.toString(),
      });

      let isCancelError = cancelResponse.error;
      let isCancelSuccess = cancelResponse.data;

      if (isCancelError) {
        const errorMessage = isCancelError?.data.message;
        dispatch(
          setShowMessage({
            type: "error",
            content: errorMessage,
          })
        );
        return;
      }

      if (isCancelSuccess) {
        await createObservationCancellationCase({
          idUser: idNumberUserSessionState.toString(),
          idCaseValidate: reportValidateByIdData?.id!,
          newReasonCancellationCase: {
            cac_o_reasoncancellation_id_fk: reasonCancellationCaseIdLocalState,
            cac_o_observation: observationCancellationCaseLocalState,
          },
        });

        const successMessage = isCancelSuccess?.message;
        dispatch(
          setShowMessage({
            type: "success",
            content: successMessage,
          })
        );

        router.push(`/analysis_my_cases`);
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar los datos", error);
    } finally {
      setIsSubmittingCancellationCaseLocalState(false);
    }
  };

  const handleClickClinicialResearch = () => {
    dispatch(setSelectedCasesId([]));
    dispatch(setSelectedCases([]));
    dispatch(setDefaultValuesClinicalResearch());
    dispatch(setDefaultValuesResearchInstrument());
    dispatch(setDefaultValuesVascularAccessInstrument());

    dispatch(setSelectedCasesId([caseValidateId]));
    dispatch(setSelectedCases([reportValidateByIdData]));
    router.push(`/clinical_research`);
  };

  return (
    <div className="my-cases-review" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      <Row justify="center">
        <Col>
          {reportValidateByIdDataLoading ||
          reportValidateByIdDataFetching ||
          caseTypeByIdDataFetching ||
          caseTypeByIdDataLoading ||
          severityClasificationByIdDataFetching ||
          severityClasificationByIdDataLoading ||
          assignedResearchByCaseIdDataLoading ||
          assignedResearchByCaseIdDataFetching ? (
            <div style={{ marginTop: "10px" }}>
              <CustomSpin />
            </div>
          ) : (
            <>
              <div className="options-my-cases-review-button">
                <OptionsAnalysisMyCasesAssignmentReviewButton
                  handleCLickCancelCase={() =>
                    setIsModalConfirmCancelCaseLocalState(true)
                  }
                  handleClickReturnCaseToAnalyst={() =>
                    setIsModalConfirmReturnCaseToAnalystLocalState(true)
                  }
                  handleClickClinicialResearch={handleClickClinicialResearch}
                  caseTypeName={caseTypeByIdData?.cas_t_name}
                  severityClasificationName={
                    severityClasificationByIdData?.sev_c_name
                  }
                />
              </div>

              <Row gutter={24} style={{ marginBlock: "13px" }}>
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
                          Fecha ocurrencia:
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
                  </Card>
                </Col>

                {assignedResearchByCaseIdData?.res_justifications && (
                  <Col span={24} style={{ paddingTop: "13px" }}>
                    <Card
                      size="small"
                      style={{
                        width: "100%",
                        border: "1px solid #477bb6",
                        background: "#ADD8E6",
                        textAlign: "center",
                        padding: "0px 7px",
                        margin: "0px",
                      }}
                    >
                      <Col span={24}>
                        <Title
                          level={5}
                          style={{
                            color: "#002140",
                            padding: "0px",
                            margin: "0px",
                            marginTop: "5px",
                          }}
                        >
                          Justificación de reasignación:
                        </Title>
                        <Typography.Text
                          style={{
                            fontSize: "15px",
                            display: "block",
                            marginTop: "8px",
                          }}
                        >
                          {assignedResearchByCaseIdData?.res_justifications}
                        </Typography.Text>
                      </Col>
                    </Card>
                  </Col>
                )}
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

      <CustomModalNoContent
        key={"custom-modal-confirm-cancel-case"}
        widthCustomModalNoContent="25%"
        openCustomModalState={isModalConfirmCancelCaseLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalConfirmCancelCaseLocalState(false)
        }
        contentCustomModal={
          <ContentConfirmCancelCase
            observationCancellationCase={observationCancellationCaseLocalState}
            setObservationCancellationCase={
              setObservationCancellationCaseLocalState
            }
            reasonCancellationCaseId={reasonCancellationCaseIdLocalState}
            setReasonCancellationCaseId={setReasonCancellationCaseIdLocalState}
            allReasonCancellationData={allReasonCancellationData}
            onCloseModal={() => setIsModalConfirmCancelCaseLocalState(false)}
            handleCLickCancelCase={handleCLickCancelCase}
            isSubmittinCancellationCase={isSubmittingCancellationCaseLocalState}
            allReasonCancellationDataFetching={allReasonCancellationFetching}
            allReasonCancellationDataLoading={allReasonCancellationLoading}
          />
        }
      />

      <CustomModalNoContent
        key={"custom-modal-confirm-return-case-to-analyst"}
        widthCustomModalNoContent="25%"
        openCustomModalState={isModalConfirmReturnCaseToAnalystLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalConfirmReturnCaseToAnalystLocalState(false)
        }
        contentCustomModal={
          <ContentConfirmReturnCase
            textTitleConfirmReturnCase="¿Estas seguro(a) que deseas devolver el caso a analista?"
            observationReturnCase={observationReturnToAnalystCaseLocalState}
            setObservationReturnCase={
              setObservationReturnToAnalystCaseLocalState
            }
            reasonReturnCaseId={reasonReturnCaseToAnalystIdLocalState}
            setReasonReturnCaseId={setReasonReturnCaseToAnalystIdLocalState}
            isSubmittingReturnCase={
              isSubmittingReturnCaseToAnalystCaseLocalState
            }
            allReasonReturnCaseByRoleIdData={allReasonReturnCaseByRoleIdData}
            allReasonReturnCaseByRoleIdLoading={
              allReasonReturnCaseByRoleIdLoading
            }
            allReasonReturnCaseByRoleIdFetching={
              allReasonReturnCaseByRoleIdFetching
            }
            onCloseModal={() =>
              setIsModalConfirmReturnCaseToAnalystLocalState(false)
            }
            handleClickReturnCase={handleClickReturnCaseToAnalyst}
          />
        }
      />
    </div>
  );
};

export default AnalysisMyCasesAssignedReviewContent;
