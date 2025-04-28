"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateStrategyButtonComponent from "./buttons/CreateEventTypeButtonComponent";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsEventType from "./table_columns/TableColumsEventType";

import {
  useDeleteEventTypeMutation,
  useGetAllEventTypesQuery,
} from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";

import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { titleStyleCss } from "@/theme/text_styles";

const EventTypeContent = () => {
  const dispatch = useDispatch();

  const {
    data: allEventTypesData,
    isFetching: allEventTypesDataFetching,
    isLoading: allEventTypesDataLoading,
    error: allEventTypesDataError,
    refetch: allEventTypesDataRefetch,
  } = useGetAllEventTypesQuery(null);

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const [deleteEventType] = useDeleteEventTypeMutation();

  const caseTypeGetName = getNameOfCaseTypeMap(allCaseTypesData);

  const transformedData = Array.isArray(allEventTypesData)
    ? allEventTypesData.map((req: EventType) => ({
        ...req,
        eve_t_casetype_id_fk: caseTypeGetName?.[req.eve_t_casetype_id_fk],
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteEventType(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allEventTypesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log("Error: ", error);
    } finally {
      allEventTypesDataRefetch();
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
          Estrategias
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allEventTypesDataRefetch}
        loading={allEventTypesDataLoading || allEventTypesDataFetching}
        customButton={
          <CreateStrategyButtonComponent
            onNewRegister={allEventTypesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsEventType({
          handleClickDelete,
          onRefetchRegister: allEventTypesDataRefetch,
          caseTypeData: allCaseTypesData,
        })}
      />
    </div>
  );
};

export default EventTypeContent;
