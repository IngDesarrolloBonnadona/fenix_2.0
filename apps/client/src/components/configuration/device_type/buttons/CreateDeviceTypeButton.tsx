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

import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useCreateDeviceTypeMutation } from "@/redux/apis/device_type/deviceTypeApi";

interface ButtonProps {
  onNewRegister: () => void;
}

const CreateDeviceTypeButtonComponent: React.FC<ButtonProps> = ({
  onNewRegister,
}) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [description, setDescription] = useState("");

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [createDeviceType, { isLoading: createdDeviceTypeDataLoading }] =
    useCreateDeviceTypeMutation();

  const handleClickClean = () => {
    form.resetFields();
    setNameLocalState("");
    setDescription("");
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createDeviceType({
        dev_t_name: nameLocalState,
        dev_t_description: description,
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
        key={"custom-modal-create-device-type"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="create-device-type-form"
              name="create-device-type-form"
              className="create-device-type-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="device-type-name"
                style={{
                  marginBottom: "16px",
                }}
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
                  id="input-name-device-type"
                  name="input-name-device-type"
                  className="input-name-device-type"
                  onChange={(e) =>
                    setNameLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={nameLocalState}
                  style={{ width: "100%", textTransform: "uppercase" }}
                />
              </Form.Item>

              <Form.Item
                label="Descripción:"
                name="device-type-description"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="textarea-description-device-type"
                  name="textarea-description-device-type"
                  className="textarea-description-device-type"
                  onChange={(e) => setDescription(e.target.value.toUpperCase())}
                  placeholder="Escribe..."
                  value={description || ""}
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
                  classNameCustomButton="clean-device-type-button"
                  idCustomButton="clean-device-type-button"
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
                  classNameCustomButton="create-device-type-button"
                  idCustomButton="create-device-type-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdDeviceTypeDataLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    !createdDeviceTypeDataLoading ? false : true
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

export default CreateDeviceTypeButtonComponent;
