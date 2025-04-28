"use client";

import React, { useEffect, useState } from "react";

import { Button, Col, Empty, Input, Modal, Row, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllMovementReportsQuery } from "@/redux/apis/movement_report/movementReportApi";
import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { getNameOfMovementReportMap } from "@/helpers/get_name_by_id/get_name_of_movement_report";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsReportSearchEngine from "./table_columns_report_search_engine/TableColumsReportSearchEngine";
import {
  useGetReportValidateByConsecutiveQuery,
  useGetReportValidateByIdQuery,
} from "@/redux/apis/case_report_validate/caseReportValidateApi";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import ContentDetailsCase from "./content_details_case/ContentDetailsCase";
import { useGetReportOriginalByIdQuery } from "@/redux/apis/case_report_original/caseReportOriginalApi";

const ReportSearchEngineComponent: React.FC = () => {
  const [isModalOpenLocalState, setIsModalOpenState] = useState(false);
  const [inputQueryLocalState, setInputQueryLocalState] = useState("");
  const [caseReportValidateIdLocalState, setCaseReportValidateIdLocalState] =
    useState("");
  const [isSearchingLocalState, setIsSearchingLocalState] = useState(false);
  const [isModalDetailsCaseLocalState, setIsModalDetailsCaseLocalState] =
    useState(false);

  const {
    data: reportValidateByConsecutiveData,
    isFetching: reportValidateByConsecutiveFetching,
    isLoading: reportValidateByConsecutiveLoading,
    error: reportValidateByConsecutiveError,
    refetch: reportValidateByConsecutiveRefetch,
  } = useGetReportValidateByConsecutiveQuery(inputQueryLocalState, {
    skip: !inputQueryLocalState,
  });

  const {
    data: reportValidateByIdData,
    isFetching: reportValidateByIdFetching,
    isLoading: reportValidateByIdLoading,
    error: reportValidateByIdError,
    refetch: reportValidateByIdRefetch,
  } = useGetReportValidateByIdQuery(caseReportValidateIdLocalState, {
    skip: !caseReportValidateIdLocalState,
  });

  const {
    data: reportOriginalByIdData,
    isFetching: reportOriginalByIdFetching,
    isLoading: reportOriginalByIdLoading,
    error: reportOriginalByIdError,
    refetch: reportOriginalByIdRefetch,
  } = useGetReportOriginalByIdQuery(
    reportValidateByIdData?.val_cr_originalcase_id_fk!,
    {
      skip: !reportValidateByIdData?.val_cr_originalcase_id_fk,
    }
  );

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const {
    data: allMovementReportsData,
    isFetching: allMovementReportsDataFetching,
    isLoading: allMovementReportsDataLoading,
    error: allMovementReportsDataError,
    refetch: allMovementReportsDataRefetch,
  } = useGetAllMovementReportsQuery(null);

  useEffect(() => {
    setIsSearchingLocalState(!!inputQueryLocalState);
  }, [inputQueryLocalState, reportValidateByIdData]);

  const caseTypeGetName = getNameOfCaseTypeMap(allCaseTypesData);
  const movementReportGetName = getNameOfMovementReportMap(
    allMovementReportsData
  );

  const transformedData = Array.isArray(reportValidateByConsecutiveData)
    ? reportValidateByConsecutiveData?.map((req: CaseReportValidate) => ({
        ...req,
        val_cr_casetype_id_fk: caseTypeGetName?.[req.val_cr_casetype_id_fk],
        val_cr_statusmovement_id_fk:
          movementReportGetName?.[req.val_cr_statusmovement_id_fk],
      }))
    : [];

  const handleCancel = () => {
    setInputQueryLocalState("");
    setIsModalOpenState(false);
    setIsSearchingLocalState(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQueryLocalState(e.target.value);
    setIsSearchingLocalState(!!e.target.value);
  };

  const handleClickSeeMore = async (id: string) => {
    setCaseReportValidateIdLocalState(id);
    setIsModalDetailsCaseLocalState(true);

    if (caseReportValidateIdLocalState) {
      reportValidateByIdRefetch();
    }

    if (reportValidateByIdData?.val_cr_originalcase_id_fk) {
      reportOriginalByIdRefetch();
    }
  };

  return (
    <>
      <Button
        icon={<SearchOutlined />}
        size={"middle"}
        onClick={() => {
          setIsModalOpenState(true);
        }}
      >
        Buscar reporte por Consecutivo
      </Button>
      <Modal
        title="Búsqueda de reporte"
        open={isModalOpenLocalState}
        onCancel={handleCancel}
        onClose={handleCancel}
        width={1000}
        footer={null}
      >
        <div style={{ padding: "16px" }}>
          <Row style={{ marginBottom: "16px" }}>
            <Col flex={9}>
              <Input
                size={"middle"}
                autoFocus
                placeholder="# Reporte"
                onChange={handleInputChange}
                value={inputQueryLocalState}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {reportValidateByConsecutiveLoading ||
              reportValidateByConsecutiveFetching ? (
                <Skeleton active />
              ) : isSearchingLocalState && transformedData.length > 0 ? (
                <div style={{ marginTop: "25px" }}>
                  <CustomTableFiltersAndSorting
                    dataCustomTable={transformedData || []}
                    onClickRechargeCustomTable={
                      reportValidateByConsecutiveRefetch
                    }
                    loading={
                      reportValidateByConsecutiveLoading ||
                      reportValidateByConsecutiveFetching ||
                      allMovementReportsDataFetching ||
                      allMovementReportsDataLoading ||
                      allCaseTypesDataFetching ||
                      allCaseTypesDataLoading
                    }
                    columnsCustomTable={TableColumnsReportSearchEngine({
                      caseTypeData: allCaseTypesData,
                      movementReportData: allMovementReportsData,
                      handleClickSeeMore,
                    })}
                  />
                </div>
              ) : inputQueryLocalState && transformedData.length === 0 ? (
                <Empty description="No se encontraron resultados" />
              ) : null}
            </Col>
          </Row>
        </div>
      </Modal>

      <CustomModalNoContent
        key={"custom-modal-details-case"}
        widthCustomModalNoContent="100%"
        openCustomModalState={isModalDetailsCaseLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => {
          setIsModalDetailsCaseLocalState(false);
        }}
        contentCustomModal={
          <ContentDetailsCase
            reportValidateData={reportValidateByIdData}
            reportOriginalData={reportOriginalByIdData}
            reportValidateFetchingData={reportValidateByConsecutiveFetching}
            reportValidateLoadingData={reportValidateByConsecutiveLoading}
            reportOriginalLoadingData={reportOriginalByIdLoading}
            reportOriginalFetchingData={reportOriginalByIdFetching}
          />
        }
      />
    </>
  );
};
export default ReportSearchEngineComponent;
