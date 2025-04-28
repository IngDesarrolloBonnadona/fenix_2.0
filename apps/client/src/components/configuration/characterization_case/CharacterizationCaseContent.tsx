"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateCharacterizationCaseButtonComponent from "./buttons/CreateCharacterizationCaseButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsCharacterizationCase from "./table_colums/TableColumnsCharacterizationCase";

import {
  useDeleteCharacterizationCaseMutation,
  useGetAllCharacterizationCasesQuery,
} from "@/redux/apis/characterization_case/charecterizationCaseApi";
import { titleStyleCss } from "@/theme/text_styles";

const CharacterizationCaseContent = () => {
  const dispatch = useDispatch();

  const {
    data: allCharacterizationCasesData,
    isFetching: allCharacterizationCasesDataFetching,
    isLoading: allCharacterizationCasesDataLoading,
    error: allCharacterizationCasesDataError,
    refetch: allCharacterizationCasesDataRefetch,
  } = useGetAllCharacterizationCasesQuery(null);

  const transformedData = Array.isArray(allCharacterizationCasesData)
    ? allCharacterizationCasesData?.map((req: CharacterizationCase) => ({
        ...req,
      }))
    : [];

  const [deleteCharacterizationCase] = useDeleteCharacterizationCaseMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteCharacterizationCase(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allCharacterizationCasesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allCharacterizationCasesDataRefetch();
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
          Caracterizaciones de caso
        </h2>
      </div>

      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allCharacterizationCasesDataRefetch}
        loading={
          allCharacterizationCasesDataLoading ||
          allCharacterizationCasesDataFetching
        }
        customButton={
          <CreateCharacterizationCaseButtonComponent
            onNewRegister={allCharacterizationCasesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsCharacterizationCase({
          handleClickDelete,
          onRefetchRegister: allCharacterizationCasesDataRefetch,
        })}
      />
    </div>
  );
};

export default CharacterizationCaseContent;
