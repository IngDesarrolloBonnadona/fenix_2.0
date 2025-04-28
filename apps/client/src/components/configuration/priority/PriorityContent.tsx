"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import { getNameOfSeverityClasificationMap } from "@/helpers/get_name_by_id/get_name_of_severity_clasification";

import CreatePriorityButtonComponent from "@/components/configuration/priority/buttons/CreatePriorityButtonComponent";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsPriority from "./table_columns/TableColumnsPriority";

import {
  useDeletePriorityMutation,
  useGetAllPrioritiesQuery,
} from "@/redux/apis/priority/priorityApi";
import { useGetAllSeverityClasificationsQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";
import { titleStyleCss } from "@/theme/text_styles";

const PriorityContent = () => {
  const dispatch = useDispatch();

  const {
    data: allPrioritiesData,
    isFetching: allPrioritiesDataFetching,
    isLoading: allPrioritiesDataLoading,
    error: allPrioritiesDataError,
    refetch: allPrioritiesDataRefetch,
  } = useGetAllPrioritiesQuery(null);

  const {
    data: allSeverityClasificationsData,
    isFetching: allSeverityClasificationsDataFetching,
    isLoading: allSeverityClasificationsDataLoading,
    error: allSeverityClasificationsDataError,
    refetch: allSeverityClasificationsDataRefetch,
  } = useGetAllSeverityClasificationsQuery(null);

  const [deletePriority] = useDeletePriorityMutation();

  const severityClasificationGetName = getNameOfSeverityClasificationMap(
    allSeverityClasificationsData
  );

  const transformedData = Array.isArray(allPrioritiesData)
    ? allPrioritiesData.map((req: Priority) => ({
        ...req,
        prior_severityclasif_id_fk:
          severityClasificationGetName?.[req.prior_severityclasif_id_fk],
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deletePriority(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allPrioritiesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allPrioritiesDataRefetch();
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
          Prioridades
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allPrioritiesDataRefetch}
        loading={allPrioritiesDataLoading || allPrioritiesDataFetching}
        customButton={
          <CreatePriorityButtonComponent
            onNewRegister={allPrioritiesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsPriority({
          handleClickDelete,
          onRefetchRegister: allPrioritiesDataRefetch,
          severityClasificationData: allSeverityClasificationsData,
        })}
      />
    </div>
  );
};

export default PriorityContent;
