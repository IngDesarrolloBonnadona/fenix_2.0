"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateUnitButtonComponent from "@/components/configuration/unit/buttons/CreateUnitButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsUnit from "./table_columns/TableColumnsUnit";

import {
  useDeleteUnitMutation,
  useGetAllUnitsQuery,
} from "@/redux/apis/unit/unitApi";
import { titleStyleCss } from "@/theme/text_styles";

const UnitContent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    data: allUnitsData,
    isFetching: allUnitsDataFetching,
    isLoading: allUnitsDataLoading,
    error: allUnitsDataError,
    refetch: allUnitsDataRefetch,
  } = useGetAllUnitsQuery(null);

  const [deleteUnit] = useDeleteUnitMutation();

  const transformedData = Array.isArray(allUnitsData)
    ? allUnitsData?.map((req: Unit) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (recordId: number) => {
    try {
      const response: any = await deleteUnit(recordId);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allUnitsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log("Error:", error);
    } finally {
      allUnitsDataRefetch();
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
          Unidades
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allUnitsDataRefetch}
        loading={allUnitsDataLoading || allUnitsDataFetching}
        customButton={
          <CreateUnitButtonComponent onNewRegister={allUnitsDataRefetch} />
        }
        columnsCustomTable={TableColumnsUnit({
          handleClickDelete,
          onRefetchRegister: allUnitsDataRefetch,
        })}
      />
    </div>
  );
};

export default UnitContent;
