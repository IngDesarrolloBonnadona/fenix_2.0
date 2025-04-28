"use client";

import React from "react";

import CustomButton from "@/components/common/custom_button/CustomButton";

import { Form } from "antd";

import { SaveOutlined, LoadingOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const EditRiskConsequenceFormData: React.FC<{
  nameLocalStateFormData: string;
  setNameLocalStateFormData: (e: any) => void;
  handleClickSubmitFormData: () => void;
  hasChangesFormData: boolean;
  updatedRiskConsequenceLoadingFormdata: boolean;
}> = ({
  nameLocalStateFormData,
  setNameLocalStateFormData,
  handleClickSubmitFormData,
  hasChangesFormData,
  updatedRiskConsequenceLoadingFormdata,
}) => {
  return (
    <Form
      id="edit-risk-consequence-form"
      name="edit-risk-consequence-form"
      className="edit-risk-consequence-form"
      initialValues={{
        "risk-consequence-name": nameLocalStateFormData,
      }}
      autoComplete="off"
      style={{ width: "100%" }}
      layout="vertical"
      onFinish={handleClickSubmitFormData}
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
            message: "La Consecuencia es obligatoria.",
          },
        ]}
      >
        <TextArea
          id="text-area-name-risk-consequence"
          name="text-area-name-risk-consequence"
          className="text-area-risk-consequence"
          rows={4}
          onChange={(e) =>
            setNameLocalStateFormData(e.target.value.toUpperCase())
          }
          placeholder="Escribe..."
          value={nameLocalStateFormData}
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
          classNameCustomButton="update-risk-consequence-button"
          idCustomButton="update-risk-consequence-button"
          titleCustomButton="Actualizar"
          typeCustomButton="primary"
          htmlTypeCustomButton="submit"
          iconCustomButton={
            !updatedRiskConsequenceLoadingFormdata ? (
              <SaveOutlined />
            ) : (
              <LoadingOutlined />
            )
          }
          disabledCustomButton={
            hasChangesFormData && !updatedRiskConsequenceLoadingFormdata
              ? false
              : true
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

export default EditRiskConsequenceFormData;
