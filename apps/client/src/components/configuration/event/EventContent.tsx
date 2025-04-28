"use client";

import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateEventButtonComponent from "./buttons/CreateEventButtonComponent";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsEvent from "./table_columns/TableColumnsEvent";

import { getNameOfEventTypeMap } from "@/helpers/get_name_by_id/get_name_of_event_type";
import { getNameOfUnitMap } from "@/helpers/get_name_by_id/get_name_of_unit";
import { getNameOfOncologyCategoryMap } from "@/helpers/get_name_by_id/get_name_of_oncology_category";
import { getNameOfCharacterizationCaseMap } from "@/helpers/get_name_by_id/get_name_of_characterization_case";

import {
  useDeleteEventMutation,
  useGetAllEventsQuery,
} from "@/redux/apis/event/eventApi";
import { useGetAllEventTypesQuery } from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";
import { useGetAllOncologyCategoriesQuery } from "@/redux/apis/oncology_category/oncologyCategoryApi";
import { useGetAllCharacterizationCasesQuery } from "@/redux/apis/characterization_case/charecterizationCaseApi";
import { titleStyleCss } from "@/theme/text_styles";
import { getNameOfRiskTypeMap } from "@/helpers/get_name_by_id/get_name_of_risk_type";
import { useGetAllRiskTypesQuery } from "@/redux/apis/risk_type/riskTypeApi";

const EventContent = () => {
  const dispatch = useDispatch();

  const {
    data: allEventsData,
    isFetching: allEventsDataFetching,
    isLoading: allEventsDataLoading,
    error: allEventsDataError,
    refetch: allEventsDataRefetch,
  } = useGetAllEventsQuery(null);

  const {
    data: allEventTypesData,
    isFetching: allEventTypesDataFetching,
    isLoading: allEventTypesDataLoading,
    error: allEventTypesDataError,
    refetch: allEventTypesDataRefetch,
  } = useGetAllEventTypesQuery(null);

  const {
    data: allUnitsData,
    isFetching: allUnitsDataFetching,
    isLoading: allUnitsDataLoading,
    error: allUnitsDataError,
    refetch: allUnitsDataRefetch,
  } = useGetAllUnitsQuery(null);

  const {
    data: allOncologyCategoriesData,
    isFetching: allOncologyCategoriesDataFetching,
    isLoading: allOncologyCategoriesDataLoading,
    error: allOncologyCategoriesDataError,
    refetch: allOncologyCategoriesDataRefetch,
  } = useGetAllOncologyCategoriesQuery(null);

  const {
    data: allCharacterizationCasesData,
    isFetching: allCharacterizationCasesDataFetching,
    isLoading: allCharacterizationCasesDataLoading,
    error: allCharacterizationCasesDataError,
    refetch: allCharacterizationCasesDataRefetch,
  } = useGetAllCharacterizationCasesQuery(null);

  const {
    data: AllRiskTypesData,
    isFetching: AllRiskTypesFetching,
    isLoading: AllRiskTypesLoading,
    error: AllRiskTypesError,
    refetch: AllRiskTypesRefetch,
  } = useGetAllRiskTypesQuery(null);

  const [deleteEvent] = useDeleteEventMutation();

  const eventTypeGetName = getNameOfEventTypeMap(allEventTypesData);
  const unitGetName = getNameOfUnitMap(allUnitsData);
  const oncologyCategoryGetName = getNameOfOncologyCategoryMap(
    allOncologyCategoriesData
  );
  const characterizationCaseGetName = getNameOfCharacterizationCaseMap(
    allCharacterizationCasesData
  );
  const riskTypeGetName = getNameOfRiskTypeMap(AllRiskTypesData);

  const transformedData = Array.isArray(allEventsData)
    ? allEventsData.map((req: Events) => ({
        ...req,
        eve_eventtype_id_fk: eventTypeGetName?.[req.eve_eventtype_id_fk],
        eve_unit_id_fk:
          req.eve_unit_id_fk !== null
            ? unitGetName?.[req.eve_unit_id_fk]
            : null,
        eve_oncologycategory_id_fk:
          oncologyCategoryGetName?.[req.eve_oncologycategory_id_fk],
        eve_characterizationcase_id_fk:
          req.eve_characterizationcase_id_fk !== null
            ? characterizationCaseGetName?.[req.eve_characterizationcase_id_fk]
            : null,
        eve_risk_type_id:
          req.eve_risk_type_id !== null
            ? riskTypeGetName?.[req.eve_risk_type_id]
            : null,
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteEvent(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allEventsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log("Error: ", error);
    } finally {
      allEventsDataRefetch();
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
          Sucesos
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allEventsDataRefetch}
        loading={
          allEventsDataLoading ||
          allEventsDataFetching ||
          allEventTypesDataLoading ||
          allEventTypesDataFetching ||
          allUnitsDataLoading ||
          allUnitsDataFetching ||
          allOncologyCategoriesDataFetching ||
          allOncologyCategoriesDataLoading ||
          allCharacterizationCasesDataFetching ||
          allCharacterizationCasesDataLoading ||
          AllRiskTypesFetching ||
          AllRiskTypesLoading
        }
        customButton={
          <CreateEventButtonComponent onNewRegister={allEventsDataRefetch} />
        }
        columnsCustomTable={TableColumnsEvent({
          handleClickDelete,
          onRefetchRegister: allEventsDataRefetch,
          eventTypeData: allEventTypesData,
          unitData: allUnitsData,
          oncologyCategoryData: allOncologyCategoriesData,
          characterizationCaseData: allCharacterizationCasesData,
          riskTypeData: AllRiskTypesData,
        })}
      />
    </div>
  );
};

export default EventContent;
