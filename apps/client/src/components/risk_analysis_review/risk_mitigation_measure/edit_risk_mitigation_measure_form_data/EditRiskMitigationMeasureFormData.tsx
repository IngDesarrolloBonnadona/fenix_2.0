"use client";

import React from "react";

import CustomButton from "@/components/common/custom_button/CustomButton";

import { Form } from "antd";

import { SaveOutlined, LoadingOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const EditRiskMitigationMeasureFormData: React.FC<{
  nameLocalStateFormData: string;
  setNameLocalStateFormData: (e: any) => void;
  handleClickSubmitFormData: () => void;
  hasChangesFormData: boolean;
  updatedRiskMitigationMeasureLoadingFormdata: boolean;
}> = ({
  nameLocalStateFormData,
  setNameLocalStateFormData,
  handleClickSubmitFormData,
  hasChangesFormData,
  updatedRiskMitigationMeasureLoadingFormdata,
}) => {
  return (
    <Form
      id="edit-risk-mitigation-measure-form"
      name="edit-risk-mitigation-measure-form"
      className="edit-risk-mitigation-measure-form"
      initialValues={{
        "risk-mitigation-measure-name": nameLocalStateFormData,
      }}
      autoComplete="off"
      style={{ width: "100%" }}
      layout="vertical"
      onFinish={handleClickSubmitFormData}
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
            message: "La medida de mitigación es obligatoria.",
          },
        ]}
      >
        <TextArea
          id="text-area-name-risk-mitigation-measure"
          name="text-area-name-risk-mitigation-measure"
          className="text-area-risk-mitigation-measure"
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
          classNameCustomButton="update-risk-mitigation-measure-button"
          idCustomButton="update-risk-mitigation-measure-button"
          titleCustomButton="Actualizar"
          typeCustomButton="primary"
          htmlTypeCustomButton="submit"
          iconCustomButton={
            !updatedRiskMitigationMeasureLoadingFormdata ? (
              <SaveOutlined />
            ) : (
              <LoadingOutlined />
            )
          }
          disabledCustomButton={
            hasChangesFormData && !updatedRiskMitigationMeasureLoadingFormdata
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

export default EditRiskMitigationMeasureFormData;
