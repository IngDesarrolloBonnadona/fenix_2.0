"use client";

import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Col, Form, Input, Row, Select, Switch } from "antd";

import { CaseTypeReportEnum } from "@/utils/enums/case_type_color.enum";

import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";
import {
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useGetAllMaterializedAdverseEventsQuery,
  useGetAllMaterializedIncidentsQuery,
} from "@/redux/apis/event/eventApi";
import { useGetAllEventTypesQuery } from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllOncologyCategoriesQuery } from "@/redux/apis/oncology_category/oncologyCategoryApi";
import { useGetAllCharacterizationCasesQuery } from "@/redux/apis/characterization_case/charecterizationCaseApi";
import { init } from "next/dist/compiled/webpack/webpack";
import { useGetAllRiskTypesQuery } from "@/redux/apis/risk_type/riskTypeApi";
import { FaCheck } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";

const EditEventButtonComponent: React.FC<{
  dataRecord: Events;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [eventTypeIdLocalState, setEventTypeIdLocalState] = useState(0);
  const [unitIdLocalState, setUnitIdLocalState] = useState(0);
  const [riskTypeIdLocalState, setRiskTypeIdLocalState] = useState(0);
  const [
    materializedAdverseEventIdLocalState,
    setMaterializedAdverseEventIdLocalState,
  ] = useState(0);
  const [
    materializedIncidentIdLocalState,
    setMaterializedIncidentIdLocalState,
  ] = useState(0);
  const [oncologyCategoryIdLocalState, setOncologyCategoryIdLocalState] =
    useState(0);
  const [
    characterizationCaseIdLocalState,
    setCharacterizationCaseIdLocalState,
  ] = useState(0);
  const [isAssociatedMedicineLocalState, setIsAssociatedMedicineLocalState] =
    useState(false);
  const [isAssociatedDeviceLocalState, setIsAssociatedDeviceLocalState] =
    useState(false);

  const [isStayLocalState, setIsStayLocalState] = useState(false);
  const [isMentalHealthLocalState, setIsMentalHealthLocalState] =
    useState(false);
  const [isPublicHealthLocalState, setIsPublicHealthLocalState] =
    useState(false);
  const [
    isOncologicalPathologyLocalState,
    setIsOncologicalPathologyLocalState,
  ] = useState(false);
  const [isMedicinesLocalState, setIsMedicinesLocalState] = useState(false);
  const [isDevicesLocalState, setIsDevicesLocalState] = useState(false);
  const [isChemotherapyLocalState, setIsChemotherapyLocalState] =
    useState(false);
  const [isCerebralLocalState, setIsCerebralLocalState] = useState(false);
  const [isRespiratoryLocalState, setIsRespiratoryLocalState] = useState(false);
  const [isCardiovascularLocalState, setIsCardiovascularLocalState] =
    useState(false);
  const [isProstateLocalState, setIsProstateLocalState] = useState(false);
  const [isRenalLocalState, setIsRenalLocalState] = useState(false);
  const [isGastrointestinalState, setIsGastrointestinalLocalState] =
    useState(false);
  const [isMetabolicState, setIsMetabolicLocalState] = useState(false);
  const [isImmunologicalState, setIsImmunologicalLocalState] = useState(false);
  const [isNutritionalState, setIsNutritionalLocalState] = useState(false);
  const [isTransfusionalState, setIsTransfusionalLocalState] = useState(false);
  const [isChangesParaclinicalLocalState, setIsChangesParaclinicalLocalState] =
    useState(false);
  const [isSurgeryLocalState, setIsSurgeryLocalState] = useState(false);
  const [isProceduresLocalState, setIsProceduresLocalState] = useState(false);
  const [isInfectiousLocalState, setIsInfectiousLocalState] = useState(false);

  const [showUnitLocalState, setShowUnitLocalState] = useState(false);
  const [showRiskTypeLocalState, setShowRiskTypeLocalState] = useState(false);
  const [showCharacterizationLocalState, setShowCharacterizationLocalState] =
    useState(false);
  const [showRiskMaterializedLocalState, setShowRiskMaterializedLocalState] =
    useState(false);
  const [
    showSubclassificationPatologyLocalState,
    setShowSubclassificationPatologyLocalState,
  ] = useState(false);
  const [
    showAssociatedMedicineOrDeviceLocalState,
    setShowAssociatedMedicineOrDeviceLocalState,
  ] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [updateEvent, { isLoading: updateEventDataLoading }] =
    useUpdateEventMutation();

  const {
    data: EventData,
    isFetching: EventTypeFetching,
    isLoading: EventTypeLoading,
    error: EventTypeError,
    refetch: EventTypeRefetch,
  } = useGetEventByIdQuery(dataRecord.id);

  const {
    data: allUnitsData,
    isFetching: allUnitsDataFetching,
    isLoading: allUnitsDataLoading,
    error: allUnitsDataError,
    refetch: allUnitsDataRefetch,
  } = useGetAllUnitsQuery(null);

  const {
    data: allEventTypesData,
    isFetching: allEventTypesDataFetching,
    isLoading: allEventTypesDataLoading,
    error: allEventTypesDataError,
    refetch: allEventTypesDataRefetch,
  } = useGetAllEventTypesQuery(null);

  const {
    data: allOncologyCategoriesData,
    isFetching: allOncologyCategoriesDataFetching,
    isLoading: allOncologyCategoriesDataLoading,
    error: allOncologyCategoriesDataError,
    refetch: allOncologyCategoriesDataRefetch,
  } = useGetAllOncologyCategoriesQuery(null);

  const {
    data: allCharacterizationCasesData,
    isFetching: allCharacterizationCasesDataFetching,
    isLoading: allCharacterizationCasesDataLoading,
    error: allCharacterizationCasesDataError,
    refetch: allCharacterizationCasesDataRefetch,
  } = useGetAllCharacterizationCasesQuery(null);

  const {
    data: AllRiskTypesData,
    isFetching: AllRiskTypesFetching,
    isLoading: AllRiskTypesLoading,
    error: AllRiskTypesError,
    refetch: AllRiskTypesRefetch,
  } = useGetAllRiskTypesQuery(null);

  const {
    data: AllMaterializedAdverseEventsData,
    isFetching: AllMaterializedAdverseEventsFetching,
    isLoading: AllMaterializedAdverseEventsLoading,
    error: AllMaterializedAdverseEventsError,
    refetch: AllMaterializedAdverseEventsRefetch,
  } = useGetAllMaterializedAdverseEventsQuery(null);

  const {
    data: AllMaterializedIncidentsData,
    isFetching: AllMaterializedIncidentsFetching,
    isLoading: AllMaterializedIncidentsLoading,
    error: AllMaterializedIncidentsError,
    refetch: AllMaterializedIncidentsRefetch,
  } = useGetAllMaterializedIncidentsQuery(null);

  useEffect(() => {
    if (isModalOpen && EventData) {
      setNameLocalState(EventData.eve_name);
      setUnitIdLocalState(EventData.eve_unit_id_fk ?? 0);
      setRiskTypeIdLocalState(EventData.eve_risk_type_id ?? 0);
      setMaterializedAdverseEventIdLocalState(
        EventData.eve_materialized_adverse_event_id ?? 0
      );
      setMaterializedIncidentIdLocalState(
        EventData.eve_materialized_incident_id ?? 0
      );
      setEventTypeIdLocalState(EventData.eve_eventtype_id_fk);
      setOncologyCategoryIdLocalState(EventData.eve_oncologycategory_id_fk);
      setCharacterizationCaseIdLocalState(
        EventData.eve_characterizationcase_id_fk ?? 0
      );
      setIsAssociatedMedicineLocalState(EventData.eve_medicineassociated);
      setIsAssociatedDeviceLocalState(EventData.eve_deviceassociated);
      setIsStayLocalState(EventData.eve_stay);
      setIsMentalHealthLocalState(EventData.eve_mentalhealth);
      setIsPublicHealthLocalState(EventData.eve_publichealth);
      setIsOncologicalPathologyLocalState(EventData.eve_oncologicalpathology);
      setIsMedicinesLocalState(EventData.eve_medicines);
      setIsDevicesLocalState(EventData.eve_devices);
      setIsChemotherapyLocalState(EventData.eve_chemotherapy);
      setIsCerebralLocalState(EventData.eve_cerebral);
      setIsRespiratoryLocalState(EventData.eve_respiratory);
      setIsCardiovascularLocalState(EventData.eve_cardiovascular);
      setIsProstateLocalState(EventData.eve_respiratory);
      setIsRenalLocalState(EventData.eve_renal);
      setIsGastrointestinalLocalState(EventData.eve_gastrointestinal);
      setIsMetabolicLocalState(EventData.eve_metabolic);
      setIsImmunologicalLocalState(EventData.eve_immunological);
      setIsNutritionalLocalState(EventData.eve_nutritional);
      setIsTransfusionalLocalState(EventData.eve_transfusional);
      setIsChangesParaclinicalLocalState(EventData.eve_changesparaclinical);
      setIsSurgeryLocalState(EventData.eve_surgery);
      setIsProceduresLocalState(EventData.eve_procedures);
      setIsInfectiousLocalState(EventData.eve_infectious);

      form.setFieldsValue({
        fieldName: EventData.eve_name,
        fieldEventTypeId: EventData.eve_eventtype_id_fk,
        fieldUnitId: EventData.eve_unit_id_fk ?? undefined,
        fieldMaterializedAdverseEvent:
          EventData.eve_materialized_adverse_event_id ?? undefined,
        fieldMaterializedIncident:
          EventData.eve_materialized_incident_id ?? undefined,
        fieldRiskTypeId: EventData.eve_risk_type_id ?? undefined,
        fieldOncologyCategoryId: EventData.eve_oncologycategory_id_fk,
        fieldCharacterizationId:
          EventData.eve_characterizationcase_id_fk ?? undefined,
      });

      const selectedEventType = allEventTypesData?.find(
        (item) => item.id === EventData.eve_eventtype_id_fk
      );

      if (
        selectedEventType &&
        selectedEventType.caseType &&
        selectedEventType.caseType.cas_t_name === CaseTypeReportEnum.RISK
      ) {
        setShowUnitLocalState(true);
        setShowRiskTypeLocalState(true);
        setShowRiskMaterializedLocalState(true);
        setShowSubclassificationPatologyLocalState(true);
        setShowCharacterizationLocalState(false);
        setShowAssociatedMedicineOrDeviceLocalState(false);
        setCharacterizationCaseIdLocalState(0);
      } else {
        setShowCharacterizationLocalState(true);
        setShowAssociatedMedicineOrDeviceLocalState(true);
        setShowSubclassificationPatologyLocalState(false);
        setShowUnitLocalState(false);
        setShowRiskTypeLocalState(false);
        setShowRiskMaterializedLocalState(false);
        setUnitIdLocalState(0);
        setRiskTypeIdLocalState(0);
      }
    }
  }, [isModalOpen, allEventTypesData, EventData]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataUnitId: number | null;
      dataMaterializedAdverseEventId: number | null;
      dataMaterializedIncidentId: number | null;
      dataRiskTypeId: number | null;
      dataEventTypeId: number;
      dataOncologyCategoryId: number;
      dataCharacterizationCaseId: number | null;
      dataIsAssociatedMedicine: boolean;
      dataIsAssociatedDevice: boolean;
      dataIsStay: boolean;
      dataIsMentalHealth: boolean;
      dataIsPublicHealth: boolean;
      dataIsOncologicalPathology: boolean;
      dataIsMedicines: boolean;
      dataIsDevices: boolean;
      dataIsChemotherapy: boolean;
      dataIsCerebral: boolean;
      dataIsRespiratory: boolean;
      dataIsCardiovascular: boolean;
      dataIsProstate: boolean;
      dataIsRenal: boolean;
      dataIsGastrointestinal: boolean;
      dataIsMetabolic: boolean;
      dataIsImmunological: boolean;
      dataIsNutritional: boolean;
      dataIsTransfusional: boolean;
      dataIsChangesParaclinical: boolean;
      dataIsSurgery: boolean;
      dataIsProcedures: boolean;
      dataIsInfectious: boolean;
    },
    currentData: {
      dataName: string;
      dataUnitId: number | null;
      dataMaterializedAdverseEventId: number | null;
      dataMaterializedIncidentId: number | null;
      dataRiskTypeId: number | null;
      dataEventTypeId: number;
      dataOncologyCategoryId: number;
      dataCharacterizationCaseId: number | null;
      dataIsAssociatedMedicine: boolean;
      dataIsAssociatedDevice: boolean;
      dataIsStay: boolean;
      dataIsMentalHealth: boolean;
      dataIsPublicHealth: boolean;
      dataIsOncologicalPathology: boolean;
      dataIsMedicines: boolean;
      dataIsDevices: boolean;
      dataIsChemotherapy: boolean;
      dataIsCerebral: boolean;
      dataIsRespiratory: boolean;
      dataIsCardiovascular: boolean;
      dataIsProstate: boolean;
      dataIsRenal: boolean;
      dataIsGastrointestinal: boolean;
      dataIsMetabolic: boolean;
      dataIsImmunological: boolean;
      dataIsNutritional: boolean;
      dataIsTransfusional: boolean;
      dataIsChangesParaclinical: boolean;
      dataIsSurgery: boolean;
      dataIsProcedures: boolean;
      dataIsInfectious: boolean;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataUnitId !== currentData.dataUnitId ||
      initialData.dataMaterializedAdverseEventId !==
        currentData.dataMaterializedAdverseEventId ||
      initialData.dataMaterializedIncidentId !==
        currentData.dataMaterializedIncidentId ||
      initialData.dataRiskTypeId !== currentData.dataRiskTypeId ||
      initialData.dataEventTypeId !== currentData.dataEventTypeId ||
      initialData.dataOncologyCategoryId !==
        currentData.dataOncologyCategoryId ||
      initialData.dataCharacterizationCaseId !==
        currentData.dataCharacterizationCaseId ||
      initialData.dataIsAssociatedMedicine !==
        currentData.dataIsAssociatedMedicine ||
      initialData.dataIsAssociatedDevice !==
        currentData.dataIsAssociatedDevice ||
      initialData.dataIsStay !== currentData.dataIsStay ||
      initialData.dataIsMentalHealth !== currentData.dataIsMentalHealth ||
      initialData.dataIsPublicHealth !== currentData.dataIsPublicHealth ||
      initialData.dataIsOncologicalPathology !==
        currentData.dataIsOncologicalPathology ||
      initialData.dataIsMedicines !== currentData.dataIsMedicines ||
      initialData.dataIsDevices !== currentData.dataIsDevices ||
      initialData.dataIsChemotherapy !== currentData.dataIsChemotherapy ||
      initialData.dataIsCerebral !== currentData.dataIsCerebral ||
      initialData.dataIsRespiratory !== currentData.dataIsRespiratory ||
      initialData.dataIsCardiovascular !== currentData.dataIsCardiovascular ||
      initialData.dataIsProstate !== currentData.dataIsProstate ||
      initialData.dataIsRenal !== currentData.dataIsRenal ||
      initialData.dataIsGastrointestinal !==
        currentData.dataIsGastrointestinal ||
      initialData.dataIsMetabolic !== currentData.dataIsMetabolic ||
      initialData.dataIsImmunological !== currentData.dataIsImmunological ||
      initialData.dataIsNutritional !== currentData.dataIsNutritional ||
      initialData.dataIsTransfusional !== currentData.dataIsTransfusional ||
      initialData.dataIsChangesParaclinical !==
        currentData.dataIsChangesParaclinical ||
      initialData.dataIsSurgery !== currentData.dataIsSurgery ||
      initialData.dataIsProcedures !== currentData.dataIsProcedures ||
      initialData.dataIsInfectious !== currentData.dataIsInfectious
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: EventData?.eve_name || "",
      dataEventTypeId: EventData?.eve_eventtype_id_fk || 0,
      dataUnitId: EventData?.eve_unit_id_fk || 0,
      dataMaterializedAdverseEventId:
        EventData?.eve_materialized_adverse_event_id || 0,
      dataMaterializedIncidentId: EventData?.eve_materialized_incident_id || 0,
      dataRiskTypeId: EventData?.eve_risk_type_id || 0,
      dataOncologyCategoryId: EventData?.eve_oncologycategory_id_fk || 0,
      dataCharacterizationCaseId:
        EventData?.eve_characterizationcase_id_fk || 0,
      dataIsAssociatedMedicine: EventData?.eve_medicineassociated!,
      dataIsAssociatedDevice: EventData?.eve_deviceassociated!,
      dataIsStay: EventData?.eve_stay!,
      dataIsMentalHealth: EventData?.eve_mentalhealth!,
      dataIsPublicHealth: EventData?.eve_publichealth!,
      dataIsOncologicalPathology: EventData?.eve_oncologicalpathology!,
      dataIsMedicines: EventData?.eve_medicines!,
      dataIsDevices: EventData?.eve_devices!,
      dataIsChemotherapy: EventData?.eve_chemotherapy!,
      dataIsCerebral: EventData?.eve_cerebral!,
      dataIsRespiratory: EventData?.eve_respiratory!,
      dataIsCardiovascular: EventData?.eve_cardiovascular!,
      dataIsProstate: EventData?.eve_prostate!,
      dataIsRenal: EventData?.eve_renal!,
      dataIsGastrointestinal: EventData?.eve_gastrointestinal!,
      dataIsMetabolic: EventData?.eve_metabolic!,
      dataIsImmunological: EventData?.eve_immunological!,
      dataIsNutritional: EventData?.eve_nutritional!,
      dataIsTransfusional: EventData?.eve_transfusional!,
      dataIsChangesParaclinical: EventData?.eve_changesparaclinical!,
      dataIsSurgery: EventData?.eve_surgery!,
      dataIsProcedures: EventData?.eve_procedures!,
      dataIsInfectious: EventData?.eve_infectious!,
    };

    const currentData = {
      dataName: nameLocalState,
      dataEventTypeId: eventTypeIdLocalState,
      dataUnitId: unitIdLocalState,
      dataMaterializedAdverseEventId: materializedAdverseEventIdLocalState,
      dataMaterializedIncidentId: materializedIncidentIdLocalState,
      dataRiskTypeId: riskTypeIdLocalState,
      dataOncologyCategoryId: oncologyCategoryIdLocalState,
      dataCharacterizationCaseId: characterizationCaseIdLocalState,
      dataIsAssociatedMedicine: isAssociatedMedicineLocalState,
      dataIsAssociatedDevice: isAssociatedDeviceLocalState,
      dataIsStay: isStayLocalState,
      dataIsMentalHealth: isMentalHealthLocalState,
      dataIsPublicHealth: isPublicHealthLocalState,
      dataIsOncologicalPathology: isOncologicalPathologyLocalState,
      dataIsMedicines: isMedicinesLocalState,
      dataIsDevices: isDevicesLocalState,
      dataIsChemotherapy: isChemotherapyLocalState,
      dataIsCerebral: isCerebralLocalState,
      dataIsRespiratory: isRespiratoryLocalState,
      dataIsCardiovascular: isCardiovascularLocalState,
      dataIsProstate: isProstateLocalState,
      dataIsRenal: isRenalLocalState,
      dataIsGastrointestinal: isGastrointestinalState,
      dataIsMetabolic: isMetabolicState,
      dataIsImmunological: isImmunologicalState,
      dataIsNutritional: isNutritionalState,
      dataIsTransfusional: isTransfusionalState,
      dataIsChangesParaclinical: isChangesParaclinicalLocalState,
      dataIsSurgery: isSurgeryLocalState,
      dataIsProcedures: isProceduresLocalState,
      dataIsInfectious: isInfectiousLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateEvent({
        id: dataRecord.id,
        updateEvent: {
          eve_name: nameLocalState,
          eve_eventtype_id_fk: eventTypeIdLocalState,
          eve_unit_id_fk: unitIdLocalState === 0 ? null : unitIdLocalState,
          eve_risk_type_id:
            riskTypeIdLocalState === 0 ? null : riskTypeIdLocalState,
          eve_materialized_adverse_event_id:
            materializedAdverseEventIdLocalState === 0
              ? null
              : materializedAdverseEventIdLocalState,
          eve_materialized_incident_id:
            materializedIncidentIdLocalState === 0
              ? null
              : materializedIncidentIdLocalState,
          eve_oncologycategory_id_fk: oncologyCategoryIdLocalState,
          eve_characterizationcase_id_fk:
            characterizationCaseIdLocalState === 0
              ? null
              : characterizationCaseIdLocalState,
          eve_medicineassociated: isAssociatedMedicineLocalState,
          eve_deviceassociated: isAssociatedDeviceLocalState,
          eve_stay: isStayLocalState,
          eve_mentalhealth: isMentalHealthLocalState,
          eve_publichealth: isPublicHealthLocalState,
          eve_oncologicalpathology: isOncologicalPathologyLocalState,
          eve_medicines: isMedicinesLocalState,
          eve_devices: isDevicesLocalState,
          eve_chemotherapy: isChemotherapyLocalState,
          eve_cerebral: isCerebralLocalState,
          eve_respiratory: isRespiratoryLocalState,
          eve_cardiovascular: isCardiovascularLocalState,
          eve_prostate: isProstateLocalState,
          eve_renal: isRenalLocalState,
          eve_gastrointestinal: isGastrointestinalState,
          eve_metabolic: isMetabolicState,
          eve_immunological: isImmunologicalState,
          eve_nutritional: isNutritionalState,
          eve_transfusional: isTransfusionalState,
          eve_changesparaclinical: isChangesParaclinicalLocalState,
          eve_surgery: isSurgeryLocalState,
          eve_procedures: isProceduresLocalState,
          eve_infectious: isInfectiousLocalState,
        },
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
            content: responseData.message,
          })
        );
        setIsModalOpen(false);
        onRefectRegister();
        EventTypeRefetch();
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
    }
  };

  const onChangeEventType = (value: number) => {
    if (value === null) {
      setShowUnitLocalState(false);
      setShowRiskMaterializedLocalState(false);
      setShowRiskTypeLocalState(false);
      setShowCharacterizationLocalState(false);
      setEventTypeIdLocalState(0);
      setUnitIdLocalState(0);
      setRiskTypeIdLocalState(0);
      setCharacterizationCaseIdLocalState(0);
      setMaterializedAdverseEventIdLocalState(0);
      setMaterializedIncidentIdLocalState(0);
      setIsStayLocalState(false);
      setIsMentalHealthLocalState(false);
      setIsPublicHealthLocalState(false);
      setIsOncologicalPathologyLocalState(false);
      setIsMedicinesLocalState(false);
      setIsDevicesLocalState(false);
      setIsChemotherapyLocalState(false);
      setIsCerebralLocalState(false);
      setIsRespiratoryLocalState(false);
      setIsCardiovascularLocalState(false);
      setIsProstateLocalState(false);
      setIsRenalLocalState(false);
      setIsGastrointestinalLocalState(false);
      setIsMetabolicLocalState(false);
      setIsImmunologicalLocalState(false);
      setIsNutritionalLocalState(false);
      setIsTransfusionalLocalState(false);
      setIsChangesParaclinicalLocalState(false);
      setIsSurgeryLocalState(false);
      setIsProceduresLocalState(false);
      setIsInfectiousLocalState(false);
      return;
    }

    setEventTypeIdLocalState(value);

    const selectedEventType = allEventTypesData?.find(
      (item) => item.id === value
    );

    if (
      selectedEventType &&
      selectedEventType.caseType &&
      selectedEventType.caseType.cas_t_name === CaseTypeReportEnum.RISK
    ) {
      setShowUnitLocalState(true);
      setShowRiskTypeLocalState(true);
      setShowRiskMaterializedLocalState(true);
      setShowCharacterizationLocalState(false);
      setCharacterizationCaseIdLocalState(0);
    } else {
      setShowCharacterizationLocalState(true);
      setShowUnitLocalState(false);
      setShowRiskTypeLocalState(false);
      setUnitIdLocalState(0);
      setShowRiskMaterializedLocalState(false);
      setRiskTypeIdLocalState(0);
    }
  };

  return (
    <>
      <CustomButton
        classNameCustomButton="open-modal-edit-button"
        idCustomButton="open-modal-edit-button"
        typeCustomButton="primary"
        htmlTypeCustomButton="button"
        iconCustomButton={<EditOutlined />}
        onClickCustomButton={() => setIsModalOpen(true)}
        titleTooltipCustomButton="Ver"
        shapeCustomButton="circle"
        sizeCustomButton={"small"}
      />

      <CustomModalNoContent
        key={"custom-modal-edit-service"}
        widthCustomModalNoContent={"50%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-service-form"
              name="edit-service-form"
              className="edit-service-form"
              initialValues={{
                "event-type-id": dataRecord.eve_eventtype_id_fk,
                "unit-id": dataRecord.eve_unit_id_fk ?? undefined,
                "risk-materialized-adverse-event-id":
                  dataRecord.eve_materialized_adverse_event_id ?? undefined,
                "risk-materialized-incident-id":
                  dataRecord.eve_materialized_incident_id ?? undefined,
                "risk-type-id": dataRecord.eve_risk_type_id ?? undefined,
                "oncology-category-id": dataRecord.eve_oncologycategory_id_fk,
                "characterization-id":
                  dataRecord.eve_characterizationcase_id_fk ?? undefined,
                "name-event": dataRecord.eve_name,
              }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label="Estrategia:"
                    name="event-type-id"
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor seleccione una opción!",
                      },
                    ]}
                    style={{
                      marginBottom: "16px",
                    }}
                  >
                    <Select
                      id="select-event-type-id"
                      className="select-event-type-id"
                      showSearch
                      placeholder={"Seleccione una opción"}
                      onChange={(value) => onChangeEventType(value)}
                      value={eventTypeIdLocalState}
                      loading={
                        allEventTypesDataLoading || allEventTypesDataFetching
                      }
                      allowClear
                      filterOption={(input, option) => {
                        return (
                          (option?.children &&
                            option.children
                              .toString()
                              .toUpperCase()
                              .includes(input.toUpperCase())) ||
                          false
                        );
                      }}
                      style={{ width: "100%" }}
                    >
                      {allEventTypesData?.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.eve_t_name} - {item.caseType.cas_t_name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={10}>
                  <Form.Item
                    label="Categoría:"
                    name="oncology-category-id"
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor seleccione una opción!",
                      },
                    ]}
                    style={{
                      marginBottom: "16px",
                    }}
                  >
                    <Select
                      id="select-oncology-category-id"
                      className="select-oncology-category-id"
                      showSearch
                      placeholder={"Seleccione una opción"}
                      onChange={(value) =>
                        setOncologyCategoryIdLocalState(value)
                      }
                      value={oncologyCategoryIdLocalState}
                      loading={
                        allOncologyCategoriesDataLoading ||
                        allOncologyCategoriesDataFetching
                      }
                      allowClear
                      filterOption={(input, option) => {
                        return (
                          (option?.children &&
                            option.children
                              .toString()
                              .toUpperCase()
                              .includes(input.toUpperCase())) ||
                          false
                        );
                      }}
                      style={{ width: "100%" }}
                    >
                      {allOncologyCategoriesData?.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.onc_c_name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={14}>
                  <Form.Item
                    label="Nombre:"
                    name="name-event"
                    style={{ marginBottom: "16px" }}
                    rules={[
                      {
                        required: true,
                        message: "El nombre es obligatorio.",
                      },
                      {
                        pattern: /^[$a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/,
                        message:
                          "El nombre no puede tener numeros ni caracteres especiales.",
                      },
                    ]}
                  >
                    <Input
                      id="input-name-event"
                      name="input-name-event"
                      className="input-name-event"
                      onChange={(e) =>
                        setNameLocalState(e.target.value.toUpperCase())
                      }
                      placeholder="Escribe..."
                      value={nameLocalState}
                      style={{ width: "100%", textTransform: "uppercase" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {showUnitLocalState && (
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Unidad:"
                      name="unit-id"
                      rules={[
                        {
                          required: true,
                          message: "¡Por favor seleccione una opción!",
                        },
                      ]}
                      style={{
                        marginBottom: "16px",
                      }}
                    >
                      <Select
                        id="select-unit-id"
                        className="select-unit-id"
                        showSearch
                        placeholder={"Seleccione una opción"}
                        onChange={(value) => setUnitIdLocalState(value)}
                        value={unitIdLocalState}
                        loading={allUnitsDataLoading || allUnitsDataFetching}
                        allowClear
                        filterOption={(input, option) => {
                          return (
                            (option?.children &&
                              option.children
                                .toString()
                                .toUpperCase()
                                .includes(input.toUpperCase())) ||
                            false
                          );
                        }}
                        style={{ width: "100%" }}
                      >
                        {allUnitsData?.map((item: any) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.unit_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              )}

              {showRiskTypeLocalState && (
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Tipo de riesgo:"
                      name="risk-type-id"
                      rules={[
                        {
                          required: true,
                          message: "¡Por favor seleccione una opción!",
                        },
                      ]}
                      style={{
                        marginBottom: "16px",
                      }}
                    >
                      <Select
                        id="select-risk-type-id"
                        className="select-risk-type-id"
                        showSearch
                        placeholder={"Seleccione una opción"}
                        onChange={(value) => setRiskTypeIdLocalState(value)}
                        value={riskTypeIdLocalState}
                        loading={AllRiskTypesLoading || AllRiskTypesFetching}
                        allowClear
                        filterOption={(input, option) => {
                          return (
                            (option?.children &&
                              option.children
                                .toString()
                                .toUpperCase()
                                .includes(input.toUpperCase())) ||
                            false
                          );
                        }}
                        style={{ width: "100%" }}
                      >
                        {AllRiskTypesData?.map((item: any) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ris_t_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              )}

              {showRiskMaterializedLocalState && (
                <>
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        label="Riesgo materializado evento adverso:"
                        id="risk-materialized-adverse-event-id"
                        className="risk-materialized-adverse-event-id"
                        name="risk-materialized-adverse-event-id"
                        rules={[
                          {
                            required: true,
                            message: "¡Por favor seleccione una opción!",
                          },
                        ]}
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Select
                          id="select-risk-materialized-adverse-event-id"
                          className="select-risk-materialized-adverse-event-id"
                          showSearch
                          placeholder={"Seleccione una opción"}
                          onChange={(value) =>
                            setMaterializedAdverseEventIdLocalState(value)
                          }
                          value={materializedAdverseEventIdLocalState}
                          loading={
                            AllMaterializedAdverseEventsLoading ||
                            AllMaterializedAdverseEventsFetching
                          }
                          allowClear
                          filterOption={(input, option) => {
                            return (
                              (option?.children &&
                                option.children
                                  .toString()
                                  .toUpperCase()
                                  .includes(input.toUpperCase())) ||
                              false
                            );
                          }}
                          style={{ width: "100%" }}
                        >
                          {AllMaterializedAdverseEventsData?.map(
                            (item: any) => (
                              <Select.Option key={item.id} value={item.id}>
                                {item.eve_name} - {item.eventType.eve_t_name}
                              </Select.Option>
                            )
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        label="Riesgo materializado incidente:"
                        id="risk-materialized-incident-id"
                        className="risk-materialized-incident-id"
                        name="risk-materialized-incident-id"
                        rules={[
                          {
                            required: true,
                            message: "¡Por favor seleccione una opción!",
                          },
                        ]}
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Select
                          id="select-risk-materialized-incident-id"
                          className="select-risk-materialized-incident-id"
                          showSearch
                          placeholder={"Seleccione una opción"}
                          onChange={(value) =>
                            setMaterializedIncidentIdLocalState(value)
                          }
                          value={materializedIncidentIdLocalState}
                          loading={
                            AllMaterializedIncidentsLoading ||
                            AllMaterializedIncidentsFetching
                          }
                          allowClear
                          filterOption={(input, option) => {
                            return (
                              (option?.children &&
                                option.children
                                  .toString()
                                  .toUpperCase()
                                  .includes(input.toUpperCase())) ||
                              false
                            );
                          }}
                          style={{ width: "100%" }}
                        >
                          {AllMaterializedIncidentsData?.map((item: any) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item.eve_name} - {item.eventType.eve_t_name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              {showCharacterizationLocalState && (
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Caracterización:"
                      name="characterization-id"
                      rules={[
                        {
                          required: true,
                          message: "¡Por favor seleccione una opción!",
                        },
                      ]}
                      style={{
                        marginBottom: "16px",
                      }}
                    >
                      <Select
                        id="select-characterization-id"
                        className="select-characterization-id"
                        showSearch
                        placeholder={"Seleccione una opción"}
                        onChange={(value) =>
                          setCharacterizationCaseIdLocalState(value)
                        }
                        value={characterizationCaseIdLocalState}
                        loading={
                          allCharacterizationCasesDataLoading ||
                          allCharacterizationCasesDataFetching
                        }
                        allowClear
                        filterOption={(input, option) => {
                          return (
                            (option?.children &&
                              option.children
                                .toString()
                                .toUpperCase()
                                .includes(input.toUpperCase())) ||
                            false
                          );
                        }}
                        style={{ width: "100%" }}
                      >
                        {allCharacterizationCasesData?.map((item: any) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.cha_c_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              )}

              {showAssociatedMedicineOrDeviceLocalState && (
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="¿Asociado a medicamento?:"
                      id="associated-medicine"
                      className="associated-medicine"
                      name="associated-medicine"
                      style={{
                        marginBottom: "16px",
                      }}
                    >
                      <Switch
                        checked={isAssociatedMedicineLocalState}
                        onChange={(checked) =>
                          setIsAssociatedMedicineLocalState(checked)
                        }
                        checkedChildren={<FaCheck />}
                        unCheckedChildren={<TfiClose />}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="¿Asociado a dispositivo?:"
                      id="associated-device"
                      className="associated-device"
                      name="associated-device"
                      style={{
                        marginBottom: "16px",
                      }}
                    >
                      <Switch
                        checked={isAssociatedDeviceLocalState}
                        onChange={(checked) =>
                          setIsAssociatedDeviceLocalState(checked)
                        }
                        checkedChildren={<FaCheck />}
                        unCheckedChildren={<TfiClose />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )}

              {showSubclassificationPatologyLocalState && (
                <>
                  <Row gutter={24}>
                    <Col span={6}>
                      <Form.Item
                        label="Estancia:"
                        id="stay-switch"
                        className="stay-switch"
                        name="stay-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isStayLocalState}
                          onChange={(checked) => setIsStayLocalState(checked)}
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Salud mental:"
                        id="mental-health-switch"
                        className="mental-health-switch"
                        name="mental-health-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isMentalHealthLocalState}
                          onChange={(checked) =>
                            setIsMentalHealthLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Salud pública:"
                        id="public-health-switch"
                        className="public-health-switch"
                        name="public-health-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isPublicHealthLocalState}
                          onChange={(checked) =>
                            setIsPublicHealthLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Pat. oncológica:"
                        id="oncological-pathology-switch"
                        className="oncological-pathology-switch"
                        name="oncological-pathology-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isOncologicalPathologyLocalState}
                          onChange={(checked) =>
                            setIsOncologicalPathologyLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={6}>
                      <Form.Item
                        label="Medicamentos:"
                        id="medicine-switch"
                        className="medicine-switch"
                        name="medicine-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isMedicinesLocalState}
                          onChange={(checked) =>
                            setIsMedicinesLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Dispositivos:"
                        id="device-switch"
                        className="device-switch"
                        name="device-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isDevicesLocalState}
                          onChange={(checked) =>
                            setIsDevicesLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Quimioterapia:"
                        id="chemotherapy-switch"
                        className="chemotherapy-switch"
                        name="chemotherapy-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isChemotherapyLocalState}
                          onChange={(checked) =>
                            setIsChemotherapyLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Cerebrales:"
                        id="cerebral-switch"
                        className="cerebral-switch"
                        name="cerebral-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isCerebralLocalState}
                          onChange={(checked) =>
                            setIsCerebralLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={6}>
                      <Form.Item
                        label="Respiratorias:"
                        id="respiratory-switch"
                        className="respiratory-switch"
                        name="respiratory-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isRespiratoryLocalState}
                          onChange={(checked) =>
                            setIsRespiratoryLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Cardiovascular:"
                        id="cardiovascular-switch"
                        className="cardiovascular-switch"
                        name="cardiovascular-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isCardiovascularLocalState}
                          onChange={(checked) =>
                            setIsCardiovascularLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Prostata:"
                        id="prostate-switch"
                        className="prostate-switch"
                        name="prostate-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isProstateLocalState}
                          onChange={(checked) =>
                            setIsProstateLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Renal:"
                        id="renal-switch"
                        className="renal-switch"
                        name="renal-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isRenalLocalState}
                          onChange={(checked) => setIsRenalLocalState(checked)}
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={6}>
                      <Form.Item
                        label="Gastrointestinales:"
                        id="gastrointestinal-switch"
                        className="gastrointestinal-switch"
                        name="gastrointestinal-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isGastrointestinalState}
                          onChange={(checked) =>
                            setIsGastrointestinalLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Metabólicas:"
                        id="metabolic-switch"
                        className="metabolic-switch"
                        name="metabolic-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isMetabolicState}
                          onChange={(checked) =>
                            setIsMetabolicLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Inmunológicas:"
                        id="immunological-switch"
                        className="immunological-switch"
                        name="immunological-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isImmunologicalState}
                          onChange={(checked) =>
                            setIsImmunologicalLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Nutricionales:"
                        id="nutritional-switch"
                        className="nutritional-switch"
                        name="nutritional-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isNutritionalState}
                          onChange={(checked) =>
                            setIsNutritionalLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={6}>
                      <Form.Item
                        label="Transfusional:"
                        id="transfusional-switch"
                        className="transfusional-switch"
                        name="transfusional-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isTransfusionalState}
                          onChange={(checked) =>
                            setIsTransfusionalLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Alt. en paraclínicos:"
                        id="changes-paraclinical-switch"
                        className="changes-paraclinical-switch"
                        name="changes-paraclinical-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isChangesParaclinicalLocalState}
                          onChange={(checked) =>
                            setIsChangesParaclinicalLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Cirugía:"
                        id="surgery-switch"
                        className="surgery-switch"
                        name="surgery-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isSurgeryLocalState}
                          onChange={(checked) =>
                            setIsSurgeryLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Procedimientos:"
                        id="procedures-switch"
                        className="procedures-switch"
                        name="procedures-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isProceduresLocalState}
                          onChange={(checked) =>
                            setIsProceduresLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={6}>
                      <Form.Item
                        label="Infecciosos:"
                        id="infectious-switch"
                        className="infectious-switch"
                        name="infectious-switch"
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <Switch
                          checked={isInfectiousLocalState}
                          onChange={(checked) =>
                            setIsInfectiousLocalState(checked)
                          }
                          checkedChildren={<FaCheck />}
                          unCheckedChildren={<TfiClose />}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              <Form.Item
                style={{
                  textAlign: "center",
                  marginTop: "16px",
                  marginBottom: 0,
                }}
              >
                <CustomButton
                  classNameCustomButton="edit-service-button"
                  idCustomButton="edit-service-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateEventDataLoading ? <BiEdit /> : <LoadingOutlined />
                  }
                  disabledCustomButton={
                    hasChanges() && !updateEventDataLoading ? false : true
                  }
                  onClickCustomButton={() => ({})}
                  styleCustomButton={{
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                  iconPositionCustomButton={"end"}
                  sizeCustomButton={"small"}
                />
              </Form.Item>
            </Form>
          </>
        }
      />
    </>
  );
};

export default EditEventButtonComponent;
