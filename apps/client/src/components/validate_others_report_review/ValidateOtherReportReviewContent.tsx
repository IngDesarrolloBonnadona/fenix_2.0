"use client";

import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { Card, Col, Row, Typography } from "antd";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import Content_button_back_router from "../shared/content_button_back_router/Content_button_back_router";

import ContentPatientDataDetails from "../shared/content_patient_data_details/ContentPatientDataDetails";
import ContentValidationInformationDataDetails from "../shared/content_validation_information_data_details/ContentValidationInformationDataDetails";
import ContentCaseDataDetails from "../shared/content_case_data_details/ContentCaseDataDetails";

import dayjs from "dayjs";

import {
  useCancelCaseReportValidateMutation,
  useGetReportValidateByIdQuery,
} from "@/redux/apis/case_report_validate/caseReportValidateApi";
import { useGetReportOriginalByIdQuery } from "@/redux/apis/case_report_original/caseReportOriginalApi";
import OptionsValidateOthersReportReviewButton from "./options_validate_others_report_review_button/OptionsValidateOthersReportReviewButton";
import CustomModalNoContent from "../common/custom_modal_no_content/CustomModalNoContent";
import ContentConfirmCancelCase from "../shared/content_confirm_cancel_case/ContentConfirmCancelCase";
import {
  useCreateObservationCancellationCaseMutation,
  useGetObservationCancellationByCaseValidateIdQuery,
} from "@/redux/apis/observation_cancellation_case/observationCancellationCaseApi";
import { useGetAllReasonCancellationCasesQuery } from "@/redux/apis/reason_cancellation_case/reasonCancellationCaseApi";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";
import ContentReassignAnalyst from "./content_reassign_analyst/ContentReassignAnalyst";
import {
  setmodalIsOpen,
  setSuccessFullMessage,
} from "@/redux/features/common/modal/modalSlice";
import ContentMessageSuccessfully from "../shared/content_message_successfully/ContentAssignedAnalystSuccessfully";
import { useGetObservationReturnByCaseValidateIdQuery } from "@/redux/apis/observation_return_case/observationReturnCaseApi";

const ValidateOtherReportReviewContent = () => {
  const dispatch = useDispatch();
  const routerParams = useParams<Record<string, string>>();
  const router = useRouter();

  const { Title } = Typography;

  let caseValidateId = routerParams?.id;

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const isModalOpenState = useAppSelector((state) => state.modal.modalIsOpen);

  const successfullMessageState = useAppSelector(
    (state) => state.modal.successfullMessage
  );

  const [
    isModalReassignAnalystLocalState,
    setIsModalReassignAnalystLocalState,
  ] = useState(false);
  const [
    isModalConfirmCancelCaseLocalState,
    setIsModalConfirmCancelCaseLocalState,
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
    isSubmittinCancellationCaseLocalState,
    setIsSubmittinCancellationCaseLocalState,
  ] = useState(false);

  const {
    data: reportValidateByIdData,
    isFetching: reportValidateByIdDataFetching,
    isLoading: reportValidateByIdDataLoading,
    error: reportValidateByIdDataError,
    refetch: reportValidateByIdDataRefetch,
  } = useGetReportValidateByIdQuery(caseValidateId!, {
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
    data: observationReturnByCaseValidateIdData,
    isFetching: observationReturnByCaseValidateIdFetching,
    isLoading: observationReturnByCaseValidateIdLoading,
    error: observationReturnByCaseValidateIdError,
    refetch: observationReturnByCaseValidateIdRefetch,
  } = useGetObservationReturnByCaseValidateIdQuery(caseValidateId!, {
    skip: !caseValidateId,
  });

  const {
    data: observationCancellationByCaseValidateIdData,
    isFetching: observationCancellationByCaseValidateIdFetching,
    isLoading: observationCancellationByCaseValidateIdLoading,
    error: observationCancellationByCaseValidateIdError,
    refetch: observationCancellationByCaseValidateIdRefetch,
  } = useGetObservationCancellationByCaseValidateIdQuery(caseValidateId!, {
    skip: !caseValidateId,
  });

  const {
    data: allReasonCancellationData,
    isFetching: allReasonCancellationDataFetching,
    isLoading: allReasonCancellationDataLoading,
    error: allReasonCancellationDataError,
    refetch: allReasonCancellationDataRefetch,
  } = useGetAllReasonCancellationCasesQuery(null);

  const [
    createObservationCancellationCase,
    { isLoading: createObservationCancellationCaseLoading },
  ] = useCreateObservationCancellationCaseMutation();

  const [
    cancelCaseReportValidate,
    { isLoading: cancelCaseReportValidateDataLoading },
  ] = useCancelCaseReportValidateMutation();

  useEffect(() => {
    if (caseValidateId) {
      observationReturnByCaseValidateIdRefetch();
    }
  }, [caseValidateId]);

  const handleCLickCancelCase = async () => {
    try {
      setIsSubmittinCancellationCaseLocalState(true);
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
        router.push(`/validate_others_report`);
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
    } finally {
      setIsSubmittinCancellationCaseLocalState(false);
    }
  };

  const handleClickCLoseModalAssignedAnalystSuccesfull = () => {
    router.push(`/validate_others_report`);
    dispatch(setmodalIsOpen(false));
    dispatch(setSuccessFullMessage(""));
  };

  return (
    <div className="validate-other-report-review" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      {reportValidateByIdDataLoading ||
      reportValidateByIdDataFetching ||
      observationCancellationByCaseValidateIdLoading ||
      observationCancellationByCaseValidateIdFetching ||
      observationReturnByCaseValidateIdLoading ||
      observationReturnByCaseValidateIdFetching ? (
        <CustomSpin />
      ) : (
        <>
          <div className="options-validate-others-report-review-button">
            <OptionsValidateOthersReportReviewButton
              handleCLickCancelCase={() =>
                setIsModalConfirmCancelCaseLocalState(true)
              }
              handleClickReAssignAnalyst={() =>
                setIsModalReassignAnalystLocalState(true)
              }
              caseValidateDeleted={reportValidateByIdData?.deletedAt!}
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
              </Card>
            </Col>

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
                {observationReturnByCaseValidateIdData &&
                  !observationReturnByCaseValidateIdError && (
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
                  )}

                {observationCancellationByCaseValidateIdData && (
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
                      Justificación de anulación:
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
                        observationCancellationByCaseValidateIdData
                          .reasonCancellationCase?.cac_r_cause
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
                        observationCancellationByCaseValidateIdData?.cac_o_observation
                      }
                    </Typography.Text>
                  </Col>
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
      <CustomModalNoContent
        key={"custom-modal-reassign-analyst"}
        widthCustomModalNoContent="50%"
        openCustomModalState={isModalReassignAnalystLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalReassignAnalystLocalState(false)
        }
        contentCustomModal={
          <ContentReassignAnalyst
            onCloseModal={() => setIsModalReassignAnalystLocalState(false)}
            caseReportValidateId={caseValidateId!}
          />
        }
      />
      <CustomModalNoContent
        key={"custom-modal-reassigned-analyst-successfully"}
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
            handleClickCLoseModal={
              handleClickCLoseModalAssignedAnalystSuccesfull
            }
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
            isSubmittinCancellationCase={isSubmittinCancellationCaseLocalState}
            allReasonCancellationDataFetching={
              allReasonCancellationDataFetching
            }
            allReasonCancellationDataLoading={allReasonCancellationDataLoading}
          />
        }
      />
    </div>
  );
};

export default ValidateOtherReportReviewContent;
