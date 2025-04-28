"use client";

import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import {
  PlusOutlined,
  ClearOutlined,
  SaveOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { AutoComplete, Col, Form, Input, Row, Select, Switch } from "antd";

import { CaseTypeReportEnum } from "@/utils/enums/case_type_color.enum";

import {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetAllMaterializedAdverseEventsQuery,
  useGetAllMaterializedIncidentsQuery,
} from "@/redux/apis/event/eventApi";
import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";
import { useGetAllEventTypesQuery } from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllOncologyCategoriesQuery } from "@/redux/apis/oncology_category/oncologyCategoryApi";
import { useGetAllCharacterizationCasesQuery } from "@/redux/apis/characterization_case/charecterizationCaseApi";
import { useGetAllRiskTypesQuery } from "@/redux/apis/risk_type/riskTypeApi";
import { FaCheck } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";

const CreateEventButtonComponent: React.FC<{ onNewRegister: () => void }> = ({
  onNewRegister,
}) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [eventTypeIdLocalState, setEventTypeIdLocalState] = useState(0);
  const [unitIdLocalState, setUnitIdLocalState] = useState(0);
  const [oncologyCategoryIdLocalState, setOncologyCategoryIdLocalState] =
    useState(0);
  const [
    characterizationCaseIdLocalState,
    setCharacterizationCaseIdLocalState,
  ] = useState(0);
  const [riskTypeIdLocalState, setRiskTypeIdLocalState] = useState(0);
  const [
    materializedAdverseEventIdLocalState,
    setMaterializedAdverseEventIdLocalState,
  ] = useState(0);
  const [
    materializedIncidentIdLocalState,
    setMaterializedIncidentIdLocalState,
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

  const [options, setOptions] = useState<any[]>([]);

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [createEvent, { isLoading: createdEventDataLoading }] =
    useCreateEventMutation({
      fixedCacheKey: "createEvent",
    });

  const {
    data: allEventsData,
    isFetching: allEventsDataFetching,
    isLoading: allEventsDataLoading,
    error: allEventsDataError,
  } = useGetAllEventsQuery(null);

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

  const handleClickClean = () => {
    form.resetFields();
    setNameLocalState("");
    setUnitIdLocalState(0);
    setRiskTypeIdLocalState(0);
    setMaterializedAdverseEventIdLocalState(0);
    setMaterializedIncidentIdLocalState(0);
    setEventTypeIdLocalState(0);
    setOncologyCategoryIdLocalState(0);
    setCharacterizationCaseIdLocalState(0);
    setIsAssociatedMedicineLocalState(false);
    setIsAssociatedDeviceLocalState(false);
    setShowUnitLocalState(false);
    setShowRiskTypeLocalState(false);
    setShowRiskMaterializedLocalState(false);
    setShowCharacterizationLocalState(false);
    setShowSubclassificationPatologyLocalState(false);
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
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions =
        allEventsData
          ?.filter((types) =>
            types.eve_name.toUpperCase().includes(value.toUpperCase())
          )
          .map((type) => ({
            value: type.eve_name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createEvent({
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
        handleClickClean();
        setIsModalOpenLocalState(false);
        onNewRegister();
        AllMaterializedAdverseEventsRefetch();
        AllMaterializedIncidentsRefetch();
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
    }
  };

  const onChangeEventType = (value: number) => {
    setShowUnitLocalState(false);
    setShowRiskTypeLocalState(false);
    setShowRiskMaterializedLocalState(false);
    setShowCharacterizationLocalState(false);
    setEventTypeIdLocalState(0);
    setUnitIdLocalState(0);
    setRiskTypeIdLocalState(0);
    setMaterializedAdverseEventIdLocalState(0);
    setMaterializedIncidentIdLocalState(0);
    setCharacterizationCaseIdLocalState(0);
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
    }
  };

  return (
    <>
      <CustomButton
        classNameCustomButton="open-modal-button"
        idCustomButton="open-modal-button"
        titleCustomButton="Nuevo"
        typeCustomButton="primary"
        htmlTypeCustomButton="button"
        iconCustomButton={<PlusOutlined />}
        onClickCustomButton={() => setIsModalOpenLocalState(true)}
        styleCustomButton={{
          marginLeft: "16px",
          background: "#f28322",
          color: "#ffffff",
          borderRadius: "16px",
        }}
        iconPositionCustomButton={"end"}
        sizeCustomButton={"small"}
      />
      <CustomModalNoContent
        key={"custom-modal-create-event"}
        widthCustomModalNoContent={"80%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="create-event-form"
              name="create-event-form"
              className="create-event-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label="Estrategia:"
                    id="event-type-id"
                    className="event-type-id"
                    name="event-type-id"
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor seleccione una opción!",
                      },
                    ]}
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
                    id="oncology-category-id"
                    className="oncology-category-id"
                    name="oncology-category-id"
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor seleccione una opción!",
                      },
                    ]}
                    style={{ marginBottom: "16px" }}
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
                    id="event-name"
                    className="event-name"
                    name="event-name"
                    style={{
                      marginBottom: "16px",
                    }}
                    normalize={(value) => {
                      if (!value) return "";

                      const filteredValue = value
                        .toUpperCase()
                        .replace(/[^A-ZÁÉÍÓÚÑ0-9\s]/g, "");

                      return filteredValue;
                    }}
                    rules={[
                      {
                        required: true,
                        message: "El nombre es obligatorio.",
                      },
                      {
                        min: 5,
                        message: "El nombre debe tener al menos 5 caracteres",
                      },
                      {
                        pattern: /^[A-ZÁÉÍÓÚÑ\s]*$/,
                        message:
                          "El nombre solo puede contener letras mayúsculas con tildes y espacios",
                      },
                    ]}
                  >
                    <AutoComplete
                      id="name-event"
                      options={options}
                      style={{ width: "100%", textAlign: "start" }}
                      onSearch={handleSearch}
                      placeholder="Escribe..."
                      value={nameLocalState}
                      onChange={(value) =>
                        setNameLocalState(value.toUpperCase())
                      }
                      filterOption={false}
                    >
                      <Input
                        id="input-name-event"
                        type="text"
                        autoComplete="off"
                      />
                    </AutoComplete>
                  </Form.Item>
                </Col>
              </Row>

              {showUnitLocalState && (
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Unidad:"
                      id="unit-id"
                      className="unit-id"
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
                      id="risk-type-id"
                      className="risk-type-id"
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
                      id="characterization-id"
                      className="characterization-id"
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
                  classNameCustomButton="clean-event-button"
                  idCustomButton="clean-event-button"
                  titleCustomButton="Limpiar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="button"
                  iconCustomButton={<ClearOutlined />}
                  onClickCustomButton={handleClickClean}
                  styleCustomButton={{
                    color: "#ffffff",
                    background: "#DC1600",
                    marginRight: "16px",
                    borderRadius: "16px",
                  }}
                  iconPositionCustomButton={"end"}
                  sizeCustomButton={"small"}
                />
                <CustomButton
                  classNameCustomButton="create-event-button"
                  idCustomButton="create-event-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdEventDataLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={!createdEventDataLoading ? false : true}
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
export default CreateEventButtonComponent;
