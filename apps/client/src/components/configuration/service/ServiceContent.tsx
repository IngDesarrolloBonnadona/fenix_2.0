"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateServiceButtonComponent from "@/components/configuration/service/buttons/CreateServiceButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsService from "./table_columns/TableColumnsService";

import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "@/redux/apis/service/serviceApi";
import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";

import { getNameOfUnitMap } from "@/helpers/get_name_by_id/get_name_of_unit";
import { titleStyleCss } from "@/theme/text_styles";

const ServiceContent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    data: allServicesData,
    isFetching: allServicesDataFetching,
    isLoading: allServicesDataLoading,
    error: allServicesDataError,
    refetch: allServicesDataRefetch,
  } = useGetAllServicesQuery(null);

  const {
    data: allUnitsData,
    isFetching: allUnitsDataFetching,
    isLoading: allUnitsDataLoading,
    error: allUnitsDataError,
    refetch: allUnitsDataRefetch,
  } = useGetAllUnitsQuery(null);

  const [deleteService] = useDeleteServiceMutation();

  const unitGetName = getNameOfUnitMap(allUnitsData);

  const transformedData = Array.isArray(allServicesData)
    ? allServicesData.map((req: Service) => ({
        ...req,
        serv_unit_id_fk: unitGetName?.[req.serv_unit_id_fk],
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteService(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allServicesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allServicesDataRefetch();
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
          Servicios
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allServicesDataRefetch}
        loading={allServicesDataLoading || allServicesDataFetching}
        customButton={
          <CreateServiceButtonComponent
            onNewRegister={allServicesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsService({
          handleClickDelete,
          onRefetchRegister: allServicesDataRefetch,
          unitData: allUnitsData,
        })}
      />
    </div>
  );
};

export default ServiceContent;
