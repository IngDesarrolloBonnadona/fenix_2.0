"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { PlusOutlined } from "@ant-design/icons";

import CreateRiskCauseFormData from "../create_risk_cause_form_data/CreateRiskCauseFormData";

import { useCreateRiskCauseMutation } from "@/redux/apis/risk_cause/riskCauseApi";

const CreateRiskCauseButtonComponent: React.FC<{
  onRefetch: () => void;
  eventId: number;
}> = ({ onRefetch, eventId }) => {
  const dispatch = useDispatch();

  const [nameLocalState, setNameLocalState] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createRiskCause, { isLoading: createdRiskCauseLoading }] =
    useCreateRiskCauseMutation();

  const handleClickSubmit = async () => {
    try {
      const response: any = await createRiskCause({
        ris_c_name: nameLocalState,
        ris_c_event_id: eventId,
      });

      let dataError = response.error;
      let validationData = response.data?.message;
      let responseData = response.data;

      if (dataError || !responseData) {
        const errorMessage = dataError?.data.message;
        const validationDataMessage = validationData;

        if (Array.isArray(errorMessage)) {
          dispatch(
            setShowMessage({
              type: "error",
              content: errorMessage[0],
            })
          );
        } else if (typeof errorMessage === "string") {
          dispatch(
            setShowMessage({
              type: "error",
              content: errorMessage,
            })
          );
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(
            setShowMessage({
              type: "error",
              content: validationDataMessage[0],
            })
          );
        } else if (typeof validationDataMessage === "string") {
          dispatch(
            setShowMessage({
              type: "error",
              content: validationDataMessage,
            })
          );
        }
      }

      if (responseData && !dataError) {
        dispatch(
          setShowMessage({
            type: "success",
            content: responseData.message,
          })
        );
        setIsModalOpen(false);
        onRefetch();
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      dispatch(
        setShowMessage({
          type: "error",
          content: "ERROR INTERNO",
        })
      );
    }
  };

  return (
    <>
      <CustomButton
        classNameCustomButton="open-modal-button"
        idCustomButton="open-modal-button"
        titleCustomButton="Agregar"
        typeCustomButton="primary"
        htmlTypeCustomButton="button"
        iconCustomButton={<PlusOutlined />}
        onClickCustomButton={() => setIsModalOpen(true)}
        styleCustomButton={{
          background: "#f28322",
          color: "#ffffff",
          borderRadius: "16px",
        }}
        iconPositionCustomButton={"start"}
        sizeCustomButton={"small"}
      />

      <CustomModalNoContent
        key={"custom-modal-create-risk-cause"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <CreateRiskCauseFormData
            handleCreateRiskCauseDataForm={handleClickSubmit}
            nameLocalStateFormData={nameLocalState}
            setNameLocalStateFormData={setNameLocalState}
            createdRiskCauseLoadingFormdata={createdRiskCauseLoading}
          />
        }
      />
    </>
  );
};

export default CreateRiskCauseButtonComponent;
