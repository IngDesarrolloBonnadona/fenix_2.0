"use client";

import React from "react";

import CustomButton from "@/components/common/custom_button/CustomButton";

import { Form } from "antd";

import { SaveOutlined, LoadingOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const CreateRiskCauseFormData: React.FC<{
  nameLocalStateFormData: string;
  setNameLocalStateFormData: (e: any) => void;
  handleCreateRiskCauseDataForm: () => void;
  createdRiskCauseLoadingFormdata: boolean;
}> = ({
  nameLocalStateFormData,
  setNameLocalStateFormData,
  handleCreateRiskCauseDataForm,
  createdRiskCauseLoadingFormdata,
}) => {
  return (
    <Form
      id="create-risk-cause-form"
      name="create-risk-cause-form"
      className="create-risk-cause-form"
      onFinish={handleCreateRiskCauseDataForm}
      initialValues={{ remember: false }}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "100%",
      }}
    >
      <Form.Item
        label="Causa:"
        name="risk-cause-name"
        style={{
          marginBottom: "16px",
        }}
        rules={[
          {
            required: true,
            message: "La causa es obligatoria.",
          },
        ]}
        normalize={(value) => {
          if (!value) return "";

          const filteredValue = value
            .toUpperCase()
            .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

          return filteredValue;
        }}
      >
        <TextArea
          id="input-name-risk-cause"
          name="input-name-risk-cause"
          className="input-risk-cause"
          rows={4}
          onChange={(e) =>
            setNameLocalStateFormData(e.target.value.toUpperCase())
          }
          placeholder="Escribe..."
          value={nameLocalStateFormData}
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
          classNameCustomButton="create-risk-cause-button"
          idCustomButton="create-risk-cause-button"
          titleCustomButton="Crear"
          typeCustomButton="primary"
          htmlTypeCustomButton="submit"
          iconCustomButton={
            !createdRiskCauseLoadingFormdata ? (
              <SaveOutlined />
            ) : (
              <LoadingOutlined />
            )
          }
          disabledCustomButton={!createdRiskCauseLoadingFormdata ? false : true}
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
  );
};

export default CreateRiskCauseFormData;
