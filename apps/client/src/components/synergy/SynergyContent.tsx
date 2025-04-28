"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import TableColumnsSynergy from "./table_column_synergy/TableColumsSynergy";
import ContentResolutionSynergy from "./content_resolution_synergy/ContentResolutionSynergy";

import CustomTableFiltersAndSorting from "../common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import CustomModalNoContent from "../common/custom_modal_no_content/CustomModalNoContent";

import {
  useGetAllSynergiesQuery,
  useGetSynergyByIdQuery,
} from "@/redux/apis/synergy/synergyApi";
import { useGetReportValidateByIdQuery } from "@/redux/apis/case_report_validate/caseReportValidateApi";

import {
  setAnalystIdNumberSynergy,
  setPossibleFaultsSynergy,
  setDefaultValuesSynergy,
  setEvaluationDateSynergy,
  setIdSynergy,
  setWhomWasNotifiedSynergy,
  setPatientContentSynergy,
  setObservationsSynergy,
  setClinicalManagementSynergy,
  setConsequenceSynergy,
  setResolutionDateSynergy,
  setStatusSynergy,
  setValidatedCaseIdSynergy,
} from "@/redux/features/synergy/synergySlice";
import {
  setAgePatientCaseReportValidate,
  setDefaultValuesCaseReportValidate,
  setDescriptionCaseReportValidate,
  setDocumentPatientCaseReportValidate,
  setFilingnumberCaseReportValidate,
  setFirstLastNamePatientCaseReportValidate,
  setFirstNamePatientCaseReportValidate,
  setSecondLastNamePatientCaseReportValidate,
  setSecondNamePatientCaseReportValidate,
} from "@/redux/features/case_report_validate/caseReportValidateSlice";
import { titleStyleCss } from "@/theme/text_styles";

const SynergyContent = () => {
  const dispatch = useDispatch();

  const [synergyCaseReportValidateState, setSynergyCaseReportValidateState] =
    useState("");
  const [isModalResolutionSynergy, setIsModalResolutionSynergy] =
    useState(false);

  const {
    data: allSynergiesData,
    isFetching: allSynergiesDataFetching,
    isLoading: allSynergiesDataLoading,
    error: allSynergiesDataError,
    refetch: allSynergiesDataRefetch,
  } = useGetAllSynergiesQuery(null);

  const {
    data: reportValidateByIdData,
    isFetching: reportValidateByIdDataFetching,
    isLoading: reportValidateByIdDataLoading,
    error: reportValidateByIdDataError,
    refetch: reportValidateByIdDataRefetch,
  } = useGetReportValidateByIdQuery(synergyCaseReportValidateState, {
    skip: !synergyCaseReportValidateState,
  });

  useEffect(() => {
    if (reportValidateByIdData) {
      dispatch(
        setFilingnumberCaseReportValidate(
          reportValidateByIdData?.val_cr_filingnumber
        )
      );
      dispatch(
        setDocumentPatientCaseReportValidate(
          reportValidateByIdData?.val_cr_documentpatient
        )
      );
      dispatch(
        setFirstNamePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_firstnamepatient
        )
      );
      dispatch(
        setSecondNamePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_secondnamepatient
        )
      );
      dispatch(
        setFirstLastNamePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_firstlastnamepatient
        )
      );
      dispatch(
        setSecondLastNamePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_secondlastnamepatient
        )
      );
      dispatch(
        setAgePatientCaseReportValidate(
          reportValidateByIdData?.val_cr_agepatient
        )
      );
      dispatch(
        setDescriptionCaseReportValidate(
          reportValidateByIdData?.val_cr_description
        )
      );
    }
  }, [reportValidateByIdData]);

  const handleClickSeeMore = (record: Synergy) => {
    dispatch(setDefaultValuesSynergy());

    setSynergyCaseReportValidateState(record.syn_validatedcase_id_fk);

    dispatch(setIdSynergy(record.id));
    dispatch(setValidatedCaseIdSynergy(record.syn_validatedcase_id_fk));
    dispatch(setObservationsSynergy(record.syn_observations));
    dispatch(setAnalystIdNumberSynergy(record.syn_analystidnumber));
    dispatch(setPatientContentSynergy(record.syn_patientcontent));
    dispatch(setPossibleFaultsSynergy(record.syn_possiblefaults));
    dispatch(setConsequenceSynergy(record.syn_consequences));
    dispatch(setClinicalManagementSynergy(record.syn_clinicalmanagement));
    dispatch(setWhomWasNotifiedSynergy(record.syn_whomwasnotified));
    dispatch(setEvaluationDateSynergy(record.syn_evaluationdate));
    dispatch(setResolutionDateSynergy(record.syn_resolutiondate));
    dispatch(setStatusSynergy(record.syn_status));

    setIsModalResolutionSynergy(true);
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
          Sinergia
        </h2>
      </div>

      <div className="custom-table-filters-and-sorting">
        <CustomTableFiltersAndSorting
          dataCustomTable={allSynergiesData || []}
          onClickRechargeCustomTable={allSynergiesDataRefetch}
          loading={allSynergiesDataFetching || allSynergiesDataLoading}
          columnsCustomTable={TableColumnsSynergy({
            handleClickSeeMore,
          })}
        />
      </div>

      <div className="custom-modal-no-content">
        <CustomModalNoContent
          key={"custom-modal-resolution-synergy"}
          widthCustomModalNoContent="70%"
          openCustomModalState={isModalResolutionSynergy}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            setIsModalResolutionSynergy(false);
            dispatch(setDefaultValuesCaseReportValidate());
          }}
          contentCustomModal={
            <ContentResolutionSynergy
              onCloseModal={() => {
                setIsModalResolutionSynergy(false);
                dispatch(setDefaultValuesCaseReportValidate());
              }}
              onRefetch={allSynergiesDataRefetch}
            />
          }
        />
      </div>
    </div>
  );
};

export default SynergyContent;
