"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateInfluencingFactorButtonComponent from "./buttons/CreateInfluencingFactorButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsInfluencyFactor from "./table_colums/TableColumnsInfluencingFactor";

import {
  useDeleteInfluencingFactorMutation,
  useGetAllInfluencingFactorsQuery,
} from "@/redux/apis/influencing_factor/influencingFactorApi";
import { titleStyleCss } from "@/theme/text_styles";

const InfluencingFactorContent = () => {
  const dispatch = useDispatch();

  const {
    data: allInfluencingFactorsData,
    isFetching: allInfluencingFactorsDataFetching,
    isLoading: allInfluencingFactorsDataLoading,
    error: allInfluencingFactorsDataError,
    refetch: allInfluencingFactorsDataRefetch,
  } = useGetAllInfluencingFactorsQuery(null);

  const [DeleteInfluencingFactor] = useDeleteInfluencingFactorMutation();

  const transformedData = Array.isArray(allInfluencingFactorsData)
    ? allInfluencingFactorsData?.map((req: InfluencingFactor) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await DeleteInfluencingFactor(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allInfluencingFactorsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allInfluencingFactorsDataRefetch();
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
          Factores de influencia
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allInfluencingFactorsDataRefetch}
        loading={
          allInfluencingFactorsDataLoading || allInfluencingFactorsDataFetching
        }
        customButton={
          <CreateInfluencingFactorButtonComponent
            onNewRegister={allInfluencingFactorsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsInfluencyFactor({
          handleClickDelete,
          onRefetchRegister: allInfluencingFactorsDataRefetch,
        })}
      />
    </div>
  );
};

export default InfluencingFactorContent;
