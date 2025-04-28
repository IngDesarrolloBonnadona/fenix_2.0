"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsRisksEvent from "./table_columns/TableColumnsRiskAnalysis";
import { titleStyleCss } from "@/theme/text_styles";

import { getNameOfEventTypeMap } from "@/helpers/get_name_by_id/get_name_of_event_type";
import { getNameOfUnitMap } from "@/helpers/get_name_by_id/get_name_of_unit";
import { CaseTypeReportEnum } from "@/utils/enums/case_type_color.enum";
import { filterCasesByCurrentQuarter } from "./helpers/filter_cases_by_current_quarter";
import { filterCasesByUnit } from "./helpers/filter_cases_by_unit";

import { setNameEvent } from "@/redux/features/event/eventSlice";
import { setNameUnit } from "@/redux/features/unit/unitSlice";
import { setSelectedCases } from "@/redux/features/case_report_validate/selectedCasesSlice";

import { useGetAllRisksEventsQuery } from "@/redux/apis/event/eventApi";
import { useGetAllEventTypesQuery } from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";
import { useGetAllServicesQuery } from "@/redux/apis/service/serviceApi";

const RiskAnalysisContent: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    data: allRisksEventsData,
    isFetching: allRisksEventsDataFetching,
    isLoading: allRisksEventsDataLoading,
    error: allRisksEventsDataError,
    refetch: allRisksEventsDataRefetch,
  } = useGetAllRisksEventsQuery(null);

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
    data: allServicesData,
    isFetching: allServicesFetching,
    isLoading: allServicesLoading,
    error: allServicesByError,
    refetch: allServicesRefetch,
  } = useGetAllServicesQuery(null);

  const filteredEventType = allEventTypesData?.filter(
    (item) => item.caseType?.cas_t_name === CaseTypeReportEnum.RISK
  );

  const eventTypeGetName = getNameOfEventTypeMap(allEventTypesData);
  const unitGetName = getNameOfUnitMap(allUnitsData);

  const transformedData = Array.isArray(allRisksEventsData)
    ? allRisksEventsData.map((req: Events) => ({
        ...req,
        eve_eventtype_id_fk: eventTypeGetName?.[req.eve_eventtype_id_fk],
        eve_unit_id_fk:
          req.eve_unit_id_fk !== null
            ? unitGetName?.[req.eve_unit_id_fk]
            : null,
      }))
    : [];

  const handleClickSeeMore = (record: Events) => {
    dispatch(setNameEvent(""));
    dispatch(setNameUnit(""));
    dispatch(setSelectedCases([]));

    dispatch(setNameEvent(record.eve_name));
    dispatch(setNameUnit(record.unit?.unit_name));

    let selectedCases: CaseReportValidate[] = [];

    if (record.materializedAdverseEvent) {
      selectedCases = selectedCases.concat(
        filterCasesByUnit(
          filterCasesByCurrentQuarter(
            record.materializedAdverseEvent.caseReportValidate || []
          ),
          allServicesData,
          record
        )
      );
    }

    if (record.materializedIncident) {
      selectedCases = selectedCases.concat(
        filterCasesByUnit(
          filterCasesByCurrentQuarter(
            record.materializedIncident.caseReportValidate || []
          ),
          allServicesData,
          record
        )
      );
    }

    dispatch(setSelectedCases(selectedCases));
    router.push(`risk_analysis_review/${record.id}`);
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
          Análisis de riesgo
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allRisksEventsDataRefetch}
        loading={
          allRisksEventsDataLoading ||
          allRisksEventsDataFetching ||
          allEventTypesDataLoading ||
          allEventTypesDataFetching ||
          allUnitsDataLoading ||
          allUnitsDataFetching ||
          allServicesLoading ||
          allServicesFetching
        }
        columnsCustomTable={TableColumnsRisksEvent({
          filteredEventType: filteredEventType,
          unitData: allUnitsData,
          serviceData: allServicesData,
          handleClickSeeMore,
        })}
      />
    </div>
  );
};

export default RiskAnalysisContent;
