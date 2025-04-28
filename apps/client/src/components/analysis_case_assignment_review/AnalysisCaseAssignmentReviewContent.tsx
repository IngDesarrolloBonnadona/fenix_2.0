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
import OptionsAnalysisCaseAssignmentReviewButton from "./options_analysis_case_assignment_review_button/OptionsCaseAssignmentReviewButton";
import CustomModalNoContent from "../common/custom_modal_no_content/CustomModalNoContent";
import ContentConfirmCancelCase from "../shared/content_confirm_cancel_case/ContentConfirmCancelCase";
import ContentAssignResearcher from "./content_assign_researcher/ContentAssignResearcher";
import {
  setmodalIsOpen,
  setSuccessFullMessage,
} from "@/redux/features/common/modal/modalSlice";
import ContentMessageSuccessfully from "../shared/content_message_successfully/ContentAssignedAnalystSuccessfully";
import ContentReturnBetweenAnalyst from "./content_return_between_analyst/ContentReturnBetweenAnalyst";
import ContentReassignResearcher from "./content_reassign_researcher/ContentReassignResearcher";
import ContentConfirmReturnCase from "../shared/content_confirm_return_case/ContentConfirmReturnCase";

import { useGetReasonReturnCaseByRoleIdQuery } from "@/redux/apis/reason_return_case/reasonReturnCaseApi";
import { useGetRoleByNameQuery } from "@/redux/apis/role/roleApi";
import { UserRolesEnum } from "@/utils/enums/user_roles.enum";
import {
  useCreateObservationReturnCaseMutation,
  useGetObservationReturnByCaseValidateIdQuery,
} from "@/redux/apis/observation_return_case/observationReturnCaseApi";
import {
  useGetAssignedAnalystByCaseIdQuery,
  useReturnCaseToValidatorMutation,
} from "@/redux/apis/report_analyst_assignment/reportAnalystAssignmentApi";
import { useGetCaseTypeByIdQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetSeverityClasificationByIdQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";
import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";

const AnalysisCaseAssignmentReviewContent = () => {
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

  const [isModalAssignResearchLocalState, setIsModalAssignResearchLocalState] =
    useState(false);
  const [
    isModalReassignResearchLocalState,
    setIsModalReassignResearchLocalState,
  ] = useState(false);
  const [
    isModalReturnBetweenAnalystLocalState,
    setIsModalReturnBetweenAnalystLocalState,
  ] = useState(false);
  const [
    isModalConfirmCancelCaseLocalState,
    setIsModalConfirmCancelCaseLocalState,
  ] = useState(false);
  const [
    isModalConfirmReturnCaseToValidatorLocalState,
    setIsModalConfirmReturnCaseToValidatorLocalState,
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
    observationReturnToValidatorCaseLocalState,
    setObservationReturnToValidatorCaseLocalState,
  ] = useState("");
  const [
    reasonReturnCaseToValidatorIdLocalState,
    setReasonReturnCaseToValidatorIdLocalState,
  ] = useState(0);

  const [
    isSubmittingCancellationCaseLocalState,
    setIsSubmittingCancellationCaseLocalState,
  ] = useState(false);
  const [
    isSubmittingReturnCaseToValidatorCaseLocalState,
    setIsSubmittingReturnCaseToValidatorCaseLocalState,
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
  } = useGetRoleByNameQuery(UserRolesEnum.ANALYST);

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
    data: assignedByCaseIdData,
    isFetching: assignedByCaseIdDataFetching,
    isLoading: assignedByCaseIdDataLoading,
    error: assignedByCaseIdDataError,
    refetch: assignedByCaseIdDataRefetch,
  } = useGetAssignedAnalystByCaseIdQuery(caseValidateId || "", {
    skip: !caseValidateId,
  });

  const {
    data: observationReturnByCaseValidateIdData,
    isFetching: observationReturnByCaseValidateIdFetching,
    isLoading: observationReturnByCaseValidateIdLoading,
    error: observationReturnByCaseValidateIdError,
    refetch: observationReturnByCaseValidateIdRefetch,
  } = useGetObservationReturnByCaseValidateIdQuery(caseValidateId!, {
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

  const [
    returnCaseToValidator,
    { isLoading: returnCaseToValidatorDataLoading },
  ] = useReturnCaseToValidatorMutation();

  const [
    createObservationReturnCase,
    { isLoading: createObservationReturnCaseLoading },
  ] = useCreateObservationReturnCaseMutation();

  useEffect(() => {
    observationReturnByCaseValidateIdRefetch();
  }, [caseValidateId]);

  const handleClickReturnCaseToValidator = async () => {
    try {
      setIsSubmittingReturnCaseToValidatorCaseLocalState(true);

      const returnCaseToValidatorResponse: any = await returnCaseToValidator({
        idCaseValidate: reportValidateByIdData?.id!,
        idAnalyst: idNumberUserSessionState.toString(),
        userName:
          userVerifyData?.name && userVerifyData?.last_name
            ? `${userVerifyData.name} ${userVerifyData.last_name}`
            : nameUserSessionState,
        userEmail: userVerifyData?.principal_email
          ? userVerifyData?.principal_email
          : userEmail,
      });

      let isReturnCaseError = returnCaseToValidatorResponse.error;
      let isReturnCaseSuccess = returnCaseToValidatorResponse.data;

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
            rec_o_reasonreturn_id_fk: reasonReturnCaseToValidatorIdLocalState,
            rec_o_observation: observationReturnToValidatorCaseLocalState,
          },
        });

        const successMessage = isReturnCaseSuccess?.message;
        dispatch(
          setShowMessage({
            type: "success",
            content: successMessage,
          })
        );
        router.push(`/analysis_case_assignment`);
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar los datos", error);
    } finally {
      setIsSubmittingReturnCaseToValidatorCaseLocalState(false);
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

        router.push(`/analysis_case_assignment`);
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar los datos", error);
    } finally {
      setIsSubmittingCancellationCaseLocalState(false);
    }
  };

  const handleClickCLoseModalSuccesfull = () => {
    router.push(`/analysis_case_assignment`);
    dispatch(setmodalIsOpen(false));
    dispatch(setSuccessFullMessage(""));
  };

  return (
    <div className="case-assignment-review" style={{ padding: "16px" }}>
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
          assignedByCaseIdDataLoading ||
          assignedByCaseIdDataFetching ||
          observationReturnByCaseValidateIdLoading ||
          observationReturnByCaseValidateIdFetching ? (
            <div style={{ marginTop: "10px" }}>
              <CustomSpin />
            </div>
          ) : (
            <>
              <div className="options-case-assignment-review-button">
                <OptionsAnalysisCaseAssignmentReviewButton
                  handleCLickCancelCase={() =>
                    setIsModalConfirmCancelCaseLocalState(true)
                  }
                  handleClickAssignResearch={() =>
                    setIsModalAssignResearchLocalState(true)
                  }
                  handleClickReassignResearch={() =>
                    setIsModalReassignResearchLocalState(true)
                  }
                  handleClickReturnBetwenAnalyst={() =>
                    setIsModalReturnBetweenAnalystLocalState(true)
                  }
                  handleClickReturnCaseToValidator={() =>
                    setIsModalConfirmReturnCaseToValidatorLocalState(true)
                  }
                  reportResearcherAssignment={
                    reportValidateByIdData?.reportResearcherAssignment
                  }
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

                {assignedByCaseIdData?.ana_justifications && (
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
                          {assignedByCaseIdData?.ana_justifications}
                        </Typography.Text>
                      </Col>
                    </Card>
                  </Col>
                )}

                {observationReturnByCaseValidateIdData &&
                  !observationReturnByCaseValidateIdError && (
                    <Col span={24} style={{ paddingTop: "13px" }}>
                      <Card
                        size="small"
                        style={{
                          width: "100%",
                          border: "1px solid #903301",
                          background: "#90330113",
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
                            Justificación de devolución:
                          </Title>
                          <Typography.Text
                            style={{
                              fontSize: "15px",
                              display: "block",
                              marginTop: "8px",
                            }}
                          >
                            <strong>Causa:</strong> {""}
                            {
                              observationReturnByCaseValidateIdData
                                ?.reasonReturnCase?.rec_r_cause
                            }
                          </Typography.Text>
                          <Typography.Text
                            style={{
                              fontSize: "15px",
                              display: "block",
                              marginTop: "8px",
                            }}
                          >
                            <strong>Observación:</strong>{" "}
                            {
                              observationReturnByCaseValidateIdData?.rec_o_observation
                            }
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
        key={"custom-modal-assign-researcher"}
        widthCustomModalNoContent="50%"
        openCustomModalState={isModalAssignResearchLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalAssignResearchLocalState(false)
        }
        contentCustomModal={
          <ContentAssignResearcher
            onCloseModal={() => setIsModalAssignResearchLocalState(false)}
            caseValidateId={caseValidateId!}
          />
        }
      />

      <CustomModalNoContent
        key={"custom-modal-reassign-researcher"}
        widthCustomModalNoContent="50%"
        openCustomModalState={isModalReassignResearchLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalReassignResearchLocalState(false)
        }
        contentCustomModal={
          <ContentReassignResearcher
            onCloseModal={() => setIsModalReassignResearchLocalState(false)}
            caseValidateId={caseValidateId!}
          />
        }
      />

      <CustomModalNoContent
        key={"custom-modal-return-between-analyst"}
        widthCustomModalNoContent="50%"
        openCustomModalState={isModalReturnBetweenAnalystLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalReturnBetweenAnalystLocalState(false)
        }
        contentCustomModal={
          <ContentReturnBetweenAnalyst
            onCloseModal={() => setIsModalReturnBetweenAnalystLocalState(false)}
            caseValidateId={caseValidateId!}
          />
        }
      />

      <CustomModalNoContent
        key={"custom-modal-message-successfully"}
        widthCustomModalNoContent="35%"
        openCustomModalState={isModalOpenState}
        closableCustomModal={false}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => {
          dispatch(setmodalIsOpen(false));
          dispatch(setSuccessFullMessage(""));
        }}
        contentCustomModal={
          <ContentMessageSuccessfully
            messageData={successfullMessageState}
            handleClickCLoseModal={handleClickCLoseModalSuccesfull}
          />
        }
      />

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
        key={"custom-modal-confirm-return-case-to-validator"}
        widthCustomModalNoContent="25%"
        openCustomModalState={isModalConfirmReturnCaseToValidatorLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalConfirmReturnCaseToValidatorLocalState(false)
        }
        contentCustomModal={
          <ContentConfirmReturnCase
            textTitleConfirmReturnCase="¿Estas seguro(a) que deseas devolver el caso a validador?"
            observationReturnCase={observationReturnToValidatorCaseLocalState}
            setObservationReturnCase={
              setObservationReturnToValidatorCaseLocalState
            }
            reasonReturnCaseId={reasonReturnCaseToValidatorIdLocalState}
            setReasonReturnCaseId={setReasonReturnCaseToValidatorIdLocalState}
            isSubmittingReturnCase={
              isSubmittingReturnCaseToValidatorCaseLocalState
            }
            allReasonReturnCaseByRoleIdData={allReasonReturnCaseByRoleIdData}
            allReasonReturnCaseByRoleIdLoading={
              allReasonReturnCaseByRoleIdLoading
            }
            allReasonReturnCaseByRoleIdFetching={
              allReasonReturnCaseByRoleIdFetching
            }
            onCloseModal={() =>
              setIsModalConfirmReturnCaseToValidatorLocalState(false)
            }
            handleClickReturnCase={handleClickReturnCaseToValidator}
          />
        }
      />
    </div>
  );
};

export default AnalysisCaseAssignmentReviewContent;
