"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateRiskFactorButtonComponent from "@/components/configuration/risk_factor/buttons/CreateRiskFactorButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsRiskFactor from "./table_columns/TableColumnsRiskFactor";

import {
  useDeleteRiskFactorMutation,
  useGetAllRiskFactorsQuery,
} from "@/redux/apis/risk_factor/riskFactorApi";
import { titleStyleCss } from "@/theme/text_styles";

const RiskFactorContent = () => {
  const dispatch = useDispatch();

  const {
    data: allRiskFactorsData,
    isFetching: allRiskFactorsDataFetching,
    isLoading: allRiskFactorsDataLoading,
    error: allRiskFactorsDataError,
    refetch: allRiskFactorsDataRefetch,
  } = useGetAllRiskFactorsQuery(null);

  const [deleteRiskFactor] = useDeleteRiskFactorMutation();

  const transformedData = Array.isArray(allRiskFactorsData)
    ? allRiskFactorsData?.map((req: RiskFactor) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteRiskFactor(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allRiskFactorsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allRiskFactorsDataRefetch();
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
          Factores de riesgo
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allRiskFactorsDataRefetch}
        loading={allRiskFactorsDataLoading || allRiskFactorsDataFetching}
        customButton={
          <CreateRiskFactorButtonComponent
            onNewRegister={allRiskFactorsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsRiskFactor({
          handleClickDelete,
          onRefetchRegister: allRiskFactorsDataRefetch,
        })}
      />
    </div>
  );
};

export default RiskFactorContent;
