"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import {
  useDeleteProbabilityOcurrenceMutation,
  useGetAllProbabilityOcurrencesQuery,
} from "@/redux/apis/probability_ocurrence/probabilityOcurrenceApi";
import { titleStyleCss } from "@/theme/text_styles";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import CreateProbabilityOcurrenceButtonComponent from "./buttons/CreateProbabilityOcurrenceButton.";
import TableColumnsProbabilityOcurrence from "./table_columns/TableColumnsProbabilityOcurrence";

const ProbabilityOcurrenceContent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    data: allProbabilityOcurrencesData,
    isFetching: allProbabilityOcurrencesFetching,
    isLoading: allProbabilityOcurrencesLoading,
    error: allProbabilityOcurrencesError,
    refetch: allProbabilityOcurrencesRefetch,
  } = useGetAllProbabilityOcurrencesQuery(null);

  const [deleteProbabilityOcurrence] = useDeleteProbabilityOcurrenceMutation();

  const transformedData = Array.isArray(allProbabilityOcurrencesData)
    ? allProbabilityOcurrencesData?.map((req: ProbabilityOcurrence) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (recordId: number) => {
    try {
      const response: any = await deleteProbabilityOcurrence(recordId);

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
      allProbabilityOcurrencesRefetch();
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
          Probabilidades de ocurrencia
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allProbabilityOcurrencesRefetch}
        loading={
          allProbabilityOcurrencesLoading || allProbabilityOcurrencesFetching
        }
        customButton={
          <CreateProbabilityOcurrenceButtonComponent
            onNewRegister={allProbabilityOcurrencesRefetch}
          />
        }
        columnsCustomTable={TableColumnsProbabilityOcurrence({
          handleClickDelete,
          onRefetchRegister: allProbabilityOcurrencesRefetch,
        })}
      />
    </div>
  );
};

export default ProbabilityOcurrenceContent;
