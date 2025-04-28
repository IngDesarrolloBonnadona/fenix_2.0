"use client";

import React, { useEffect, useState } from "react";

import { Typography } from "antd";
import { titleStyleCss } from "@/theme/text_styles";

import ContentStartEvaluationFormData from "../content_start_evaluation_form_data/ContentStartEvaluationFormData";
import { useGetAllProbabilityOcurrencesQuery } from "@/redux/apis/probability_ocurrence/probabilityOcurrenceApi";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { useGetAllImpactsQuery } from "@/redux/apis/impact/impactApi";
import { useGetAllQuarterYearsQuery } from "@/redux/apis/quarter_year/quarterYearApi";
import { useGetAllScoreComplianceControlQuery } from "@/redux/apis/score_compliance_control/scoreComplianceControlApi";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
import {
  useCreateControlEvaluationMutation,
  useGetAllControlEvaluationByEventAndYearQuery,
} from "@/redux/apis/control_evaluation/controlEvaluationApi";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";
import { useParams } from "next/navigation";
import { getNextAvailableQuarter } from "../helpers/get_next_available_quarter";
import { getRiskLevelProbabilityByImpact } from "../helpers/get_risk_level_probability_by_impact";

const ContentStartvaluationForm: React.FC<{
  eventIdData: number;
  allControlEvaluationByEventAndYearRefetchData: () => void;
  handleChangeCLoseDrawer: () => void;
}> = ({
  eventIdData,
  allControlEvaluationByEventAndYearRefetchData,
  handleChangeCLoseDrawer,
}) => {
  const dispatch = useDispatch();
  const routerParams = useParams<Record<string, string>>();

  const selectedCasesState = useAppSelector(
    (state) => state.selectedCases.selectedCases
  );

  const [activeSwitches, setActiveSwitches] = useState<string[]>([]);
  const [
    probabilityOcurrenceIdLocalState,
    setProbabilityOcurrenceIdLocalState,
  ] = useState(0);
  const [impactIdLocalState, setImpactIdLocalState] = useState(0);
  const [yearLocalState, setYearLocalState] = useState(0);
  const [quarterLocalState, setQuarterLocalState] = useState(0);
  const [riskLevelLocalState, setRiskLevelLocalState] = useState<{
    name: string;
    color: string;
  } | null>(null);

  const {
    data: allProbabilityOcurrencesData,
    isFetching: allProbabilityOcurrencesFetching,
    isLoading: allProbabilityOcurrencesLoading,
    error: allProbabilityOcurrencesError,
    refetch: allProbabilityOcurrencesRefetch,
  } = useGetAllProbabilityOcurrencesQuery(null);

  const {
    data: allImpactsData,
    isFetching: allImpactsFetching,
    isLoading: allImpactsLoading,
    error: allImpactsError,
    refetch: allImpactsRefetch,
  } = useGetAllImpactsQuery(null);

  const {
    data: allQuarterYearsData,
    isFetching: allQuarterYearsFetching,
    isLoading: allQuarterYearsLoading,
    error: allQuarterYearsError,
    refetch: allQuarterYearsRefetch,
  } = useGetAllQuarterYearsQuery(null);

  const {
    data: allScoreComplianceControlData,
    isFetching: allScoreComplianceControlFetching,
    isLoading: allScoreComplianceControlLoading,
    error: allScoreComplianceControlError,
    refetch: allScoreComplianceControlRefetch,
  } = useGetAllScoreComplianceControlQuery(null);

  let eventId = Number(routerParams?.id);

  const {
    data: allControlEvaluationByEventAndYearData,
    isFetching: allControlEvaluationByEventAndYearFetching,
    isLoading: allControlEvaluationByEventAndYearLoading,
    error: allControlEvaluationByEventAndYearError,
    refetch: allControlEvaluationByEventAndYearRefetch,
  } = useGetAllControlEvaluationByEventAndYearQuery(
    { eventId, year: yearLocalState },
    {
      skip: isNaN(eventId) || isNaN(yearLocalState),
    }
  );

  const [
    createControlEvaluation,
    { isLoading: createdRiskControlEvaluationLoading },
  ] = useCreateControlEvaluationMutation();

  useEffect(() => {
    if (probabilityOcurrenceIdLocalState && impactIdLocalState) {
      const selectedProbability = allProbabilityOcurrencesData?.find(
        (item) => item.id === probabilityOcurrenceIdLocalState
      )?.prob_o_level;

      const selectedImpact = allImpactsData?.find(
        (item) => item.id === impactIdLocalState
      )?.imp_level;

      if (selectedProbability && selectedImpact) {
        const riskLevel = getRiskLevelProbabilityByImpact(
          selectedProbability,
          selectedImpact
        );
        if (riskLevel) {
          setRiskLevelLocalState(riskLevel);
        }
      }
    }
  }, [
    probabilityOcurrenceIdLocalState,
    impactIdLocalState,
    allProbabilityOcurrencesData,
    allImpactsData,
  ]);

  const handleSwitchChange = (checked: boolean, switchName: string) => {
    setActiveSwitches((prev) =>
      checked
        ? [...prev, switchName]
        : prev.filter((name) => name !== switchName)
    );
  };

  const progressScoreCompliance =
    allScoreComplianceControlData
      ?.filter((item) => activeSwitches.includes(item.sco_name))
      .reduce((acc, item) => acc + item.sco_percentage, 0) || 0;

  const nextAvailableQuarterId = getNextAvailableQuarter(
    allControlEvaluationByEventAndYearData,
    allQuarterYearsData
  );

  const handleClickSubmit = async () => {
    try {
      const response: any = await createControlEvaluation({
        con_e_event_id: eventIdData,
        con_e_probability_ocurrence_id: probabilityOcurrenceIdLocalState,
        con_e_impact_id: impactIdLocalState,
        con_e_materialized_case: selectedCasesState.flat().length,
        con_e_year: yearLocalState,
        con_e_quarter_year_id: quarterLocalState,
        con_e_compliance_control: progressScoreCompliance,
      });

      let dataError = response.error;
      let validationData = response.data?.message;
      let responseData = response.data;

      if (dataError || !responseData) {
        const errorMessage = dataError?.data.message;
        const validationDataMessage = validationData;

        if (Array.isArray(errorMessage)) {
          dispatch(
            setShowMessage({
              type: "error",
              content: errorMessage[0],
            })
          );
        } else if (typeof errorMessage === "string") {
          dispatch(
            setShowMessage({
              type: "error",
              content: errorMessage,
            })
          );
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(
            setShowMessage({
              type: "error",
              content: validationDataMessage[0],
            })
          );
        } else if (typeof validationDataMessage === "string") {
          dispatch(
            setShowMessage({
              type: "error",
              content: validationDataMessage,
            })
          );
        }
      }

      if (responseData && !dataError) {
        dispatch(
          setShowMessage({
            type: "success",
            content: "¡Datos guardados correctamente!",
          })
        );
        allControlEvaluationByEventAndYearRefetch();
        handleChangeCLoseDrawer();
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      dispatch(
        setShowMessage({
          type: "error",
          content: "ERROR INTERNO",
        })
      );
    } finally {
      allControlEvaluationByEventAndYearRefetchData();
    }
  };
  return (
    <>
      {allProbabilityOcurrencesFetching ||
      allProbabilityOcurrencesLoading ||
      allImpactsFetching ||
      allImpactsLoading ||
      allQuarterYearsFetching ||
      allQuarterYearsLoading ||
      allScoreComplianceControlFetching ||
      allScoreComplianceControlLoading ? (
        <CustomSpin />
      ) : (
        <>
          <Typography.Title
            level={5}
            style={{
              ...titleStyleCss,
              color: "#f28322",
            }}
          >
            Hacer evaluación de control:
          </Typography.Title>

          <ContentStartEvaluationFormData
            probabilityOcurrenceIdFormData={probabilityOcurrenceIdLocalState}
            impactIdFormData={impactIdLocalState}
            yearFormData={yearLocalState}
            quarterFormData={quarterLocalState}
            riskLevelFormData={riskLevelLocalState}
            progressScoreComplianceFormData={progressScoreCompliance}
            nextAvailableQuarterId={nextAvailableQuarterId}
            createdRiskControlEvaluationLoadingFormData={
              createdRiskControlEvaluationLoading
            }
            setProbabilityOcurrenceIdFormData={
              setProbabilityOcurrenceIdLocalState
            }
            setImpactIdFormData={setImpactIdLocalState}
            setYearFormData={setYearLocalState}
            setQuarterFormData={setQuarterLocalState}
            allProbabilityOcurrencesDataFormData={allProbabilityOcurrencesData}
            allImpactsDataFormData={allImpactsData}
            allQuarterYearsDataFormData={allQuarterYearsData}
            allScoreComplianceControlDataFormData={
              allScoreComplianceControlData
            }
            handleSwitchChangeFormData={handleSwitchChange}
            handleClickSubmitFormData={handleClickSubmit}
          />
        </>
      )}
    </>
  );
};

export default ContentStartvaluationForm;
