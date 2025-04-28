"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateReasonCancellationCaseButtonComponent from "./buttons/CreateReasonCancellationCaseButton";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsReasonCancellationCase from "./table_columns/TableColumnsReasonCancellationCase";

import {
  useDeleteReasonCancellationCaseMutation,
  useGetAllReasonCancellationCasesQuery,
} from "@/redux/apis/reason_cancellation_case/reasonCancellationCaseApi";

import { titleStyleCss } from "@/theme/text_styles";

const ReasonCancellationCaseContent = () => {
  const dispatch = useDispatch();

  const {
    data: allReasonCancellationCasesData,
    isFetching: allReasonCancellationCasesDataFetching,
    isLoading: allReasonCancellationCasesDataLoading,
    error: allReasonCancellationCasesDataError,
    refetch: allReasonCancellationCasesDataRefetch,
  } = useGetAllReasonCancellationCasesQuery(null);

  const [deleteReasonCancellationCase] =
    useDeleteReasonCancellationCaseMutation();

  const transformedData = Array.isArray(allReasonCancellationCasesData)
    ? allReasonCancellationCasesData.map((req: ReasonCancellationCase) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteReasonCancellationCase(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allReasonCancellationCasesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allReasonCancellationCasesDataRefetch();
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
          Razones de anulación de casos
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allReasonCancellationCasesDataRefetch}
        loading={
          allReasonCancellationCasesDataLoading ||
          allReasonCancellationCasesDataFetching
        }
        customButton={
          <CreateReasonCancellationCaseButtonComponent
            onNewRegister={allReasonCancellationCasesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsReasonCancellationCase({
          handleClickDelete,
          onRefetchRegister: allReasonCancellationCasesDataRefetch,
        })}
      />
    </div>
  );
};

export default ReasonCancellationCaseContent;
