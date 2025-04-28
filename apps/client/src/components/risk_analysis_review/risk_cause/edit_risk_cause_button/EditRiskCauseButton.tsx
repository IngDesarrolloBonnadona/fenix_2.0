"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined } from "@ant-design/icons";
import { useUpdateRiskCauseMutation } from "@/redux/apis/risk_cause/riskCauseApi";
import EditRiskCauseFormData from "../edit_risk_cause_form_data/EditRiskCauseFormData";

const EditRiskCauseButtonComponent: React.FC<{
  onRefetch: () => void;
  dataRecord: RiskCause;
}> = ({ onRefetch, dataRecord }) => {
  const dispatch = useDispatch();

  const [nameLocalState, setNameLocalState] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateRiskCause, { isLoading: updatedRiskCauseLoading }] =
    useUpdateRiskCauseMutation();

  useEffect(() => {
    if (isModalOpen && !nameLocalState) {
      setNameLocalState(dataRecord.ris_c_name);
    }
  }, [isModalOpen, nameLocalState]);

  const areDataDifferent = (
    initialData: { dataName: string },
    currentData: { dataName: string }
  ): boolean => {
    return initialData.dataName !== currentData.dataName;
  };

  const hasChanges = () => {
    const initialData = {
      dataName: dataRecord.ris_c_name,
    };

    const currentData = {
      dataName: nameLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateRiskCause({
        id: dataRecord.id,
        updateRiskCause: {
          ris_c_name: nameLocalState,
        },
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
        classNameCustomButton="open-modal-edit-button"
        idCustomButton="open-modal-edit-button"
        typeCustomButton="primary"
        htmlTypeCustomButton="button"
        iconCustomButton={<EditOutlined />}
        onClickCustomButton={() => setIsModalOpen(true)}
        titleTooltipCustomButton="Ver"
        shapeCustomButton="circle"
        sizeCustomButton={"small"}
      />

      <CustomModalNoContent
        key={"custom-modal-edit-cause"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <EditRiskCauseFormData
            handleClickSubmitFormData={handleClickSubmit}
            nameLocalStateFormData={nameLocalState}
            setNameLocalStateFormData={setNameLocalState}
            updatedRiskCauseLoadingFormdata={updatedRiskCauseLoading}
            hasChangesFormData={hasChanges()}
          />
        }
      />
    </>
  );
};

export default EditRiskCauseButtonComponent;
