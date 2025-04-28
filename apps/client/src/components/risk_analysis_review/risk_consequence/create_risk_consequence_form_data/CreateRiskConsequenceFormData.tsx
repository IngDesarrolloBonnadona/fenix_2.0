"use client";

import React from "react";

import CustomButton from "@/components/common/custom_button/CustomButton";

import { Form } from "antd";

import { SaveOutlined, LoadingOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const CreateRiskConsequenceFormData: React.FC<{
  nameLocalStateFormData: string;
  setNameLocalStateFormData: (e: any) => void;
  handleCreateRiskConsequenceDataForm: () => void;
  createdRiskConsequenceLoadingFormdata: boolean;
}> = ({
  nameLocalStateFormData,
  setNameLocalStateFormData,
  handleCreateRiskConsequenceDataForm,
  createdRiskConsequenceLoadingFormdata,
}) => {
  return (
    <Form
      id="create-risk-consequence-form"
      name="create-risk-consequence-form"
      className="create-risk-consequence-form"
      onFinish={handleCreateRiskConsequenceDataForm}
      initialValues={{ remember: false }}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "100%",
      }}
    >
      <Form.Item
        label="Consecuencia:"
        name="risk-consequence-name"
        style={{
          marginBottom: "16px",
        }}
        rules={[
          {
            required: true,
            message: "La consecuencia es obligatoria.",
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
          id="input-name-risk-consequence"
          name="input-name-risk-consequence"
          className="input-risk-consequence"
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
          classNameCustomButton="create-risk-consequence-button"
          idCustomButton="create-risk-consequence-button"
          titleCustomButton="Crear"
          typeCustomButton="primary"
          htmlTypeCustomButton="submit"
          iconCustomButton={
            !createdRiskConsequenceLoadingFormdata ? (
              <SaveOutlined />
            ) : (
              <LoadingOutlined />
            )
          }
          disabledCustomButton={
            !createdRiskConsequenceLoadingFormdata ? false : true
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
  );
};

export default CreateRiskConsequenceFormData;
