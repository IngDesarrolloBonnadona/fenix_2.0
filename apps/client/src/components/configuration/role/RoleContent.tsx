"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateRoleButtonComponent from "@/components/configuration/role/buttons/CreateRoleButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsRole from "./table_columns/TableColumnsRole";

import {
  useDeleteRoleMutation,
  useGetAllRolesQuery,
} from "@/redux/apis/role/roleApi";
import { titleStyleCss } from "@/theme/text_styles";

const RoleContent = () => {
  const dispatch = useDispatch();

  const {
    data: allRolesData,
    isFetching: allRolesDataFetching,
    isLoading: allRolesDataLoading,
    error: allRolesDataError,
    refetch: allRolesDataRefetch,
  } = useGetAllRolesQuery(null);

  const [deleteRole] = useDeleteRoleMutation();

  const transformedData = Array.isArray(allRolesData)
    ? allRolesData?.map((req: Role) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteRole(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allRolesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allRolesDataRefetch();
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
          Roles
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allRolesDataRefetch}
        loading={allRolesDataLoading || allRolesDataFetching}
        customButton={
          <CreateRoleButtonComponent onNewRegister={allRolesDataRefetch} />
        }
        columnsCustomTable={TableColumnsRole({
          handleClickDelete,
          onRefetchRegister: allRolesDataRefetch,
        })}
      />
    </div>
  );
};

export default RoleContent;
