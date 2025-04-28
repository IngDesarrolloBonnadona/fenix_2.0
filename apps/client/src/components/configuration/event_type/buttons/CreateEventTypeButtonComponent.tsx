"use client";

import React, { useState } from "react";

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

import { AutoComplete, Form, Input, Select } from "antd";

import {
  useCreateEventTypeMutation,
  useGetAllEventTypesQuery,
} from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";

const CreateStrategyButtonComponent: React.FC<{
  onNewRegister: () => void;
}> = ({ onNewRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [caseTypeIdLocalState, setCaseTypeIdLocalState] = useState(0);
  const [options, setOptions] = useState<any[]>([]);

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [createEventType, { isLoading: createdEventTypeDataLoading }] =
    useCreateEventTypeMutation({
      fixedCacheKey: "createEventType",
    });

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const {
    data: allEventTypesData,
    isFetching: allEventTypesFetching,
    isLoading: allEventTypesLoading,
    error: allEventTypesError,
  } = useGetAllEventTypesQuery(null);

  const handleClickClean = () => {
    form.resetFields();
    setNameLocalState("");
    setCaseTypeIdLocalState(0);
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions =
        allEventTypesData
          ?.filter((types) =>
            types.eve_t_name.toUpperCase().includes(value.toUpperCase())
          )
          .map((type) => ({
            value: type.eve_t_name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createEventType({
        eve_t_name: nameLocalState,
        eve_t_casetype_id_fk: caseTypeIdLocalState,
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
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
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
        key={"custom-modal-create-event-type"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="create-event-type-form"
              name="create-event-type-form"
              className="create-event-type-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Tipo de caso:"
                id="case-type-id"
                className="case-type-id"
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
                name="event-type-name"
                style={{
                  marginBottom: "16px",
                }}
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
                    message: "El nombre es obligatorio.",
                  },
                  {
                    pattern: /^[A-ZÁÉÍÓÚÑ\s]*$/,
                    message:
                      "El nombre solo puede contener letras mayúsculas con tildes y espacios",
                  },
                ]}
              >
                <AutoComplete
                  id="name-event-type"
                  options={options}
                  style={{ width: "100%", textAlign: "start" }}
                  onSearch={handleSearch}
                  placeholder="Escribe..."
                  value={nameLocalState}
                  onChange={(value) => setNameLocalState(value.toUpperCase())}
                  filterOption={false}
                >
                  <Input
                    id="input-name-event-type"
                    type="text"
                    autoComplete="off"
                  />
                </AutoComplete>

                {/* <Input
                  id="input-name-event-type"
                  name="input-name-event-type"
                  className="input-name-event-type"
                  onChange={(e) =>
                    setNameLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={nameLocalState}
                  style={{ width: "100%", textTransform: "uppercase" }}
                /> */}
              </Form.Item>

              <Form.Item
                style={{
                  marginTop: "16px",
                  marginBottom: 0,
                }}
              >
                <CustomButton
                  classNameCustomButton="clean-event-type-button"
                  idCustomButton="clean-event-type-button"
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
                  classNameCustomButton="create-event-type-button"
                  idCustomButton="create-event-type-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdEventTypeDataLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    !createdEventTypeDataLoading ? false : true
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
export default CreateStrategyButtonComponent;
