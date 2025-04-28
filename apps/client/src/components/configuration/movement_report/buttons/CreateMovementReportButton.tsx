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

import { AutoComplete, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

import {
  useCreateMovementReportMutation,
  useGetAllMovementReportsQuery,
} from "@/redux/apis/movement_report/movementReportApi";
import CustomMessageState from "@/components/common/custom_messages/CustomMessageState";

const CreateMovementReportButtonComponent: React.FC<{
  onNewRegister: () => void;
}> = ({ onNewRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [timeLocalState, setTimeLocalState] = useState("");
  const [options, setOptions] = useState<any[]>([]);

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [
    createMovementReport,
    { isLoading: createdMovementReportDataLoading },
  ] = useCreateMovementReportMutation({
    fixedCacheKey: "createMovementReport",
  });

  const {
    data: allMovementReportsData,
    isFetching: allMovementReportsFetching,
    isLoading: allMovementReportsLoading,
    error: allMovementReportsError,
  } = useGetAllMovementReportsQuery(null);

  const handleClickClean = () => {
    form.resetFields();
    setNameLocalState("");
    setDescriptionLocalState("");
    setTimeLocalState("");
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions =
        allMovementReportsData
          ?.filter((types) =>
            types.mov_r_name.toUpperCase().includes(value.toUpperCase())
          )
          .map((type) => ({
            value: type.mov_r_name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createMovementReport({
        mov_r_name: nameLocalState,
        mov_r_description: descriptionLocalState,
        mov_r_time: Number(timeLocalState),
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
        key={"custom-modal-create-movement-report"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="create-movement-meport-form"
              name="create-movement-meport-form"
              className="create-movement-meport-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="movement-report-name"
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
                  id="name-movement-report"
                  options={options}
                  style={{ width: "100%", textAlign: "start" }}
                  onSearch={handleSearch}
                  placeholder="Escribe..."
                  value={nameLocalState}
                  onChange={(value) => setNameLocalState(value.toUpperCase())}
                  filterOption={false}
                >
                  <Input
                    id="input-name-movement-report"
                    type="text"
                    autoComplete="off"
                  />
                </AutoComplete>
              </Form.Item>

              <Form.Item
                label="Tiempo:"
                name="movement-report-time"
                style={{ marginBottom: "16px" }}
                rules={[
                  {
                    required: true,
                    message: "El tiempo es obligatorio.",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "El tiempo solo debe tener numeros.",
                  },
                ]}
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
              >
                <Input
                  id="input-time-movement-meport"
                  name="input-time-movement-meport"
                  className="input-time-movement-meport"
                  onChange={(e) => setTimeLocalState(e.target.value)}
                  placeholder="1234..."
                  value={timeLocalState}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Descripción:"
                name="movement-report-description"
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
                  id="textarea-description-movement-meport"
                  name="textarea-description-movement-meport"
                  className="textarea-description-movement-meport"
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
                  textAlign: "center",
                  marginTop: "16px",
                  marginBottom: 0,
                }}
              >
                <CustomButton
                  classNameCustomButton="clean-movement-meport-button"
                  idCustomButton="clean-movement-meport-button"
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
                  classNameCustomButton="create-movement-meport-button"
                  idCustomButton="create-movement-meport-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdMovementReportDataLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    !createdMovementReportDataLoading ? false : true
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

export default CreateMovementReportButtonComponent;
