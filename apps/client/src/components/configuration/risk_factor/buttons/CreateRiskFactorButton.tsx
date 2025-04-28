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

import { useCreateRiskFactorMutation } from "@/redux/apis/risk_factor/riskFactorApi";

const CreateRiskFactorButtonComponent: React.FC<{
  onNewRegister: () => void;
}> = ({ onNewRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [createRiskFactor, { isLoading: createdRiskFactorDataLoading }] =
    useCreateRiskFactorMutation();

  const handleClickClean = () => {
    form.resetFields();
    setNameLocalState("");
    setDescriptionLocalState("");
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createRiskFactor({
        ris_f_name: nameLocalState,
        ris_f_description: descriptionLocalState,
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
        key={"custom-modal-create-risk-factor"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="create-risk-factor-form"
              name="create-risk-factor-form"
              className="create-risk-factor-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="risk-factor-name"
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
                  id="input-name-risk-factor"
                  name="input-name-risk-factor"
                  className="input-name-risk-factor"
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
                name="risk-factor-description"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="textarea-description-risk-factor"
                  name="textarea-description-risk-factor"
                  className="textarea-description-risk-factor"
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
                  classNameCustomButton="clean-risk-factor-button"
                  idCustomButton="clean-risk-factor-button"
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
                  classNameCustomButton="create-risk-factor-button"
                  idCustomButton="create-risk-factor-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdRiskFactorDataLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    !createdRiskFactorDataLoading ? false : true
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

export default CreateRiskFactorButtonComponent;
