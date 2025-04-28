"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";

import RICasesAssociatedWithVascularAccessForm from "./r_i_cases_associated_with_vascular_access_form/RICasesAssociatedWithVascularAccessForm";

import { DescriptionOtherEnum } from "@/utils/enums/description_other";
import { ResearchCategoryEnum } from "@/utils/enums/research_category.enum";

import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import { useSaveClinicalResearchMutation } from "@/redux/apis/clinical_research/clinicalResearchApi";
import { useGetResearchCategoryByResearchInstrumentIdQuery } from "@/redux/apis/research_category/researchCategoryApi";
import { setIdClinicalResearch } from "@/redux/features/clinical_research/clinicalResearchSlice";

const RICasesAssociatedWithVascularAccess: React.FC = () => {
  const dispatch = useDispatch();

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const researchInstrumentIdState = useAppSelector(
    (state) => state.researchInstrument.id
  );

  const researchInstrumentNameState = useAppSelector(
    (state) => state.researchInstrument.inst_r_name
  );

  const selectedCasesIdState: string[] = useAppSelector(
    (state) => state.selectedCases.selectedCasesId
  );

  const clinicalResearchIdState = useAppSelector(
    (state) => state.clinicalResearch.id
  );

  const hasFailureState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_has_failure
  );
  const damageState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_damage
  );
  const clinicalContextState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_clinical_context
  );
  const otherDeviceTypeState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_other_device_type
  );
  const otherDamageTypeState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_other_device_type
  );
  const fluidNameState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_other_device_type
  );
  const isPhlebitisFluidState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_is_phlebitis_fluid
  );
  const fluidPhState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_fluid_ph
  );
  const adequateInfusionTimeState = useAppSelector(
    (state) =>
      state.vascularAccessResearchInstrument.inst_adequate_infusion_time
  );
  const infusionTimeState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_infusion_time
  );
  const adequateDilutionState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_adequate_dilution
  );
  const fluitDilutionState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_fluid_dilution
  );
  const otherInfluencingFactorState = useAppSelector(
    (state) =>
      state.vascularAccessResearchInstrument.inst_other_influencing_factors
  );
  const otherFailedMeasuresState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_other_failed_measures
  );
  const otherRiskFactorState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_other_risk_factors
  );
  const venipunctureTechniqueState = useAppSelector(
    (state) =>
      state.vascularAccessResearchInstrument.inst_venipuncture_technique
  );
  const additionalFindingState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_additional_findings
  );
  const hasCareFailuresState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_has_care_failures
  );
  const incorrectActionsState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_has_incorrect_actions
  );
  const unsafeActionsState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_has_unsafe_actions
  );
  const conclusionsState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_conclusions
  );
  const isCasePrevetableState = useAppSelector(
    (state) => state.vascularAccessResearchInstrument.inst_is_case_preventable
  );

  const [whasThereFailureLocalState, setWhasThereFailureLocalState] =
    useState<boolean>(false);
  const [whasThereDamageLocalState, setWhasThereDamageLocalState] =
    useState<boolean>(false);

  const [clinicalContextOfCaseLocalState, setClinicalContextOfCaseLocalState] =
    useState("");

  const [deviceTypeIdLocalState, setDeviceTypeIdLocalState] = useState<
    number | null
  >(null);
  const [damageTypeIdLocalState, setDamageTypeIdLocalState] = useState<
    number | null
  >(null);
  const [fluidTypeIdLocalState, setFluidTypeIdLocalState] = useState<
    number | null
  >(null);
  const [influencyFactorIdLocalState, setInfluencyFactorIdLocalState] =
    useState<number[]>([]);
  const [failedMeasureIdLocalState, setFailedMeasureIdLocalState] = useState<
    number[]
  >([]);
  const [riskFactorIdLocalState, setRiskFactorIdLocalState] = useState<
    number | null
  >(null);
  const [safetyBarrierIdLocalState, setSafetyBarrierIdLocalState] = useState<
    number | null
  >(null);

  const [
    descriptionDeviceTypeOthersLocalState,
    setDescriptionDeviceTypeOthersLocalState,
  ] = useState("");
  const [
    showDescriptionDeviceTypeOthersLocalState,
    setShowDescriptionDeviceTypeOthersLocalState,
  ] = useState(false);
  const [
    descriptionDamageTypeOthersLocalState,
    setDescriptionDamageTypeOthersLocalState,
  ] = useState("");
  const [
    showDescriptionDamageTypeOthersLocalState,
    setShowDescriptionDamageTypeOthersLocalState,
  ] = useState(false);
  const [
    descriptionFluidTypeOthersLocalState,
    setDescriptionFluidTypeOthersLocalState,
  ] = useState("");
  const [
    showDescriptionFluidTypeOthersLocalState,
    setShowDescriptionFluidTypeOthersLocalState,
  ] = useState(false);
  const [
    descriptionFluidTypeNameLocalState,
    setDescriptionFluidTypeNameLocalState,
  ] = useState("");
  const [
    showDescriptionFluidTypeNameLocalState,
    setShowDescriptionFluidTypeNameLocalState,
  ] = useState(false);
  const [
    descriptionInfluencyFactorOthersLocalState,
    setDescriptionInfluencyFactorOthersLocalState,
  ] = useState("");
  const [
    descriptionRiskFactorOthersLocalState,
    setDescriptionRiskFactorOthersLocalState,
  ] = useState("");

  const [
    showDescriptionInfluencyFactorOthersLocalState,
    setShowDescriptionInfluencyFactoreOthersLocalState,
  ] = useState(false);
  const [
    descriptionFailedMeasureOthersLocalState,
    setDescriptionFailedMeasureOthersLocalState,
  ] = useState("");
  const [
    showDescriptionFailedMeasureOthersLocalState,
    setShowDescriptionFailedMeasureOthersLocalState,
  ] = useState(false);
  const [
    showDescriptionRiskFactorOthersLocalState,
    setShowDescriptionRiskFactorOthersLocalState,
  ] = useState(false);

  const [
    consideredPhlebitisGeneratingFluidLocalState,
    setConsideredPhlebitisGeneratingFluidLocalState,
  ] = useState<boolean>(false);
  const [phFluidLocalState, setPhFluidLocalState] = useState<number | null>(
    null
  );
  const [
    whasInfusionTimeAdequateLocalState,
    setWhasInfusionTimeAdequateLocalState,
  ] = useState<boolean>(false);
  const [describeInfusionTimeLocalState, setDescribeInfusionTimeLocalState] =
    useState("");
  const [whasDilutionAdequateLocalState, setWhasDilutionAdequateLocalState] =
    useState<boolean>(false);
  const [describeDilutionFluidLocalState, setDescribeDilutionFluidLocalState] =
    useState("");

  const [
    techniqueUsedVenipunctureLocalState,
    setTechniqueUsedVenipunctureLocalState,
  ] = useState("");
  const [additionalFindingsLocalState, setAdditionalFindingsLocalState] =
    useState("");
  const [conclusionsLocalState, setConclusionsLocalState] = useState("");

  const [hasCareFailuresLocalState, setHasCareFailuresLocalState] =
    useState<boolean>(false);
  const [hasIncorrectActionsLocalState, setHasIncorrectActionsLocalState] =
    useState<boolean>(false);
  const [hasUnsafeActionsLocalState, setHasUnsafeActionsLocalState] =
    useState<boolean>(false);
  const [isCasePrevetableLocalState, setIsCasePrevetableLocalState] =
    useState<boolean>(false);

  const [isSubmitingSaveData, setIsSubmitingSaveData] = useState(false);

  const {
    data: allResearchCategoryByResearchInstrumentIdData,
    isFetching: allResearchCategoryByResearchInstrumentIdFetching,
    isLoading: allResearchCategoryByResearchInstrumentIdLoading,
    error: allResearchCategoryByResearchInstrumentIdError,
    refetch: allResearchCategoryByResearchInstrumentIdRefetch,
  } = useGetResearchCategoryByResearchInstrumentIdQuery(
    researchInstrumentIdState,
    {
      skip: !researchInstrumentIdState,
    }
  );

  const [saveClinicalResearch, { isLoading: saveClinicalResearchLoading }] =
    useSaveClinicalResearchMutation();

  const deviceTypeCategory =
    allResearchCategoryByResearchInstrumentIdData?.find(
      (item) => item.cat_r_name === ResearchCategoryEnum.DEVICE_TYPE
    );

  const damageTypeCategory =
    allResearchCategoryByResearchInstrumentIdData?.find(
      (item) => item.cat_r_name === ResearchCategoryEnum.DAMAGE_TYPE
    );

  const fluidTypeCategory = allResearchCategoryByResearchInstrumentIdData?.find(
    (item) =>
      item.cat_r_name ===
      ResearchCategoryEnum.WHAT_TYPE_OF_FLUID_WAS_BEING_PASSED_THROUGH_THE_DEVICE
  );

  const influencyFactorCategory =
    allResearchCategoryByResearchInstrumentIdData?.find(
      (item) =>
        item.cat_r_name ===
        ResearchCategoryEnum.INDICATE_ONE_OR_SEVERAL_OPTIONS_OF_WHAT_INFLUENCED_THE_PRESENTATION_OF_THE_CASE
    );

  const failedMeasureCategory =
    allResearchCategoryByResearchInstrumentIdData?.find(
      (item) =>
        item.cat_r_name ===
        ResearchCategoryEnum.WHAT_PHYSICAL_AND_TECHNOLOGICAL_MEASURES_FAILED
    );

  const riskFactorCategory =
    allResearchCategoryByResearchInstrumentIdData?.find(
      (item) =>
        item.cat_r_name ===
        ResearchCategoryEnum.WHAT_RISK_FACTORS_DID_THE_PATIENT_AND_FAMILY_HAVE
    );

  const safetyBarrierCategory =
    allResearchCategoryByResearchInstrumentIdData?.find(
      (item) =>
        item.cat_r_name ===
        ResearchCategoryEnum.LEVEL_OF_SAFETY_BARRIERS_ESTABLISHED_IN_THE_INSTITUTION_TO_PREVENT_FAILURES
    );

  const handleChangeDeviceType = (e: any) => {
    const value = Number(e.target.value);

    setDeviceTypeIdLocalState(value);
    setDescriptionDeviceTypeOthersLocalState("");

    const hasOtherOption = deviceTypeCategory?.optionResearchCategory.find(
      (item) => item.id === value
    );

    setShowDescriptionDeviceTypeOthersLocalState(
      hasOtherOption?.cat_o_name ===
        DescriptionOtherEnum.DESCRIPTION_DEVICE_TYPE_OTHER
    );
  };

  const handleChangeDamageType = (e: any) => {
    const value = Number(e.target.value);

    setDamageTypeIdLocalState(value);
    setDescriptionDamageTypeOthersLocalState("");

    const hasOtherOption = damageTypeCategory?.optionResearchCategory.find(
      (item) => item.id === value
    );

    setShowDescriptionDamageTypeOthersLocalState(
      hasOtherOption?.cat_o_name ===
        DescriptionOtherEnum.DESCRIPTION_DEVICE_TYPE_OTHER
    );
  };

  const handleChangeFluidType = (e: any) => {
    const value = Number(e.target.value);

    setFluidTypeIdLocalState(value);
    setDescriptionFluidTypeOthersLocalState("");
    setDescriptionFluidTypeNameLocalState("");

    const hasOtherOption = fluidTypeCategory?.optionResearchCategory.find(
      (item) => item.id === value
    );

    setShowDescriptionFluidTypeOthersLocalState(
      hasOtherOption?.cat_o_name ===
        DescriptionOtherEnum.DESCRIPTION_FLUID_TYPE_OTHER
    );

    setShowDescriptionFluidTypeNameLocalState(
      hasOtherOption?.cat_o_name ===
        DescriptionOtherEnum.DESCRIPTION_FLUID_TYPE_NAME
    );
  };

  const handleChangeInfluencyFactor = (values: number[]) => {
    setInfluencyFactorIdLocalState(values);

    const hasOtherOption = values.some((id) =>
      influencyFactorCategory?.optionResearchCategory.some(
        (item) =>
          item.id === id &&
          item.cat_o_name ===
            DescriptionOtherEnum.DESCRIPTION_INFLUENCY_FACTOR_OTHER
      )
    );

    setShowDescriptionInfluencyFactoreOthersLocalState(hasOtherOption);
  };

  const handleChangeFailedMeasure = (values: number[]) => {
    setFailedMeasureIdLocalState(values);

    const hasOtherOption = values.some((id) =>
      failedMeasureCategory?.optionResearchCategory.some(
        (item) =>
          item.id === id &&
          item.cat_o_name ===
            DescriptionOtherEnum.DESCRIPTION_FAILED_MEASURE_OTHER
      )
    );

    setShowDescriptionFailedMeasureOthersLocalState(hasOtherOption);
  };

  const handleChangeRiskFactor = (e: any) => {
    const value = Number(e.target.value);

    setRiskFactorIdLocalState(value);
    setDescriptionRiskFactorOthersLocalState("");

    const hasOtherOption = riskFactorCategory?.optionResearchCategory.find(
      (item) => item.id === value
    );

    setShowDescriptionRiskFactorOthersLocalState(
      hasOtherOption?.cat_o_name ===
        DescriptionOtherEnum.DESCRIPTION_DEVICE_TYPE_OTHER
    );
  };

  const handleChangeSafetyBarrier = (e: any) => {
    const value = Number(e.target.value);

    setSafetyBarrierIdLocalState(value);
  };

  const handleChangePhFluid = (e: any) => {
    const value = e.target.value;

    if (value === "") {
      setPhFluidLocalState(null);
      return;
    }

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setPhFluidLocalState(numericValue);
    }
  };

  const handleConfirmSaveData = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmitingSaveData(true);
      const optionResearchCategories = [
        ...(deviceTypeIdLocalState !== null ? [deviceTypeIdLocalState] : []),
        ...(damageTypeIdLocalState !== null ? [damageTypeIdLocalState] : []),
        ...(fluidTypeIdLocalState !== null ? [fluidTypeIdLocalState] : []),
        ...(influencyFactorIdLocalState.length > 0
          ? influencyFactorIdLocalState
          : []),
        ...(failedMeasureIdLocalState.length > 0
          ? failedMeasureIdLocalState
          : []),
        ...(riskFactorIdLocalState !== null ? [riskFactorIdLocalState] : []),
        ...(safetyBarrierIdLocalState !== null
          ? [safetyBarrierIdLocalState]
          : []),
      ];

      const response: any = await saveClinicalResearch({
        id: clinicalResearchIdState,
        saveOrUpdateClinicalResearch: {
          res_c_research_instrument_name: researchInstrumentNameState,
          res_c_research_instrument_id: researchInstrumentIdState,
          rec_c_user_researcher_id: idNumberUserSessionState.toString(),
          caseReportValidates: selectedCasesIdState,
          optionResearchCategories: optionResearchCategories,
          instrumentData: {
            inst_has_failure: whasThereFailureLocalState,
            inst_damage: whasThereDamageLocalState,
            inst_clinical_context: clinicalContextOfCaseLocalState,
            inst_other_device_type: descriptionDeviceTypeOthersLocalState,
            inst_other_damage_type: descriptionDamageTypeOthersLocalState,
            inst_fluid_name: descriptionFluidTypeNameLocalState,
            inst_is_phlebitis_fluid:
              consideredPhlebitisGeneratingFluidLocalState,
            inst_fluid_ph: phFluidLocalState,
            inst_adequate_infusion_time: whasInfusionTimeAdequateLocalState,
            inst_infusion_time: describeInfusionTimeLocalState,
            inst_adequate_dilution: whasDilutionAdequateLocalState,
            inst_fluid_dilution: describeDilutionFluidLocalState,
            inst_other_influencing_factors:
              descriptionInfluencyFactorOthersLocalState,
            inst_other_failed_measures:
              descriptionFailedMeasureOthersLocalState,
            inst_other_risk_factors: descriptionRiskFactorOthersLocalState,
            inst_venipuncture_technique: techniqueUsedVenipunctureLocalState,
            inst_additional_findings: additionalFindingsLocalState,
            inst_has_care_failures: hasCareFailuresLocalState,
            inst_has_incorrect_actions: hasIncorrectActionsLocalState,
            inst_has_unsafe_actions: hasUnsafeActionsLocalState,
            inst_conclusions: conclusionsLocalState,
            inst_is_case_preventable: isCasePrevetableLocalState,
          },
        },
      });

      let saveDataError = response.error;

      let saveResponseData = response.data;

      let saveDataValidationData = response.data?.message;

      if (saveDataError || !saveResponseData) {
        const errorMessage = saveDataError?.data.message;
        const validationDataMessage = saveDataValidationData;

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

      if (saveResponseData) {
        dispatch(
          setShowMessage({
            type: "success",
            content: "¡Datos guardados correctamente!",
          })
        );
        dispatch(setIdClinicalResearch(saveResponseData.id));
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
      setIsSubmitingSaveData(false);
    }
  };

  return (
    <RICasesAssociatedWithVascularAccessForm
      initialValuesFormData={{ remember: false }}
      deviceTypeCategoryFormData={deviceTypeCategory}
      damageTypeCategoryFormData={damageTypeCategory}
      fluidTypeCategoryFormData={fluidTypeCategory}
      influencyFactorCategoryFormData={influencyFactorCategory}
      failedMeasureCategoryFormData={failedMeasureCategory}
      riskFactorCategoryFormData={riskFactorCategory}
      safetyBarrierCategoryFormData={safetyBarrierCategory}
      allResearchCategoryByInstrumentIdFetchingFormData={
        allResearchCategoryByResearchInstrumentIdFetching
      }
      allResearchCategoryByInstrumentIdLoadingFormData={
        allResearchCategoryByResearchInstrumentIdLoading
      }
      deviceTypeIdLocalStateFormData={deviceTypeIdLocalState}
      damageTypeIdLocalStateFormData={damageTypeIdLocalState}
      fluidTypeIdLocalStateFormData={fluidTypeIdLocalState}
      influencyFactorIdLocalStateFormData={influencyFactorIdLocalState}
      failedMeasureIdLocalStateFormData={failedMeasureIdLocalState}
      riskFactorIdLocalStateFormData={riskFactorIdLocalState}
      safetyBarrierIdLocalStateFormData={safetyBarrierIdLocalState}
      whasThereFailureLocalStateFormData={whasThereFailureLocalState}
      whasThereDamageLocalStateFormData={whasThereDamageLocalState}
      consideredPhlebitisGeneratingFluidLocalStateFormData={
        consideredPhlebitisGeneratingFluidLocalState
      }
      whasInfusionTimeAdequateLocalStateFormData={
        whasInfusionTimeAdequateLocalState
      }
      whasDilutionAdequateLocalStateFormData={whasDilutionAdequateLocalState}
      hasCareFailuresLocalStateFormData={hasCareFailuresLocalState}
      hasIncorrectActionsLocalStateFormData={hasIncorrectActionsLocalState}
      hasUnsafeActionsLocalStateFormData={hasUnsafeActionsLocalState}
      isCasePrevetableLocalStateFormData={isCasePrevetableLocalState}
      clinicalContextOfCaseLocalStateFormData={clinicalContextOfCaseLocalState}
      phFluidLocalStateFormData={phFluidLocalState}
      describeInfusionTimeLocalStateFormData={describeInfusionTimeLocalState}
      describeDilutionFluidLocalStateFormData={describeDilutionFluidLocalState}
      techniqueUsedVenipunctureLocalStateFormData={
        techniqueUsedVenipunctureLocalState
      }
      additionalFindingsLocalStateFormData={additionalFindingsLocalState}
      conclusionsLocalStateFormData={conclusionsLocalState}
      descriptionDeviceTypeOthersLocalStateFormata={
        descriptionDeviceTypeOthersLocalState
      }
      descriptionDamageTypeOthersLocalStateFormata={
        descriptionDamageTypeOthersLocalState
      }
      descriptionFluidTypeOthersLocalStateFormata={
        descriptionFluidTypeOthersLocalState
      }
      descriptionFluidTypeNameLocalStateFormata={
        descriptionFluidTypeNameLocalState
      }
      descriptionInfluencyFactorOthersLocalStateFormata={
        descriptionInfluencyFactorOthersLocalState
      }
      descriptionFailedMeasureOthersLocalStateFormata={
        descriptionFailedMeasureOthersLocalState
      }
      descriptionRiskFactorOthersLocalStateFormata={
        descriptionRiskFactorOthersLocalState
      }
      setDescriptionDeviceTypeOthersLocalStateFormData={(e) => {
        setDescriptionDeviceTypeOthersLocalState(e.target.value.toUpperCase());
      }}
      setDescriptionDamageTypeOthersLocalStateFormData={(e) => {
        setDescriptionDamageTypeOthersLocalState(e.target.value.toUpperCase());
      }}
      setDescriptionFluidTypeOthersLocalStateFormData={(e) => {
        setDescriptionFluidTypeOthersLocalState(e.target.value.toUpperCase());
      }}
      setDescriptionFluidTypeNameLocalStateFormData={(e) => {
        setDescriptionFluidTypeNameLocalState(e.target.value.toUpperCase());
      }}
      setDescriptionInfluencyFactorOthersLocalStateFormData={(e) => {
        setDescriptionInfluencyFactorOthersLocalState(
          e.target.value.toUpperCase()
        );
      }}
      setDescriptionFailedMeasureOthersLocalStateFormData={(e) => {
        setDescriptionFailedMeasureOthersLocalState(
          e.target.value.toUpperCase()
        );
      }}
      setDescriptionRiskFactorOthersLocalStateFormData={(e) => {
        setDescriptionRiskFactorOthersLocalState(e.target.value.toUpperCase());
      }}
      setWhasThereFailureLocalStateFormData={(e) => {
        setWhasThereFailureLocalState(e.target.value);
      }}
      setWhasThereDamageLocalStateFormData={(e) => {
        setWhasThereDamageLocalState(e.target.value);
      }}
      setConsideredPhlebitisGeneratingFluidLocalStateFormData={(e) => {
        setConsideredPhlebitisGeneratingFluidLocalState(e.target.value);
      }}
      setWhasInfusionTimeAdequateLocalStateFormData={(e) => {
        setWhasInfusionTimeAdequateLocalState(e.target.value);
      }}
      setWhasDilutionAdequateLocalStateFormData={(e) => {
        setWhasDilutionAdequateLocalState(e.target.value);
      }}
      setHasCareFailuresLocalStateFormData={(e) => {
        setHasCareFailuresLocalState(e.target.value);
      }}
      setHasIncorrectActionsLocalStateFormData={(e) => {
        setHasIncorrectActionsLocalState(e.target.value);
      }}
      setHasUnsafeActionsLocalStateFormData={(e) => {
        setHasUnsafeActionsLocalState(e.target.value);
      }}
      setIsCasePrevetableLocalStateFormData={(e) => {
        setIsCasePrevetableLocalState(e.target.value);
      }}
      setClinicalContextOfCaseLocalStateFormData={(e) => {
        setClinicalContextOfCaseLocalState(e.target.value.toUpperCase());
      }}
      setPhFluidLocalStateFormData={handleChangePhFluid}
      setDescribeInfusionTimeLocalStateFormData={(e) => {
        setDescribeInfusionTimeLocalState(e.target.value.toUpperCase());
      }}
      setDescribeDilutionFluidLocalStateFormData={(e) => {
        setDescribeDilutionFluidLocalState(e.target.value.toUpperCase());
      }}
      setTechniqueUsedVenipunctureLocalStateFormData={(e) => {
        setTechniqueUsedVenipunctureLocalState(e.target.value.toUpperCase());
      }}
      setAdditionalFindingsLocalStateFormData={(e) => {
        setAdditionalFindingsLocalState(e.target.value.toUpperCase());
      }}
      setConclusionsLocalStateFormData={(e) => {
        setConclusionsLocalState(e.target.value.toUpperCase());
      }}
      showDescriptionDeviceTypeOthersLocalStateFormData={
        showDescriptionDeviceTypeOthersLocalState
      }
      showDescriptionDamageTypeOthersLocalStateFormData={
        showDescriptionDamageTypeOthersLocalState
      }
      showDescriptionFluidTypeOthersLocalStateFormData={
        showDescriptionFluidTypeOthersLocalState
      }
      showDescriptionFluidTypeNameLocalStateFormData={
        showDescriptionFluidTypeNameLocalState
      }
      showDescriptionInfluencyFactorOthersLocalStateFormData={
        showDescriptionInfluencyFactorOthersLocalState
      }
      showDescriptionFailedMeasureOthersLocalStateFormData={
        showDescriptionFailedMeasureOthersLocalState
      }
      showDescriptionRiskFactorOthersLocalStateFormData={
        showDescriptionRiskFactorOthersLocalState
      }
      isSubmitingSaveDataFormData={isSubmitingSaveData}
      handleChangeDeviceTypeFormData={handleChangeDeviceType}
      handleChangeDamageTypeFormData={handleChangeDamageType}
      handleChangeFluidTypeFormData={handleChangeFluidType}
      handleChangeInfluencyFactorFormData={handleChangeInfluencyFactor}
      handleChangeFailedMeasureFormData={handleChangeFailedMeasure}
      handleChangeRiskFactorFormData={handleChangeRiskFactor}
      handleChangeSafetyBarrierFormData={handleChangeSafetyBarrier}
      handleConfirmSaveDataformData={handleConfirmSaveData}
    />
  );
};

export default RICasesAssociatedWithVascularAccess;
