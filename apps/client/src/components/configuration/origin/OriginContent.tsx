"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateOriginButtonComponent from "@/components/configuration/origin/buttons/CreateOriginButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsOrigin from "./table_columns/TableColumnsOrigin";

import {
  useDeleteOriginMutation,
  useGetAllOriginsQuery,
} from "@/redux/apis/origin/originApi";
import { titleStyleCss } from "@/theme/text_styles";

const OriginContent = () => {
  const dispatch = useDispatch();

  const {
    data: allOriginsData,
    isFetching: allOriginsDataFetching,
    isLoading: allOriginsDataLoading,
    error: allOriginsDataError,
    refetch: allOriginsDataRefetch,
  } = useGetAllOriginsQuery(null);

  const [deleteOrigin] = useDeleteOriginMutation();

  const transformedData = Array.isArray(allOriginsData)
    ? allOriginsData?.map((req: Origin) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteOrigin(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allOriginsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allOriginsDataRefetch();
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
          Orígenes
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allOriginsDataRefetch}
        loading={allOriginsDataLoading || allOriginsDataFetching}
        customButton={
          <CreateOriginButtonComponent onNewRegister={allOriginsDataRefetch} />
        }
        columnsCustomTable={TableColumnsOrigin({
          handleClickDelete,
          onRefetchRegister: allOriginsDataRefetch,
        })}
      />
    </div>
  );
};

export default OriginContent;
