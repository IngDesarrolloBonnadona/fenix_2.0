"use client";

import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateSubOriginButtonComponent from "@/components/configuration/sub_origin/buttons/CreateSubOriginButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsSubOrigin from "./table_columns/TableColumnsSubOrigin";

import {
  useDeleteSubOriginMutation,
  useGetAllSubOriginsQuery,
} from "@/redux/apis/sub_origin/subOriginApi";
import { useGetAllOriginsQuery } from "@/redux/apis/origin/originApi";

import { getNameOfOriginMap } from "@/helpers/get_name_by_id/get_name_of_origin";
import { titleStyleCss } from "@/theme/text_styles";

const SubOriginContent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    data: allSubOriginsData,
    isFetching: allSubOriginsDataFetching,
    isLoading: allSubOriginsDataLoading,
    error: allSubOriginsDataError,
    refetch: allSubOriginsDataRefetch,
  } = useGetAllSubOriginsQuery(null);

  const {
    data: allOriginsData,
    isFetching: allOriginsDataFetching,
    isLoading: allOriginsDataLoading,
    error: allOriginsDataError,
    refetch: allOriginsDataRefetch,
  } = useGetAllOriginsQuery(null);

  const [deleteSubOrigin] = useDeleteSubOriginMutation();

  const originGetName = getNameOfOriginMap(allOriginsData);

  const transformedData = Array.isArray(allSubOriginsData)
    ? allSubOriginsData.map((req: SubOrigin) => ({
        ...req,
        sub_o_origin_id_fk: originGetName?.[req.sub_o_origin_id_fk],
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteSubOrigin(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allSubOriginsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allSubOriginsDataRefetch();
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
          Sub origenes
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allSubOriginsDataRefetch}
        loading={allSubOriginsDataLoading || allSubOriginsDataFetching}
        customButton={
          <CreateSubOriginButtonComponent
            onNewRegister={allSubOriginsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsSubOrigin({
          handleClickDelete,
          onRefetchRegister: allSubOriginsDataRefetch,
          originData: allOriginsData,
        })}
      />
    </div>
  );
};

export default SubOriginContent;
