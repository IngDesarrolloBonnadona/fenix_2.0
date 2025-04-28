"use client";

import React from "react";
import { useDispatch } from "react-redux";

import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { useDeleteRiskCauseMutation } from "@/redux/apis/risk_cause/riskCauseApi";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

const DeleteRiskCauseButtonComponent: React.FC<{
  onRefetch: () => void;
  dataRecordId: number;
}> = ({ onRefetch, dataRecordId }) => {
  const dispatch = useDispatch();
  const [deleteRiskCause] = useDeleteRiskCauseMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteRiskCause(id);

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
      }
    } catch (error) {
      console.error("Error al eliminar", error);
      dispatch(
        setShowMessage({
          type: "error",
          content: "ERROR INTERNO",
        })
      );
    } finally {
      onRefetch();
    }
  };
  return (
    <CustomDeletePopConfirm
      onConfirm={() => handleClickDelete(dataRecordId)}
      titleButton="Eliminar"
      title="Eliminar registro"
      description="¿Estás seguro de que deseas eliminar este registro?"
    />
  );
};

export default DeleteRiskCauseButtonComponent;
