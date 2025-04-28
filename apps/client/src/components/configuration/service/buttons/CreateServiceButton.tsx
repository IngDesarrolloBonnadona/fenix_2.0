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
import TextArea from "antd/es/input/TextArea";

import {
  useCreateServiceMutation,
  useGetAllServicesQuery,
} from "@/redux/apis/service/serviceApi";
import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";

const CreateServiceButtonComponent: React.FC<{ onNewRegister: () => void }> = ({
  onNewRegister,
}) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [unitIdLocalState, setUnitIdLocalState] = useState(0);
  const [options, setOptions] = useState<any[]>([]);

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [createService, { isLoading: createdServiceDataLoading }] =
    useCreateServiceMutation({
      fixedCacheKey: "createService",
    });

  const {
    data: allUnitsData,
    isFetching: allUnitsDataFetching,
    isLoading: allUnitsDataLoading,
    error: allUnitsDataError,
    refetch: allUnitsDataRefetch,
  } = useGetAllUnitsQuery(null);

  const {
    data: allServicesData,
    isFetching: allServicesFetching,
    isLoading: allServicesLoading,
    error: allServicesError,
  } = useGetAllServicesQuery(null);

  const handleClickClean = () => {
    form.resetFields();
    setNameLocalState("");
    setDescriptionLocalState("");
    setUnitIdLocalState(0);
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions =
        allServicesData
          ?.filter((types) =>
            types.serv_name.toUpperCase().includes(value.toUpperCase())
          )
          .map((type) => ({
            value: type.serv_name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createService({
        serv_name: nameLocalState,
        serv_description: descriptionLocalState,
        serv_unit_id_fk: unitIdLocalState,
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
        key={"custom-modal-create-service"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="create-service-form"
              name="create-service-form"
              className="create-service-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Unidad:"
                id="fieldUnitId"
                className="fieldUnitId"
                name="fieldUnitId"
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

              <Form.Item
                label="Nombre:"
                name="service-name"
                style={{ marginBottom: "16px" }}
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
                  id="name-service"
                  options={options}
                  style={{ width: "100%", textAlign: "start" }}
                  onSearch={handleSearch}
                  placeholder="Escribe..."
                  value={nameLocalState}
                  onChange={(value) => setNameLocalState(value.toUpperCase())}
                  filterOption={false}
                >
                  <Input
                    id="input-name-service"
                    type="text"
                    autoComplete="off"
                  />
                </AutoComplete>
              </Form.Item>

              <Form.Item
                label="Descripción:"
                name="service-description"
                style={{ marginBottom: "16px" }}
                normalize={(value) => {
                  if (!value) return "";

                  const filteredValue = value
                    .toUpperCase()
                    .replace(/[^A-ZÁÉÍÓÚÑ0-9,.:;s"\s]/g, "");

                  return filteredValue;
                }}
              >
                <TextArea
                  id="textarea-description-service"
                  name="textarea-description-service"
                  className="textarea-description-service"
                  onChange={(e) =>
                    setDescriptionLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={descriptionLocalState}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                style={{
                  marginTop: "16px",
                  marginBottom: 0,
                }}
              >
                <CustomButton
                  classNameCustomButton="clean-service-button"
                  idCustomButton="clean-service-button"
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
                  classNameCustomButton="create-service-button"
                  idCustomButton="create-service-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdServiceDataLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    !createdServiceDataLoading ? false : true
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
export default CreateServiceButtonComponent;
