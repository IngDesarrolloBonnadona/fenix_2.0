"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateDamageTypeButtonComponent from "./buttons/CreateDamageTypeButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsDamageType from "./table_columns/TableColumnsDamageType";

import {
  useDeleteDamageTypeMutation,
  useGetAllDamageTypesQuery,
} from "@/redux/apis/damage_type/damageTypeApi";
import { titleStyleCss } from "@/theme/text_styles";

const DamageTypeContent = () => {
  const dispatch = useDispatch();

  const {
    data: allDamageTypesData,
    isFetching: allDamageTypesDataFetching,
    isLoading: allDamageTypesDataLoading,
    error: allDamageTypesDataError,
    refetch: allDamageTypesDataRefetch,
  } = useGetAllDamageTypesQuery(null);

  const [deleteDamageType] = useDeleteDamageTypeMutation();

  const transformedData = Array.isArray(allDamageTypesData)
    ? allDamageTypesData?.map((req: DamageType) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteDamageType(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allDamageTypesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allDamageTypesDataRefetch();
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
          Tipos de daño
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allDamageTypesDataRefetch}
        loading={allDamageTypesDataLoading || allDamageTypesDataFetching}
        customButton={
          <CreateDamageTypeButtonComponent
            onNewRegister={allDamageTypesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsDamageType({
          handleClickDelete,
          onRefetchRegister: allDamageTypesDataRefetch,
        })}
      />
    </div>
  );
};

export default DamageTypeContent;
