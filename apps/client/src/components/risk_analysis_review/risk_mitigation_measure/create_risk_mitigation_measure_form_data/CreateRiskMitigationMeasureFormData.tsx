"use client";

import React from "react";

import CustomButton from "@/components/common/custom_button/CustomButton";

import { Form } from "antd";

import { SaveOutlined, LoadingOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const CreateRiskMitigationMeasureFormData: React.FC<{
  nameLocalStateFormData: string;
  setNameLocalStateFormData: (e: any) => void;
  handleCreateRiskMitigationMeasureDataForm: () => void;
  createdRiskMitigationMeasureLoadingFormdata: boolean;
}> = ({
  nameLocalStateFormData,
  setNameLocalStateFormData,
  handleCreateRiskMitigationMeasureDataForm,
  createdRiskMitigationMeasureLoadingFormdata,
}) => {
  return (
    <Form
      id="create-risk-mitigation-measure-form"
      name="create-risk-mitigation-measure-form"
      className="create-risk-mitigation-measure-form"
      onFinish={handleCreateRiskMitigationMeasureDataForm}
      initialValues={{ remember: false }}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "100%",
      }}
    >
      <Form.Item
        label="Medida de mitigación:"
        name="risk-mitigation-measure-name"
        style={{
          marginBottom: "16px",
        }}
        rules={[
          {
            required: true,
            message: "La Medida de mitigación es obligatoria.",
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
          id="input-name-risk-mitigation-measure"
          name="input-name-risk-mitigation-measure"
          className="input-risk-mitigation-measure"
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
          classNameCustomButton="create-risk-mitigation-measure-button"
          idCustomButton="create-risk-mitigation-measure-button"
          titleCustomButton="Crear"
          typeCustomButton="primary"
          htmlTypeCustomButton="submit"
          iconCustomButton={
            !createdRiskMitigationMeasureLoadingFormdata ? (
              <SaveOutlined />
            ) : (
              <LoadingOutlined />
            )
          }
          disabledCustomButton={
            !createdRiskMitigationMeasureLoadingFormdata ? false : true
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

export default CreateRiskMitigationMeasureFormData;
