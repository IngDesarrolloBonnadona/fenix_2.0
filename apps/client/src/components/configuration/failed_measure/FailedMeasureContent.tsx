"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateFailedMeasureButtonComponent from "@/components/configuration/failed_measure/buttons/CreateFailedMeasureButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsFailedMeasure from "./table_columns/TableColumnsFailedMeasure";

import {
  useDeleteFailedMeasureMutation,
  useGetAllFailedMeasuresQuery,
} from "@/redux/apis/failed_measure/failedMeasureApi";
import { titleStyleCss } from "@/theme/text_styles";

const FailedMeasureContent = () => {
  const dispatch = useDispatch();

  const {
    data: allFailedMeasuresData,
    isFetching: allFailedMeasuresDataFetching,
    isLoading: allFailedMeasuresDataLoading,
    error: allFailedMeasuresDataError,
    refetch: allFailedMeasuresDataRefetch,
  } = useGetAllFailedMeasuresQuery(null);

  const [deleteFailedMeasure] = useDeleteFailedMeasureMutation();

  const transformedData = Array.isArray(allFailedMeasuresData)
    ? allFailedMeasuresData?.map((req: FailedMeasure) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteFailedMeasure(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allFailedMeasuresDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allFailedMeasuresDataRefetch();
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
          Medidas fallidas
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allFailedMeasuresDataRefetch}
        loading={allFailedMeasuresDataLoading || allFailedMeasuresDataFetching}
        customButton={
          <CreateFailedMeasureButtonComponent
            onNewRegister={allFailedMeasuresDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsFailedMeasure({
          handleClickDelete,
          onRefetchRegister: allFailedMeasuresDataRefetch,
        })}
      />
    </div>
  );
};

export default FailedMeasureContent;
