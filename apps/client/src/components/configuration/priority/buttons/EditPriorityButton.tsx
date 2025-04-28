"use client";

import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import {
  useGetPriorityByIdQuery,
  useUpdatePriorityMutation,
} from "@/redux/apis/priority/priorityApi";
import { useGetAllSeverityClasificationsQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";

const EditPriorityButtonComponent: React.FC<{
  dataRecord: Priority;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [
    severityClasificationIdLocalState,
    setSeverityClasificationIdLocalState,
  ] = useState(0);
  const [responseTimeLocalState, setResponseTimeLocalState] = useState(0);

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [updatePriority, { isLoading: updatePriorityDataLoading }] =
    useUpdatePriorityMutation();

  const {
    data: allSeverityClasificationsData,
    isFetching: allSeverityClasificationsDataFetching,
    isLoading: allSeverityClasificationsDataLoading,
    error: allSeverityClasificationsDataError,
    refetch: allSeverityClasificationsDataRefetch,
  } = useGetAllSeverityClasificationsQuery(null);

  const {
    data: priorityData,
    isFetching: priorityDataFetching,
    isLoading: priorityDataLoading,
    error: priorityDataError,
    refetch: priorityDataRefetch,
  } = useGetPriorityByIdQuery(dataRecord.id);

  useEffect(() => {
    if (isModalOpenLocalState && priorityData) {
      setNameLocalState(priorityData.prior_name);
      setDescriptionLocalState(priorityData.prior_description);
      setSeverityClasificationIdLocalState(
        priorityData.prior_severityclasif_id_fk
      );
      setResponseTimeLocalState(priorityData.prior_responsetime);
    }
  }, [isModalOpenLocalState, priorityData]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataDescription: string;
      dataUnitId: number;
      dataResponseTime: number;
    },
    currentData: {
      dataName: string;
      dataDescription: string;
      dataUnitId: number;
      dataResponseTime: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription ||
      initialData.dataUnitId !== currentData.dataUnitId ||
      initialData.dataResponseTime !== currentData.dataResponseTime
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: priorityData?.prior_name || "",
      dataDescription: priorityData?.prior_description || "",
      dataUnitId: priorityData?.prior_severityclasif_id_fk || 0,
      dataResponseTime: priorityData?.prior_responsetime || 0,
    };

    const currentData = {
      dataName: nameLocalState,
      dataDescription: descriptionLocalState,
      dataUnitId: severityClasificationIdLocalState,
      dataResponseTime: responseTimeLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updatePriority({
        id: dataRecord.id,
        updatePriority: {
          prior_name: nameLocalState,
          prior_description: descriptionLocalState,
          prior_severityclasif_id_fk: severityClasificationIdLocalState,
          prior_responsetime: responseTimeLocalState,
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
        setIsModalOpenLocalState(false);
        onRefectRegister();
        priorityDataRefetch();
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
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
        onClickCustomButton={() => setIsModalOpenLocalState(true)}
        titleTooltipCustomButton="Ver"
        shapeCustomButton="circle"
        sizeCustomButton={"small"}
      />

      <CustomModalNoContent
        key={"custom-modal-edit-priority"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-priority-form"
              name="edit-priority-form"
              className="edit-priority-form"
              initialValues={{
                "name-priority": dataRecord.prior_name,
                "response-time-priority": dataRecord.prior_responsetime,
                "description-priority": dataRecord.prior_description,
                "severity-clasification-id":
                  dataRecord.prior_severityclasif_id_fk,
              }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Clasificación de severidad:"
                name="severity-clasification-id"
                style={{ marginBottom: "16px" }}
                rules={[
                  {
                    required: true,
                    message: "¡Por favor seleccione una opción!",
                  },
                ]}
              >
                <Select
                  id="select-severity-clasification-id"
                  className="select-severity-clasification-id"
                  showSearch
                  placeholder={"Seleccione una opción"}
                  onChange={(value) =>
                    setSeverityClasificationIdLocalState(value)
                  }
                  value={severityClasificationIdLocalState}
                  loading={
                    allSeverityClasificationsDataLoading ||
                    allSeverityClasificationsDataFetching
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
                  {allSeverityClasificationsData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.sev_c_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Nombre:"
                id="name-priority"
                className="name-priority"
                name="name-priority"
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
                  id="input-name-priority"
                  name="input-name-priority"
                  className="input-name-priority"
                  onChange={(e) =>
                    setNameLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={nameLocalState}
                  style={{ width: "100%", textTransform: "uppercase" }}
                />
              </Form.Item>

              <Form.Item
                label="Tiempo:"
                id="response-time-priority"
                className="response-time-priority"
                name="response-time-priority"
                style={{
                  marginBottom: "16px",
                }}
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
                rules={[
                  {
                    required: true,
                    message: "El tiempo de respuesta es obligatorio.",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message:
                      "El tiempo no puede tener letras ni caracteres especiales.",
                  },
                ]}
              >
                <Input
                  id="input-response-time-priority"
                  name="input-response-time-priority"
                  className="input-response-time-priority"
                  onChange={(e) =>
                    setResponseTimeLocalState(Number(e.target.value))
                  }
                  placeholder="1234..."
                  value={responseTimeLocalState}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Descripción:"
                id="description-priority"
                className="description-priority"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="textarea-description-priority"
                  name="textarea-description-priority"
                  className="textarea-description-priority"
                  onChange={(e) =>
                    setDescriptionLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={descriptionLocalState || ""}
                  style={{ width: "100%", textTransform: "uppercase" }}
                />
              </Form.Item>

              <Form.Item
                style={{
                  textAlign: "center",
                  marginTop: "16px",
                  marginBottom: 0,
                }}
              >
                <CustomButton
                  classNameCustomButton="edit-priority-button"
                  idCustomButton="edit-priority-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updatePriorityDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updatePriorityDataLoading ? false : true
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

export default EditPriorityButtonComponent;
