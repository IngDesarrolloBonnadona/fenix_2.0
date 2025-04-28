"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import { titleStyleCss } from "@/theme/text_styles";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import {
  useDeleteScoreComplianceControlMutation,
  useGetAllScoreComplianceControlQuery,
} from "@/redux/apis/score_compliance_control/scoreComplianceControlApi";
import TableColumnsScoreCompliance from "./table_columns/TableColumnsScoreCompliance";
import CreateScoreComplianceButtonComponent from "./buttons/CreateScoreComplianceButton";

const ScoreComplianceContent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    data: allScoreComplianceControlsData,
    isFetching: allScoreComplianceControlsFetching,
    isLoading: allScoreComplianceControlsLoading,
    error: allScoreComplianceControlsError,
    refetch: allScoreComplianceControlsRefetch,
  } = useGetAllScoreComplianceControlQuery(null);

  const [deleteScoreComplianceControl] =
    useDeleteScoreComplianceControlMutation();

  const transformedData = Array.isArray(allScoreComplianceControlsData)
    ? allScoreComplianceControlsData?.map((req: ScoreComplianceControl) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (recordId: number) => {
    try {
      const response: any = await deleteScoreComplianceControl(recordId);

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
      allScoreComplianceControlsRefetch();
    }
  };
  return (
    <div style={{ padding: "22px" }}>
      <div className="title-module">
        <h2
          style={{
            ...titleStyleCss,
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Puntajes de cumplimiento
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allScoreComplianceControlsRefetch}
        loading={
          allScoreComplianceControlsLoading ||
          allScoreComplianceControlsFetching
        }
        customButton={
          <CreateScoreComplianceButtonComponent
            onNewRegister={allScoreComplianceControlsRefetch}
          />
        }
        columnsCustomTable={TableColumnsScoreCompliance({
          handleClickDelete,
          onRefetchRegister: allScoreComplianceControlsRefetch,
        })}
      />
    </div>
  );
};

export default ScoreComplianceContent;
