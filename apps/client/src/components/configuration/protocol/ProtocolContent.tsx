"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateProtocolButtonComponent from "@/components/configuration/protocol/buttons/CreateProtocolButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsProtocol from "./table_columns/TableColumnsProtocol";

import {
  useDeleteProtocolMutation,
  useGetAllProtocolsQuery,
} from "@/redux/apis/protocol/protocolApi";
import { titleStyleCss } from "@/theme/text_styles";

const ProtocolContent = () => {
  const dispatch = useDispatch();

  const {
    data: allProtocolsData,
    isFetching: allProtocolsDataFetching,
    isLoading: allProtocolsDataLoading,
    error: allProtocolsDataError,
    refetch: allProtocolsDataRefetch,
  } = useGetAllProtocolsQuery(null);

  const [deleteProtocol] = useDeleteProtocolMutation();

  const transformedData = Array.isArray(allProtocolsData)
    ? allProtocolsData?.map((req: Protocol) => ({
        ...req,
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteProtocol(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allProtocolsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allProtocolsDataRefetch();
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
          Protocolos
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allProtocolsDataRefetch}
        loading={allProtocolsDataLoading || allProtocolsDataFetching}
        customButton={
          <CreateProtocolButtonComponent
            onNewRegister={allProtocolsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsProtocol({
          handleClickDelete,
          onRefetchRegister: allProtocolsDataRefetch,
        })}
      />
    </div>
  );
};

export default ProtocolContent;
