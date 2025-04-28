"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import { titleStyleCss } from "@/theme/text_styles";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import CreateImpactButtonComponent from "./buttons/CreateImpactButton";

import {
  useDeleteImpactMutation,
  useGetAllImpactsQuery,
} from "@/redux/apis/impact/impactApi";
import TableColumnsImpact from "./tableColumns/TableColumnsImpact";

const ImpactContent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    data: allImpactsData,
    isFetching: allImpactsFetching,
    isLoading: allImpactsLoading,
    error: allImpactsError,
    refetch: allImpactsRefetch,
  } = useGetAllImpactsQuery(null);

  const [deleteImpact] = useDeleteImpactMutation();

  const transformedData = Array.isArray(allImpactsData)
    ? allImpactsData?.map((req: Impact) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (recordId: number) => {
    try {
      const response: any = await deleteImpact(recordId);

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
      allImpactsRefetch();
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
          Impactos
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allImpactsRefetch}
        loading={allImpactsLoading || allImpactsFetching}
        customButton={
          <CreateImpactButtonComponent onNewRegister={allImpactsRefetch} />
        }
        columnsCustomTable={TableColumnsImpact({
          handleClickDelete,
          onRefetchRegister: allImpactsRefetch,
        })}
      />
    </div>
  );
};

export default ImpactContent;
