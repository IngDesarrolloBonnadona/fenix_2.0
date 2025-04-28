"use client";

import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input, Select } from "antd";

import {
  useGetEventTypeByIdQuery,
  useUpdateEventTypeMutation,
} from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";

const EditEventTypeButtonComponent: React.FC<{
  dataRecord: EventType;
  onRefetchRegister: () => void;
}> = ({ dataRecord, onRefetchRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [caseTypeIdLocalState, setCaseTypeIdLocalState] = useState(0);

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [updateEventType, { isLoading: updateEventTypeDataLoading }] =
    useUpdateEventTypeMutation();

  const {
    data: EventTypeData,
    isFetching: EventTypeDataFetching,
    isLoading: EventTypeDataLoading,
    error: EventTypeDataError,
    refetch: EventTypeDataRefetch,
  } = useGetEventTypeByIdQuery(dataRecord.id);

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  useEffect(() => {
    if (isModalOpenLocalState && EventTypeData) {
      setNameLocalState(EventTypeData.eve_t_name);
      setCaseTypeIdLocalState(EventTypeData.eve_t_casetype_id_fk);
    }
  }, [isModalOpenLocalState, EventTypeData]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataCaseTypeId: number;
    },
    currentData: {
      dataName: string;
      dataCaseTypeId: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataCaseTypeId !== currentData.dataCaseTypeId
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: EventTypeData?.eve_t_name || "",
      dataCaseTypeId: EventTypeData?.eve_t_casetype_id_fk || 0,
    };

    const currentData = {
      dataName: nameLocalState,
      dataCaseTypeId: caseTypeIdLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateEventType({
        id: dataRecord.id,
        updateEventType: {
          eve_t_name: nameLocalState,
          eve_t_casetype_id_fk: caseTypeIdLocalState,
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
        onRefetchRegister();
        EventTypeDataRefetch();
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
        key={"custom-modal-edit-event-type"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-event-type-form"
              name="edit-event-type-form"
              className="edit-event-type-form"
              initialValues={{
                "case-type-id": dataRecord.eve_t_casetype_id_fk,
                "name-event-type": dataRecord.eve_t_name,
              }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Tipo de caso:"
                name="case-type-id"
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
                  id="select-case-type-id"
                  className="select-case-type-id"
                  showSearch
                  placeholder={"Seleccione una opción"}
                  onChange={(value) => setCaseTypeIdLocalState(value)}
                  value={caseTypeIdLocalState}
                  loading={allCaseTypesDataLoading || allCaseTypesDataFetching}
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
                  {allCaseTypesData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.cas_t_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Nombre:"
                id="name-event-type"
                className="name-event-type"
                name="name-event-type"
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
                  id="input-name-event-type"
                  name="input-name-event-type"
                  className="input-name-event-type"
                  onChange={(e) =>
                    setNameLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={nameLocalState}
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
                  classNameCustomButton="edit-event-type-button"
                  idCustomButton="edit-event-type-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateEventTypeDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateEventTypeDataLoading ? false : true
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

export default EditEventTypeButtonComponent;
