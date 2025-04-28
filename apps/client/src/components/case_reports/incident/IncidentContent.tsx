"use client";

import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hook";

import { validateRequiredDate } from "@/helpers/validate_required_values/validate_required_files";
// import { getSeverityClasificationColor } from "@/helpers/severity_clasification_colors/severity_clasification_colors";

import { DescriptionOtherEnum } from "@/utils/enums/description_other";
import { OriginsEnum } from "@/utils/enums/origins.enums";

import ContentValidateExistenceCases from "@/components/case_reports/content_validate_existence_cases/ContentValidateExistenceCases";
import ContentReportGeneratedSuccessfully from "@/components/case_reports/content_report_generated_successfully/ContentReportGeneratedSuccessfully";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import CustomDatePicker from "@/components/common/custom_date_picker/CustomDatePicker";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import PatientForm from "../patient_form/PatientForm";
import ReporterForm from "../reporter_form/ReporterForm";
import Content_button_back_router from "@/components/shared/content_button_back_router/Content_button_back_router";

import {
  Card,
  Col,
  DatePickerProps,
  Form,
  Input,
  List,
  Radio,
  Row,
  Select,
  Switch,
} from "antd";
import { Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";

import { LoadingOutlined } from "@ant-design/icons";
import {
  FaDeleteLeft,
  FaMagnifyingGlass,
  FaRegCircleCheck,
} from "react-icons/fa6";
import { MdOutlineDescription } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import { useGetAllOriginsQuery } from "@/redux/apis/origin/originApi";
import { useGetAllSubOriginsByOriginIdQuery } from "@/redux/apis/sub_origin/subOriginApi";
import { useGetAllServicesQuery } from "@/redux/apis/service/serviceApi";
// import { useGetAllSeverityClasificationsQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";
import { useGetEventTypeByCaseTypeIdQuery } from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllEventsByEventTypeIdQuery } from "@/redux/apis/event/eventApi";
import { useFindSimilarsCaseReportValidateMutation } from "@/redux/apis/case_report_validate/caseReportValidateApi";
import { useFindPatientMutation } from "@/redux/apis/patient/patientApi";
import { useCreatecaseReportOriginalMutation } from "@/redux/apis/case_report_original/caseReportOriginalApi";
import { useGetExternalMedicineQuery } from "@/redux/apis/medicine/medicineApi";
import { useGetAllDocumentTypesQuery } from "@/redux/apis/document-type/documentTypeApi";
import { useGetAllRiskLevelsQuery } from "@/redux/apis/risk_level/riskLevelApi";
import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";
import { useGetExternalDeviceQuery } from "@/redux/apis/device/deviceApi";

const IncidentContent = () => {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  const { Title } = Typography;

  const [form] = Form.useForm();

  const [originIdLocalState, setOriginIdLocalState] = useState(0);
  const [subOriginIdLocalState, setSubOriginIdLocalState] = useState(0);
  const [reportingServiceIdLocalState, setReportingServiceIdLocalState] =
    useState(0);
  const [originServiceIdLocalState, setOriginServiceIdLocalState] = useState(0);
  // const [
  //   severityClasificationIdLocalState,
  //   setSeverityClasificationIdLocalState,
  // ] = useState(0);
  const [eventTypeIdLocalState, setEventTypeIdLocalState] = useState(0);
  const [eventIdLocalState, setEventIdLocalState] = useState(0);
  const [descriptionOthersLocalState, setDescriptionOthersLocalState] =
    useState("");
  const [showDescriptionOthersLocalState, setShowDescriptionOthersLocalState] =
    useState(false);
  const [riskLevelIdLocalState, setRiskLevelIdLocalState] = useState(0);

  const [isAnonimousReporterLocalState, setIsAnonimousReporterLocalState] =
    useState(false);
  const [identificationUserLocalState, setIdentificationUserLocalState] =
    useState("");
  const [fullNameUserLocalState, setFullNameUserLocalState] = useState("");
  const [chargeUserLocalState, setChargeUserLocalState] = useState("");

  const [dateCaseLocalState, setDateCaseLocalState] = useState("");
  const [identificationPatientLocalState, setIdentificationPatientLocalState] =
    useState("");
  const [
    identificationTypePatientLocalState,
    setIdentificationTypePatientLocalState,
  ] = useState("");
  const [firstNamePatientLocalState, setFirstNamePatientLocalState] =
    useState("");
  const [secondNamePatientLocalState, setSecondNamePatientLocalState] =
    useState("");
  const [firstLastNamePatientLocalState, setFirstLastNamePatientLocalState] =
    useState("");
  const [secondLastNamePatientLocalState, setSecondLastNamePatientLocalState] =
    useState("");
  const [agePatientLocalState, setAgePatientLocalState] = useState("");
  const [genderPatientLocalState, setGenderPatientLocalState] = useState("");
  const [epsPatientLocalState, setEpsPatientLocalState] = useState("");
  const [diagnosticCodeLocalState, setDiagnosticCodeLocalState] = useState("");
  const [diagnosticDescriptionLocalState, setDiagnosticDescriptionLocalState] =
    useState("");
  const [consecutivePatientLocalState, setConsecutivePatientLocalState] =
    useState(0);
  const [folioPatientLocalState, setFolioPatientLocalState] = useState("");

  const [searchMedicineLocalState, setSearchMedicineLocalState] = useState("");
  const [selectedMedicinesLocalState, setSelectedMedicinesLocalState] =
    useState<MedicineExternal[]>([]);
  const [isAssociatedMedicinesShow, setIsAssociatedMedicinesShow] =
    useState(false);

  const [searchDeviceLocalState, setSearchDeviceLocalState] = useState("");
  const [selectedDevicesLocalState, setSelectedDevicesLocalState] = useState<
    DeviceExternal[]
  >([]);
  const [isAssociatedDevicesShow, setIsAssociatedDevicesShow] = useState(false);

  const [descriptionIncidentLocalState, setDescriptionIncidentLocalState] =
    useState("");
  const [inmediateActionsLocalState, setInmediateActionsLocalState] =
    useState("");

  const [findSimilarReportDataLocalState, setFindSimilarReportDataLocalState] =
    useState([]);
  const [
    findAdmissionsPatientDataLocalState,
    setFindAdmissionsPatientDataLocalState,
  ] = useState<Admission[]>([]);

  const [
    findAvailableFoliosDataLocalState,
    setFindAvailableFoliosDataLocalState,
  ] = useState<string[]>([]);

  const [
    messageReportGeneratedSuccessfullLocalState,
    setMessageReportGeneratedSuccessfullLocalState,
  ] = useState("");

  const [isPatientFound, setIsPatientFound] = useState(false);
  const [isModalVisibleValidateExistence, setIsModalVisibleValidateExistence] =
    useState(false);
  const [
    isModalVisibleReportGeneratedSuccessfully,
    setIsModalVisibleReportGeneratedSuccessfully,
  ] = useState(false);

  const idOfCaseTypeState = useAppSelector(
    (state) => state.changeOfCaseType.idOfCaseTypeIncident
  );

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const nameUserSessionState = useAppSelector(
    (state) => state.userSession.name
  );

  let userEmail = session?.user.email;

  const {
    data: allOriginsData,
    isFetching: allOriginsDataFetching,
    isLoading: allOriginsDataLoading,
    error: allOriginsDataError,
    refetch: allOriginsDataRefetch,
  } = useGetAllOriginsQuery(null);

  const {
    data: allSubOriginsByOriginIdData,
    isFetching: allSubOriginsByOriginIdDataFetching,
    isLoading: allSubOriginsByOriginIdDataLoading,
    error: allSubOriginsByOriginIdDataError,
    refetch: allSubOriginsByOriginIdDataRefetch,
  } = useGetAllSubOriginsByOriginIdQuery(originIdLocalState, {
    skip: !originIdLocalState,
  });

  const {
    data: allServicesData,
    isFetching: allServicesDataFetching,
    isLoading: allServicesDataLoading,
    error: allServicesByDataError,
    refetch: allServicesDataRefetch,
  } = useGetAllServicesQuery(null);

  // const {
  //   data: allSeverityClasificationsData,
  //   isFetching: allSeverityClasificationsDataFetching,
  //   isLoading: allSeverityClasificationsDataLoading,
  //   error: allSeverityClasificationsDataError,
  //   refetch: allSeverityClasificationsDataRefetch,
  // } = useGetAllSeverityClasificationsQuery(null);

  const {
    data: allEventTypeByCaseTypeIdData,
    isFetching: allEventTypeByCaseTypeIdDataFetching,
    isLoading: allEventTypeByCaseTypeIdDataLoading,
    error: allEventTypeByCaseTypeIdDataError,
    refetch: allEventTypeByCaseTypeIdDataRefetch,
  } = useGetEventTypeByCaseTypeIdQuery(idOfCaseTypeState);

  const {
    data: allEventsByEventTypeIdData,
    isFetching: allEventsByEventTypeIdDataFetching,
    isLoading: allEventsByEventTypeIdDataLoading,
    error: allEventsByEventTypeIdDataError,
    refetch: allEventsByEventTypeIdDataRefetch,
  } = useGetAllEventsByEventTypeIdQuery(eventTypeIdLocalState, {
    skip: !eventTypeIdLocalState,
  });

  const {
    data: allRiskLevelData,
    isFetching: allRiskLevelDataFetching,
    isLoading: allRiskLevelDataLoading,
    error: allRiskLevelDataError,
    refetch: allRiskLevelDataRefetch,
  } = useGetAllRiskLevelsQuery(null);

  const {
    data: allDocumentTypeData,
    isFetching: allDocumentTypeDataFetching,
    isLoading: allDocumentTypeDataLoading,
    error: allDocumentTypeDataError,
    refetch: allDocumentTypeDataRefetch,
  } = useGetAllDocumentTypesQuery(null);

  const {
    data: userVerifyData,
    isFetching: userVerifyFetching,
    isLoading: userVerifyLoading,
    error: userVerifyError,
  } = useGetUserActiveByIdNumberQuery(Number(idNumberUserSessionState), {
    skip: !idNumberUserSessionState,
  });

  const [getPatient, { isLoading: patientDataLoading }] =
    useFindPatientMutation();

  const [findSimilarReports] = useFindSimilarsCaseReportValidateMutation();

  const [
    createCaseReportOriginal,
    { isLoading: createdCaseReportOriginalDataLoading },
  ] = useCreatecaseReportOriginalMutation();

  const {
    data: allMedicinesData,
    isFetching: allMedicinesDataFetching,
    isLoading: allMedicinesDataLoading,
    error: allMedicinesDataError,
    refetch: allMedicinesDataRefetch,
  } = useGetExternalMedicineQuery(searchMedicineLocalState, {
    skip: !searchMedicineLocalState,
  });

  const {
    data: allDevicesData,
    isFetching: allDevicesDataFetching,
    isLoading: allDevicesDataLoading,
    error: allDevicesDataError,
    refetch: allDevicesDataRefetch,
  } = useGetExternalDeviceQuery(searchDeviceLocalState, {
    skip: !searchDeviceLocalState,
  });

  useEffect(() => {
    if (
      (userVerifyData || (idNumberUserSessionState && nameUserSessionState)) &&
      !identificationUserLocalState &&
      !fullNameUserLocalState
    ) {
      const userId = userVerifyData?.id_number || idNumberUserSessionState;
      const userFullName =
        userVerifyData?.name && userVerifyData?.last_name
          ? `${userVerifyData.name} ${userVerifyData.last_name}`
          : nameUserSessionState;

      if (userId) {
        setIdentificationUserLocalState(userId.toString());
      }
      if (userFullName) {
        setFullNameUserLocalState(userFullName);
      }

      // setChargeUserLocalState(userVerifyData.collaborator_position || "");

      // form.setFieldsValue({
      //   "identification-user": userVerifyData.id_number!.toString() || "",
      //   "full-name-user": `${userVerifyData.name || ""} ${userVerifyData.last_name || ""}`,
      //   "position-user": userVerifyData.collaborator_position || "",
      // });
    }

    if (allOriginsData) {
      const selectOrigin = allOriginsData.find(
        (item: Origin) => item.orig_name === OriginsEnum.INTERNAL_SOURCE
      );

      if (selectOrigin) {
        setOriginIdLocalState(selectOrigin.id);
        form.setFieldsValue({ "origin-id": selectOrigin.id });
      }
    }
  }, [userVerifyData, allOriginsData]);

  const handleSelectMedicineChange = (value: string) => {
    const medicine = allMedicinesData?.data.find(
      (med: MedicineExternal) => med.drugCode === value
    );
    if (
      medicine &&
      !selectedMedicinesLocalState.find((med) => med.drugCode === value)
    ) {
      setSelectedMedicinesLocalState([
        ...selectedMedicinesLocalState,
        medicine,
      ]);
    }
  };

  const handleSelectDeviceChange = (value: string) => {
    const device = allDevicesData?.data.find(
      (dev: DeviceExternal) => dev.deviceCode === value
    );

    if (
      device &&
      !selectedDevicesLocalState.find((dev) => dev.deviceCode === value)
    ) {
      setSelectedDevicesLocalState([...selectedDevicesLocalState, device]);
    }
  };

  const onChangeDateCase: DatePickerProps["onChange"] = (date, dateString) => {
    setDateCaseLocalState(dateString.toString());
  };

  const handleChangeEvent = async (value: number) => {
    setEventIdLocalState(value);
    setDescriptionOthersLocalState("");
    setFindSimilarReportDataLocalState([]);
    setIsAssociatedMedicinesShow(false);
    setSelectedMedicinesLocalState([]);
    setSearchMedicineLocalState("");
    setIsAssociatedDevicesShow(false);
    setSelectedDevicesLocalState([]);
    setSearchDeviceLocalState("");

    form.setFieldsValue({
      "description-others": undefined,
    });

    form.setFieldsValue({
      "medicines-name": undefined,
    });

    form.setFieldsValue({
      "devices-name": undefined,
    });

    try {
      const response = await findSimilarReports({
        findReportsSimilar: {
          val_cr_doctypepatient: identificationTypePatientLocalState,
          val_cr_documentpatient: identificationPatientLocalState,
          val_cr_casetype_id_fk: idOfCaseTypeState,
          val_cr_eventtype_id_fk: eventTypeIdLocalState,
          val_cr_event_id_fk: value,
          val_cr_reportingservice_id_fk: reportingServiceIdLocalState,
        },
        months: 1,
      });

      if (response && response.data) {
        const responseData = response.data.data;

        dispatch(
          setShowMessage({ type: "info", content: response.data.message })
        );

        setFindSimilarReportDataLocalState(responseData || []);
      }
    } catch (error) {
      console.log("Error: ", error);
    }

    const selectedOptionEvent = allEventsByEventTypeIdData?.find(
      (item) => item.id === value
    );

    setShowDescriptionOthersLocalState(
      selectedOptionEvent?.eve_name ===
        DescriptionOtherEnum.DESCRIPTION_EVENT_OTHER
    );

    setIsAssociatedMedicinesShow(selectedOptionEvent?.eve_medicineassociated!);
    setIsAssociatedDevicesShow(selectedOptionEvent?.eve_deviceassociated!);
  };

  const handleChangeConsecutive = (value: number) => {
    setConsecutivePatientLocalState(value);

    setFolioPatientLocalState("");
    form.setFieldsValue({ "folio-patient": undefined });

    const selectedAdmision = findAdmissionsPatientDataLocalState.find(
      (admission: any) => admission.patAdmConsecutive === value
    );

    if (selectedAdmision) {
      setFindAvailableFoliosDataLocalState(selectedAdmision.folios);
    } else {
      setFindAvailableFoliosDataLocalState([]);
    }
  };

  const onCleanPatientForm = () => {
    setFirstNamePatientLocalState("");
    setSecondNamePatientLocalState("");
    setFirstLastNamePatientLocalState("");
    setSecondLastNamePatientLocalState("");
    setAgePatientLocalState("");
    setGenderPatientLocalState("");
    setEpsPatientLocalState("");
    setDiagnosticCodeLocalState("");
    setDiagnosticDescriptionLocalState("");
    setConsecutivePatientLocalState(0);
    setFolioPatientLocalState("");
    setFindAdmissionsPatientDataLocalState([]);
    setEventTypeIdLocalState(0);
    setEventIdLocalState(0);
    setDescriptionOthersLocalState("");

    form.setFieldsValue({
      "first-name-patient": undefined,
      "second-name-patient": undefined,
      "first-last-name-patient": undefined,
      "second-last-name-patient": undefined,
      "age-patient": undefined,
      "gender-patient": undefined,
      "eps-patient": undefined,
      "diagnostic-code-patient": undefined,
      "diagnostic-description-patient": undefined,
      "consecutive-patient": undefined,
      "folio-patient": undefined,
      "event-id": undefined,
      "event-type-id": undefined,
      "description-others": undefined,
    });
  };

  const onCleanAllForm = () => {
    onCleanPatientForm();

    setDateCaseLocalState("");
    setSubOriginIdLocalState(0);
    setReportingServiceIdLocalState(0);
    setOriginServiceIdLocalState(0);
    setIdentificationTypePatientLocalState("");
    setIdentificationPatientLocalState("");
    setRiskLevelIdLocalState(0);
    // setSeverityClasificationIdLocalState(0);
    setSelectedMedicinesLocalState([]);
    setSelectedDevicesLocalState([]);
    setDescriptionIncidentLocalState("");
    setInmediateActionsLocalState("");
    setFindSimilarReportDataLocalState([]);

    form.resetFields();
    form.setFieldsValue({ "origin-id": originIdLocalState });
  };

  const onResetEventTypeAndEvent = () => {
    setEventTypeIdLocalState(0);
    setEventIdLocalState(0);
    setDescriptionOthersLocalState("");
    setShowDescriptionOthersLocalState(false);
    setFindSimilarReportDataLocalState([]);

    form.setFieldsValue({
      "event-id": undefined,
      "event-type-id": undefined,
      "description-others": undefined,
    });
  };

  const handleClickConfirmValidateExistenceCase = () => {
    setIsModalVisibleValidateExistence(false);
  };

  const handleClickFindPatientData = async () => {
    onResetEventTypeAndEvent();
    try {
      const response: any = await getPatient({
        idNumber: identificationPatientLocalState,
        type: identificationTypePatientLocalState,
      });

      if (response?.data) {
        setIsPatientFound(true);
        setFindAdmissionsPatientDataLocalState(response.data.admissions);

        setFirstNamePatientLocalState(response.data.patientFirstName);
        setSecondNamePatientLocalState(response.data.patientSecondName);
        setFirstLastNamePatientLocalState(response.data.patientSurname);
        setSecondLastNamePatientLocalState(response.data.patientLastname);
        setAgePatientLocalState(response.data.patientAge);
        setGenderPatientLocalState(response.data.patientGender);
        setEpsPatientLocalState(response.data.patientCompanyDescription);
        setDiagnosticCodeLocalState(response.data.diagnosisCode);
        setDiagnosticDescriptionLocalState(response.data.diagnosisDescription);

        form.setFieldsValue({
          "first-name-patient": response.data.patientFirstName,
          "second-name-patient": response.data.patientSecondName,
          "first-last-name-patient": response.data.patientSurname,
          "second-last-name-patient": response.data.patientLastname,
          "age-patient": response.data.patientAge,
          "gender-patient": response.data.patientGender,
          "eps-patient": response.data.patientCompanyDescription,
          "diagnostic-code-patient": response.data.diagnosisCode,
          "diagnostic-description-patient": response.data.diagnosisDescription,
        });
      } else if (response?.error) {
        dispatch(
          setShowMessage({
            type: "error",
            content: response.error.data.message,
          })
        );
        setIsPatientFound(false);
        onCleanPatientForm();
        setFindSimilarReportDataLocalState([]);
      } else {
        dispatch(
          setShowMessage({
            type: "error",
            content: "¡Error en la petición!",
          })
        );
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleClickSubmit = async () => {
    try {
      const formattedMedicines = selectedMedicinesLocalState.map(
        (medicine) => ({
          med_code: medicine.drugCode,
          med_name: medicine.drugDescription,
        })
      );

      const formattedDevices = selectedDevicesLocalState.map((device) => ({
        dev_code: device.deviceCode,
        dev_name: device.deviceDescription,
      }));

      const response: any = await createCaseReportOriginal({
        userEmail: userVerifyData?.principal_email
          ? userVerifyData?.principal_email
          : userEmail,
        userName:
          userVerifyData?.name && userVerifyData?.last_name
            ? `${userVerifyData.name} ${userVerifyData.last_name}`
            : nameUserSessionState,
        newReportOriginal: {
          ori_cr_dateofcase: dateCaseLocalState,
          ori_cr_casetype_id_fk: idOfCaseTypeState,
          ori_cr_fullnamereporter: !isAnonimousReporterLocalState
            ? fullNameUserLocalState
            : null,
          ori_cr_documentreporter: !isAnonimousReporterLocalState
            ? identificationUserLocalState
            : null,
          ori_cr_anonymoususer: isAnonimousReporterLocalState,
          ori_cr_origin_id_fk: originIdLocalState,
          ori_cr_suborigin_id_fk: subOriginIdLocalState,
          ori_cr_originservice_id_fk: originServiceIdLocalState,
          ori_cr_reportingservice_id_fk: reportingServiceIdLocalState,
          ori_cr_documentpatient: identificationPatientLocalState,
          ori_cr_doctypepatient: identificationTypePatientLocalState,
          ori_cr_firstnamepatient: firstNamePatientLocalState,
          ori_cr_secondnamepatient: secondNamePatientLocalState,
          ori_cr_firstlastnamepatient: firstLastNamePatientLocalState,
          ori_cr_secondlastnamepatient: secondLastNamePatientLocalState,
          ori_cr_agepatient: agePatientLocalState,
          ori_cr_genderpatient: genderPatientLocalState,
          ori_cr_epspatient: epsPatientLocalState,
          ori_cr_diagnosticcodepatient: diagnosticCodeLocalState,
          ori_cr_diagnosticdescriptionpatient: diagnosticDescriptionLocalState,
          ori_cr_admconsecutivepatient: consecutivePatientLocalState
            ? consecutivePatientLocalState
            : null,
          ori_cr_foliopatient: folioPatientLocalState
            ? folioPatientLocalState
            : null,
          // ori_cr_severityclasif_id_fk: severityClasificationIdLocalState,
          ori_cr_eventtype_id_fk: eventTypeIdLocalState,
          ori_cr_event_id_fk: eventIdLocalState,
          ori_cr_descriptionothers: descriptionOthersLocalState
            ? descriptionOthersLocalState
            : null,
          ori_cr_risklevel_id_fk: riskLevelIdLocalState,
          ori_cr_description: descriptionIncidentLocalState,
          ori_cr_inmediateaction: inmediateActionsLocalState
            ? inmediateActionsLocalState
            : null,
          medicine: isAssociatedMedicinesShow ? formattedMedicines : [],
          device: isAssociatedDevicesShow ? formattedDevices : [],
        },
      });

      let dataError = response.error;
      let validationData = response.data?.message;
      let responseData = response.data;

      if (dataError || !responseData) {
        setIsModalVisibleReportGeneratedSuccessfully(false);
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
        setMessageReportGeneratedSuccessfullLocalState(response.data.message);
        setIsModalVisibleReportGeneratedSuccessfully(true);
        setIsPatientFound(false);
        onCleanAllForm();
      }
    } catch (error) {
      setIsModalVisibleReportGeneratedSuccessfully(false);
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
    }
  };

  return (
    <div className="case-report-incident" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      <Form
        form={form}
        id="create-case-report-form"
        name="create-case-report-form"
        className="create-report-form"
        layout="vertical"
        initialValues={{ remember: false }}
        autoComplete="off"
        onFinish={handleClickSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col>
            <Form.Item
              label="Fuente"
              id="origin-id"
              className="origin-id"
              name="origin-id"
              rules={[
                {
                  required: false,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
              style={{ minWidth: "200px", marginBottom: 0 }}
            >
              <Select
                placeholder="Seleccione una opción"
                onChange={(value) => {
                  setOriginIdLocalState(value);
                  setSubOriginIdLocalState(0);

                  form.setFieldsValue({ "sub-origin-id": undefined });
                  form.validateFields(["sub-origin-id"]);
                }}
                value={originIdLocalState}
                allowClear
                size="small"
                disabled={true}
                loading={allOriginsDataLoading || allOriginsDataFetching}
                style={{ width: "100%" }}
              >
                {Array.isArray(allOriginsData) &&
                  allOriginsData?.map((item: Origin) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.orig_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Sub fuente"
              id="sub-origin-id"
              className="sub-origin-id"
              name="sub-origin-id"
              rules={[
                {
                  required: true,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
              style={{ minWidth: "200px", marginBottom: 0 }}
            >
              <Select
                placeholder={"Seleccione una opción"}
                onChange={(value) => setSubOriginIdLocalState(value)}
                value={subOriginIdLocalState || undefined}
                allowClear
                size="small"
                disabled={
                  originIdLocalState === 0 || originIdLocalState === undefined
                }
                loading={
                  allSubOriginsByOriginIdDataLoading ||
                  allSubOriginsByOriginIdDataFetching
                }
                style={{ width: "100%" }}
              >
                {Array.isArray(allSubOriginsByOriginIdData) &&
                  allSubOriginsByOriginIdData?.map((item: SubOrigin) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.sub_o_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Title
            level={5}
            style={{
              color: "#002140",
              marginTop: "10px",
              marginRight: "10px",
            }}
          >
            ¿Deseas enviar el reporte de forma anónima?
          </Title>

          <Switch
            checked={isAnonimousReporterLocalState}
            onChange={(checked) => setIsAnonimousReporterLocalState(checked)}
            style={{ marginTop: "10px" }}
            checkedChildren={<FaCheck />}
            unCheckedChildren={<TfiClose />}
          />

          <h2
            style={{
              ...subtitleStyleCss,
              fontSize: "14px",
              textAlign: "center",
              wordWrap: "break-word",
              whiteSpace: "normal",
              marginTop: "12px",
              marginLeft: "10px",
            }}
          >
            {isAnonimousReporterLocalState ? "Si" : "No"}
          </h2>

          {/* <Space>
            <Radio.Group
              onChange={(e) => setIsAnonimousReporterLocalState(e.target.value)}
              value={isAnonimousReporterLocalState}
            >
              <Radio value={true}>Si</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Space> */}
        </Row>

        {/* {!isAnonimousReporterLocalState && (
          <>
            <ReporterForm
              identificationUserLocalState={identificationUserLocalState}
              setIdentificationUserLocalState={setIdentificationUserLocalState}
              fullNameUserLocalState={fullNameUserLocalState}
              setFullNameUserLocalState={setFullNameUserLocalState}
              chargeUserLocalState={chargeUserLocalState}
              setChargeUserLocalState={setChargeUserLocalState}
              userVerifyLoading={userVerifyLoading}
            />
          </>
        )} */}

        <Card
          style={{
            width: "100%",
            height: "100%",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            marginTop: "10px",
          }}
          bordered={false}
          size="small"
        >
          <Row gutter={[16, 16]} style={{ width: "100%" }}>
            {/* Fecha del caso */}
            <Col xs={24} sm={12} md={8} lg={4}>
              <Form.Item
                label="Fecha del caso"
                id="date-case"
                className="date-case"
                name="date-case"
                rules={[
                  {
                    required: true,
                    validator: validateRequiredDate(
                      dateCaseLocalState,
                      "¡Seleccione una fecha!"
                    ),
                  },
                ]}
                style={{
                  width: "100%",
                  marginBottom: 0,
                }}
              >
                <CustomDatePicker
                  onChangeDateCustomDatePicker={onChangeDateCase}
                />
              </Form.Item>
            </Col>

            {/* Servicio de ocurrencia */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Servicio de ocurrencia"
                id="origin-service-id"
                className="origin-service-id"
                name="origin-service-id"
                rules={[
                  {
                    required: true,
                    message: "¡Seleccione una opción!",
                  },
                ]}
                style={{
                  width: "100%",
                  marginBottom: 0,
                }}
              >
                <Select
                  placeholder={"Seleccione una opción"}
                  onChange={(value) => setOriginServiceIdLocalState(value)}
                  value={originServiceIdLocalState}
                  showSearch
                  allowClear
                  size="small"
                  loading={allServicesDataLoading || allServicesDataFetching}
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
                  {Array.isArray(allServicesData) &&
                    allServicesData?.map((item: Service) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.serv_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Servicio que reporta */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Servicio que reporta"
                id="reporting-service-id"
                className="reporting-service-id"
                name="reporting-service-id"
                rules={[
                  {
                    required: true,
                    message: "¡Seleccione una opción!",
                  },
                ]}
                style={{
                  width: "100%",
                  marginBottom: 0,
                }}
              >
                <Select
                  placeholder={"Seleccione una opción"}
                  onChange={(value) => {
                    setReportingServiceIdLocalState(value);
                    onResetEventTypeAndEvent();
                  }}
                  value={reportingServiceIdLocalState}
                  showSearch
                  allowClear
                  size="small"
                  loading={allServicesDataLoading || allServicesDataFetching}
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
                  {Array.isArray(allServicesData) &&
                    allServicesData?.map((item: Service) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.serv_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <PatientForm
          isAdverseEvent={false}
          patientDataLoading={patientDataLoading}
          identificationPatientLocalState={identificationPatientLocalState}
          setIdentificationPatientLocalState={
            setIdentificationPatientLocalState
          }
          identificationTypePatientLocalState={
            identificationTypePatientLocalState
          }
          setIdentificationTypePatientLocalState={
            setIdentificationTypePatientLocalState
          }
          firstNamePatientLocalState={firstNamePatientLocalState}
          setFirstNamePatientLocalState={setFirstNamePatientLocalState}
          secondNamePatientLocalState={secondNamePatientLocalState}
          setSecondNamePatientLocalState={setSecondNamePatientLocalState}
          firstLastNamePatientLocalState={firstLastNamePatientLocalState}
          setFirstLastNamePatientLocalState={setFirstLastNamePatientLocalState}
          secondLastNamePatientLocalState={secondLastNamePatientLocalState}
          setSecondLastNamePatientLocalState={
            setSecondLastNamePatientLocalState
          }
          agePatientLocalState={agePatientLocalState}
          setAgePatientLocalState={setAgePatientLocalState}
          genderPatientLocalState={genderPatientLocalState}
          setGenderPatientLocalState={setGenderPatientLocalState}
          epsPatientLocalState={epsPatientLocalState}
          setEpsPatientLocalState={setEpsPatientLocalState}
          diagnosticCodeLocalState={diagnosticCodeLocalState}
          setDiagnosticCodeLocalState={setDiagnosticCodeLocalState}
          diagnosticDescriptionLocalState={diagnosticDescriptionLocalState}
          setDiagnosticDescriptionLocalState={
            setDiagnosticDescriptionLocalState
          }
          consecutivePatientLocalState={consecutivePatientLocalState}
          setConsecutivePatientLocalState={setConsecutivePatientLocalState}
          folioPatientLocalState={folioPatientLocalState}
          setFolioPatientLocalState={setFolioPatientLocalState}
          handleChangeConsecutive={handleChangeConsecutive}
          handleClickFindPatientData={handleClickFindPatientData}
          findAdmissionsPatientDataLocalState={
            findAdmissionsPatientDataLocalState
          }
          findFolioAvailablePatientDataLocalState={
            findAvailableFoliosDataLocalState
          }
          allDocumentTypeData={allDocumentTypeData}
          allDocumentTypeDataLoading={allDocumentTypeDataLoading}
          allDocumentTypeDataFetching={allDocumentTypeDataFetching}
        />

        <Card
          style={{
            width: "100%",
            height: "100%",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            marginTop: "10px",
          }}
          bordered={false}
          size="small"
        >
          <Title
            level={5}
            style={{
              ...titleStyleCss,
              color: "#f28322",
              marginBottom: "10px",
            }}
          >
            Datos del caso
          </Title>

          <Row gutter={[16, 16]} style={{ width: "100%" }}>
            {/* estrategia */}
            <Col xs={24} sm={12} md={8} lg={7}>
              <Form.Item
                label="Estrategia"
                id="event-type-id"
                className="event-type-id"
                name="event-type-id"
                rules={[
                  {
                    required: true,
                    message: "¡Por favor seleccione una opción!",
                  },
                ]}
                style={{ width: "100%", marginBottom: 0 }}
              >
                <Select
                  placeholder={
                    !reportingServiceIdLocalState
                      ? "Seleccione primero el servicio que reporta"
                      : "Seleccione una opción"
                  }
                  onChange={(value) => {
                    setEventTypeIdLocalState(value);
                    setEventIdLocalState(0);
                    setFindSimilarReportDataLocalState([]);
                    setDescriptionOthersLocalState("");
                    setShowDescriptionOthersLocalState(false);

                    form.setFieldsValue({
                      "event-id": undefined,
                      "description-others": undefined,
                    });
                    form.validateFields(["event-id"]);
                  }}
                  value={eventTypeIdLocalState}
                  showSearch
                  allowClear
                  size="small"
                  disabled={
                    reportingServiceIdLocalState === 0 ||
                    reportingServiceIdLocalState === undefined ||
                    !isPatientFound
                  }
                  loading={
                    allEventTypeByCaseTypeIdDataLoading ||
                    allEventTypeByCaseTypeIdDataFetching
                  }
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
                  {Array.isArray(allEventTypeByCaseTypeIdData) &&
                    allEventTypeByCaseTypeIdData?.map((item: EventType) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.eve_t_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            {/* suceso */}
            <Col xs={24} sm={12} md={8} lg={7}>
              <Form.Item
                label="Suceso"
                id="event-id"
                className="event-id"
                name="event-id"
                rules={[
                  {
                    required: true,
                    message: "¡Por favor seleccione una opción!",
                  },
                ]}
                style={{ width: "100%", marginBottom: 0 }}
              >
                <Select
                  placeholder={
                    !eventTypeIdLocalState
                      ? "Seleccione primero la estrategia"
                      : "Seleccione una opción"
                  }
                  onChange={handleChangeEvent}
                  value={eventIdLocalState}
                  showSearch
                  allowClear
                  size="small"
                  disabled={
                    eventTypeIdLocalState === 0 ||
                    eventTypeIdLocalState === undefined
                  }
                  loading={
                    allEventsByEventTypeIdDataLoading ||
                    allEventsByEventTypeIdDataFetching
                  }
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
                  {Array.isArray(allEventsByEventTypeIdData) &&
                    allEventsByEventTypeIdData?.map((item: Events) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.eve_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            {showDescriptionOthersLocalState && (
              <Col xs={24} sm={12} md={8} lg={5}>
                <Form.Item
                  label="Describe otros"
                  id="description-others"
                  className="description-others"
                  name="description-others"
                  style={{ width: "100%", marginBottom: 0 }}
                  normalize={(value) => {
                    if (!value) return "";

                    const filteredValue = value
                      .toUpperCase()
                      .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                    return filteredValue;
                  }}
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor ingresa la descripción!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      setDescriptionOthersLocalState(
                        e.target.value.toUpperCase()
                      )
                    }
                    type="text"
                    value={descriptionOthersLocalState}
                    prefix={<MdOutlineDescription />}
                    placeholder="Describe..."
                    size="small"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            )}

            {findSimilarReportDataLocalState.length > 0 ? (
              <Col xs={24} sm={12} md={8} lg={5}>
                <Form.Item
                  style={{ width: "100%", marginTop: "29px", marginBottom: 0 }}
                >
                  <CustomButton
                    classNameCustomButton="validate-stocks-report-button"
                    idCustomButton="validate-stocks-report-button"
                    titleCustomButton="Validar existencias"
                    typeCustomButton="primary"
                    htmlTypeCustomButton="button"
                    iconCustomButton={<FaMagnifyingGlass />}
                    onClickCustomButton={() =>
                      setIsModalVisibleValidateExistence(true)
                    }
                    styleCustomButton={{
                      background: "#f28322",
                      color: "#fff",
                      fontSize: "12px",
                      borderRadius: "16px",
                    }}
                    iconPositionCustomButton={"end"}
                    sizeCustomButton={"small"}
                    disabledCustomButton={false}
                  />
                </Form.Item>
              </Col>
            ) : null}
          </Row>

          {isAssociatedMedicinesShow && (
            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              {/* medicamento */}
              <Col xs={24} sm={25} md={12} lg={18}>
                <Form.Item
                  label="Medicamentos"
                  id="medicines-name"
                  className="medicines-name"
                  name="medicines-name"
                  rules={[
                    {
                      required: true,
                      message: "¡Seleccione una o varias opciones!",
                    },
                  ]}
                  style={{
                    width: "90%",
                    marginTop: "10px",
                    marginBottom: 0,
                  }}
                >
                  <Select
                    placeholder="Seleccione una opción"
                    onSearch={setSearchMedicineLocalState}
                    onChange={handleSelectMedicineChange}
                    value={undefined}
                    size="small"
                    showSearch
                    allowClear
                    loading={
                      allMedicinesDataLoading || allMedicinesDataFetching
                    }
                    filterOption={false}
                    style={{ width: "100%" }}
                  >
                    {allMedicinesData?.data?.map(
                      (medicine: MedicineExternal) => (
                        <Select.Option
                          key={medicine.drugCode}
                          value={medicine.drugCode}
                        >
                          {medicine.drugCode}-{medicine.drugDescription}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                {selectedMedicinesLocalState.length > 0 && (
                  <List
                    size="small"
                    dataSource={selectedMedicinesLocalState}
                    renderItem={(medicine: MedicineExternal) => (
                      <List.Item
                        key={medicine.drugCode}
                        actions={[
                          <CustomButton
                            key={medicine.drugCode}
                            classNameCustomButton="delete-item-medicine-button"
                            idCustomButton="delete-item-medicine-button"
                            typeCustomButton="primary"
                            htmlTypeCustomButton="button"
                            iconCustomButton={<FaDeleteLeft />}
                            onClickCustomButton={() => {
                              setSelectedMedicinesLocalState(
                                selectedMedicinesLocalState.filter(
                                  (med) => med.drugCode !== medicine.drugCode
                                )
                              );
                            }}
                            titleTooltipCustomButton="Eliminar"
                            shapeCustomButton="circle"
                            sizeCustomButton={"small"}
                            styleCustomButton={{ background: "#ff4d4f" }}
                          />,
                        ]}
                      >
                        {medicine.drugCode}-{medicine.drugDescription}
                      </List.Item>
                    )}
                    style={{
                      marginBottom: 0,
                      marginTop: "10px",
                      backgroundColor: "#ddd",
                      borderRadius: "16px",
                    }}
                  />
                )}
              </Col>
            </Row>
          )}

          {isAssociatedDevicesShow && (
            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              {/* dispositivos */}
              <Col xs={24} sm={25} md={12} lg={18}>
                <Form.Item
                  label="Dispositivos"
                  id="devices-name"
                  className="devices-name"
                  name="devices-name"
                  rules={[
                    {
                      required: true,
                      message: "¡Seleccione una o varias opciones!",
                    },
                  ]}
                  style={{ width: "90%", marginTop: "10px", marginBottom: 0 }}
                >
                  <Select
                    placeholder="Seleccione una opción"
                    onSearch={setSearchDeviceLocalState}
                    onChange={handleSelectDeviceChange}
                    value={undefined}
                    size="small"
                    showSearch
                    allowClear
                    loading={allDevicesDataLoading || allDevicesDataFetching}
                    filterOption={false}
                    style={{ width: "100%" }}
                  >
                    {allDevicesData?.data?.map((device: DeviceExternal) => (
                      <Select.Option
                        key={device.deviceCode}
                        value={device.deviceCode}
                      >
                        {device.deviceCode}-{device.deviceDescription}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Lista de dispositivos seleccionados */}
                {selectedDevicesLocalState.length > 0 && (
                  <List
                    size="small"
                    dataSource={selectedDevicesLocalState}
                    renderItem={(device) => (
                      <List.Item
                        key={device.deviceCode}
                        actions={[
                          <CustomButton
                            key={device.deviceCode}
                            classNameCustomButton="delete-item-device-button"
                            idCustomButton="delete-item-device-button"
                            typeCustomButton="primary"
                            htmlTypeCustomButton="button"
                            iconCustomButton={<FaDeleteLeft />}
                            onClickCustomButton={() => {
                              setSelectedDevicesLocalState(
                                selectedDevicesLocalState.filter(
                                  (dev) => dev.deviceCode !== device.deviceCode
                                )
                              );
                            }}
                            titleTooltipCustomButton="Eliminar"
                            shapeCustomButton="circle"
                            sizeCustomButton={"small"}
                            styleCustomButton={{ background: "#ff4d4f" }}
                          />,
                        ]}
                      >
                        {device.deviceCode}-{device.deviceDescription}
                      </List.Item>
                    )}
                    style={{
                      marginBottom: 0,
                      marginTop: "10px",
                      backgroundColor: "#ddd",
                      borderRadius: "16px",
                    }}
                  />
                )}
              </Col>
            </Row>
          )}

          <>
            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              {/* nivel de riesgo */}
              <Col xs={24} sm={12} md={8} lg={10}>
                <Form.Item
                  label="Nivel de riesgo"
                  id="risk-level-id"
                  className="risk-level-id"
                  name="risk-level-id"
                  rules={[
                    {
                      required: true,
                      message: "¡Seleccione una opción!",
                    },
                  ]}
                  style={{ width: "100%", marginTop: "10px", marginBottom: 0 }}
                >
                  {allRiskLevelDataLoading ? (
                    <CustomSpin />
                  ) : (
                    <Radio.Group
                      onChange={(e) => setRiskLevelIdLocalState(e.target.value)}
                      value={riskLevelIdLocalState}
                    >
                      {Array.isArray(allRiskLevelData) &&
                        allRiskLevelData?.map((item: RiskLevel) => (
                          <Radio key={item.id} value={item.id}>
                            {item.ris_l_name}
                          </Radio>
                        ))}
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>

            {/* clasificación de severidad */}
            {/* <Row gutter={[16, 16]} style={{ width: "100%" }}>
              <Col xs={24} sm={17} md={17} lg={24}>
                <Form.Item
                  label="Clasificación de severidad"
                  id="severity-clasification-id"
                  className="severity-clasification-id"
                  name="severity-clasification-id"
                  rules={[
                    {
                      required: true,
                      message: "¡Seleccione una opción!",
                    },
                  ]}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    marginBottom: 0,
                  }}
                >
                  {allSeverityClasificationsDataLoading ? (
                    <CustomSpin />
                  ) : (
                    <Radio.Group
                      onChange={(e) =>
                        setSeverityClasificationIdLocalState(e.target.value)
                      }
                      value={severityClasificationIdLocalState}
                    >
                      {Array.isArray(allSeverityClasificationsData) &&
                        allSeverityClasificationsData?.map(
                          (item: SeverityClasification) => (
                            <Radio
                              key={item.id}
                              value={item.id}
                              style={{ display: "block" }}
                            >
                              {item.sev_c_description}
                              {severityClasificationIdLocalState ===
                                item.id && (
                                <CustomTags
                                  labelCustom={item.sev_c_name}
                                  colorCustom={getSeverityClasificationColor(
                                    item.sev_c_name
                                  )}
                                  stylesCustom={{
                                    borderRadius: "30px",
                                    marginLeft: "15px",
                                  }}
                                />
                              )}
                            </Radio>
                          )
                        )}
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row> */}

            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              <Col xs={24} sm={25} md={12} lg={24}>
                <Form.Item
                  label="Describa brevemente el incidente (Hallazgo al examen físico, posibles consecuencias)"
                  id="description-incident"
                  className="description-incident"
                  name="description-incident"
                  style={{ width: "100%", marginTop: "10px", marginBottom: 0 }}
                  rules={[
                    {
                      required: true,
                      message: "Escribe la descripción del caso!",
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    onChange={(e) =>
                      setDescriptionIncidentLocalState(
                        e.target.value.toUpperCase()
                      )
                    }
                    value={descriptionIncidentLocalState}
                    style={{ width: "100%", textTransform: "uppercase" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              <Col xs={24} sm={25} md={12} lg={24}>
                <Form.Item
                  label="Acciones inmediatas realizadas con el paciente (Tratamiento si aplica)"
                  id="inmediate-actions"
                  className="inmediate-actions"
                  name="inmediate-actions"
                  style={{ width: "100%", marginTop: "10px", marginBottom: 0 }}
                >
                  <TextArea
                    rows={4}
                    onChange={(e) =>
                      setInmediateActionsLocalState(
                        e.target.value.toUpperCase()
                      )
                    }
                    value={inmediateActionsLocalState}
                    style={{ width: "100%", textTransform: "uppercase" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row
              gutter={[16, 16]}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Col>
                <Form.Item
                  style={{ width: "100%", marginTop: "10px", marginBottom: 0 }}
                >
                  <CustomButton
                    classNameCustomButton="generate-report-button"
                    idCustomButton="generate-report-button"
                    titleCustomButton="Generar reporte"
                    typeCustomButton="primary"
                    htmlTypeCustomButton="submit"
                    iconCustomButton={
                      !createdCaseReportOriginalDataLoading ? (
                        <FaRegCircleCheck />
                      ) : (
                        <LoadingOutlined />
                      )
                    }
                    onClickCustomButton={() => ({})}
                    styleCustomButton={{
                      background: !createdCaseReportOriginalDataLoading
                        ? "#002140"
                        : "#6C757D",
                      color: "#fff",
                      fontSize: "12px",
                      borderRadius: "16px",
                    }}
                    iconPositionCustomButton={"end"}
                    sizeCustomButton={"small"}
                    disabledCustomButton={
                      !createdCaseReportOriginalDataLoading ? false : true
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        </Card>
      </Form>

      <CustomModalNoContent
        key={"custom-modal-validate-existence-cases"}
        widthCustomModalNoContent="98%"
        openCustomModalState={isModalVisibleValidateExistence}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalVisibleValidateExistence(false)
        }
        contentCustomModal={
          <ContentValidateExistenceCases
            findSimilarReportData={findSimilarReportDataLocalState || []}
            onConfirm={handleClickConfirmValidateExistenceCase}
          />
        }
      />
      <CustomModalNoContent
        key={"custom-modal-report-generated-successfully"}
        widthCustomModalNoContent="35%"
        openCustomModalState={isModalVisibleReportGeneratedSuccessfully}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalVisibleReportGeneratedSuccessfully(false)
        }
        contentCustomModal={
          <ContentReportGeneratedSuccessfully
            messageData={messageReportGeneratedSuccessfullLocalState}
          />
        }
      />
    </div>
  );
};

export default IncidentContent;
