"use client";

import React from "react";

import CustomButton from "@/components/common/custom_button/CustomButton";

import { Form } from "antd";

import { SaveOutlined, LoadingOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const EditRiskCauseFormData: React.FC<{
  nameLocalStateFormData: string;
  setNameLocalStateFormData: (e: any) => void;
  handleClickSubmitFormData: () => void;
  hasChangesFormData: boolean;
  updatedRiskCauseLoadingFormdata: boolean;
}> = ({
  nameLocalStateFormData,
  setNameLocalStateFormData,
  handleClickSubmitFormData,
  hasChangesFormData,
  updatedRiskCauseLoadingFormdata,
}) => {
  return (
    <Form
      id="edit-risk-cause-form"
      name="edit-risk-cause-form"
      className="edit-risk-cause-form"
      initialValues={{
        "risk-cause-name": nameLocalStateFormData,
      }}
      autoComplete="off"
      style={{ width: "100%" }}
      layout="vertical"
      onFinish={handleClickSubmitFormData}
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
      >
        <TextArea
          id="text-area-name-risk-cause"
          name="text-area-name-risk-cause"
          className="text-area-risk-cause"
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
          classNameCustomButton="update-risk-cause-button"
          idCustomButton="update-risk-cause-button"
          titleCustomButton="Actualizar"
          typeCustomButton="primary"
          htmlTypeCustomButton="submit"
          iconCustomButton={
            !updatedRiskCauseLoadingFormdata ? (
              <SaveOutlined />
            ) : (
              <LoadingOutlined />
            )
          }
          disabledCustomButton={
            hasChangesFormData && !updatedRiskCauseLoadingFormdata
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

export default EditRiskCauseFormData;
