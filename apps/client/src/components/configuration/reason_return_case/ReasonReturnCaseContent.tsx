"use client";
import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateReasonReturnCaseButtonComponent from "@/components/configuration/reason_return_case/buttons/CreateReasonReturnCaseButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsReasonReturnCase from "./table_columns/TableColumnsReasonReturnCase";

import {
  useDeleteReasonReturnCaseMutation,
  useGetAllReasonReturnCasesQuery,
} from "@/redux/apis/reason_return_case/reasonReturnCaseApi";
import { useGetAllRolesQuery } from "@/redux/apis/role/roleApi";
import { getNameOfRoleMap } from "@/helpers/get_name_by_id/get_name_of_role";
import { titleStyleCss } from "@/theme/text_styles";

const ReasonReturnCaseContent = () => {
  const dispatch = useDispatch();

  const {
    data: allReasonReturnCasesData,
    isFetching: allReasonReturnCasesDataFetching,
    isLoading: allReasonReturnCasesDataLoading,
    error: allReasonReturnCasesDataError,
    refetch: allReasonReturnCasesDataRefetch,
  } = useGetAllReasonReturnCasesQuery(null);

  const {
    data: allRolesData,
    isFetching: allRolesDataFetching,
    isLoading: allRolesDataLoading,
    error: allRolesDataError,
    refetch: allRolesDataRefetch,
  } = useGetAllRolesQuery(null);

  const [deleteReasonReturnCase] = useDeleteReasonReturnCaseMutation();

  const roleGetName = getNameOfRoleMap(allRolesData);

  const transformedData = Array.isArray(allReasonReturnCasesData)
    ? allReasonReturnCasesData.map((req: ReasonReturnCase) => ({
        ...req,
        rec_r_role_id_fk: roleGetName?.[req.rec_r_role_id_fk],
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteReasonReturnCase(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allReasonReturnCasesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allReasonReturnCasesDataRefetch();
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
          Razones de devolución de casos
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allReasonReturnCasesDataRefetch}
        loading={
          allReasonReturnCasesDataLoading || allReasonReturnCasesDataFetching
        }
        customButton={
          <CreateReasonReturnCaseButtonComponent
            onNewRegister={allReasonReturnCasesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsReasonReturnCase({
          handleClickDelete,
          onRefetchRegister: allReasonReturnCasesDataRefetch,
          roleData: allRolesData,
        })}
      />
    </div>
  );
};

export default ReasonReturnCaseContent;
