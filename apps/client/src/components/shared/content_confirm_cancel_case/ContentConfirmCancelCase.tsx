"use client";

import React from "react";

import { Form, Input, Select, Space } from "antd";

import { titleStyleCss } from "@/theme/text_styles";

import CustomButton from "../../common/custom_button/CustomButton";

import { LuFileQuestion } from "react-icons/lu";
import { LoadingOutlined } from "@ant-design/icons";

const ContentConfirmCancelCase: React.FC<{
  observationCancellationCase: string;
  setObservationCancellationCase: (value: string) => void;
  reasonCancellationCaseId: number;
  setReasonCancellationCaseId: (value: number) => void;
  isSubmittinCancellationCase: boolean;
  allReasonCancellationDataLoading: boolean;
  allReasonCancellationDataFetching: boolean;
  allReasonCancellationData: ReasonCancellationCase[] | undefined;
  onCloseModal: () => void;
  handleCLickCancelCase: () => void;
}> = ({
  observationCancellationCase,
  setObservationCancellationCase,
  reasonCancellationCaseId,
  setReasonCancellationCaseId,
  isSubmittinCancellationCase,
  allReasonCancellationDataLoading,
  allReasonCancellationDataFetching,
  allReasonCancellationData,
  onCloseModal,
  handleCLickCancelCase,
}) => {
  return (
    <div
      className="content-confirm-cancel-case"
      style={{
        display: "flex",
        flexFlow: "column wrap",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        marginBlock: "9px",
        marginInline: "3px",
      }}
    >
      <Space
        direction="vertical"
        size="small"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ marginBlock: 2 }}>
          <LuFileQuestion color="#015E90" size={77} />
        </div>

        <h2
          className="title-confirm-cancel-case"
          style={{ ...titleStyleCss, textAlign: "center" }}
        >
          ¿Estas seguro(a) que deseas anular el caso?
        </h2>

        <Form
          id="reason-cancel-case-form"
          name="reason-cancel-case-form"
          className="reason-cancel-case-form"
          layout="vertical"
          autoComplete="off"
          onFinish={handleCLickCancelCase}
        >
          <Form.Item
            label="Razón de anulación"
            id="reason-cancel-id"
            className="reason-cancel-id"
            name="reason-cancel-id"
            rules={[
              {
                required: true,
                message: "¡Por favor seleccione una opción!",
              },
            ]}
            style={{
              minWidth: "200px",
              marginBottom: "5px",
              marginTop: 0,
            }}
          >
            <Select
              placeholder={"Seleccione una opción"}
              onChange={(value) => setReasonCancellationCaseId(value)}
              value={reasonCancellationCaseId}
              allowClear
              size="small"
              loading={
                allReasonCancellationDataFetching ||
                allReasonCancellationDataLoading
              }
              style={{ width: "100%" }}
            >
              {Array.isArray(allReasonCancellationData) &&
                allReasonCancellationData?.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.cac_r_cause}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Describa la justificación de anulación"
            id="justification-cancellation-input"
            className="justification-cancellation-input"
            name="justification-cancellation-input"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Escribe la justificación de anulación!",
              },
            ]}
          >
            <Input.TextArea
              id="reason-of-cancellation-report"
              className="reason-of-cancellation-report"
              size="small"
              placeholder="Justifique..."
              value={observationCancellationCase}
              onChange={(e) =>
                setObservationCancellationCase(e.target.value.toUpperCase())
              }
              style={{
                width: "100%",
                textTransform: "uppercase",
              }}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>

          <Form.Item
            style={{ width: "100%", marginBottom: "-5px", marginTop: "-8px" }}
          >
            <Space
              direction="horizontal"
              size="large"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                marginTop: 13,
              }}
            >
              <CustomButton
                classNameCustomButton="exit-button-custom-modal"
                idCustomButton="exit-button-custom-modal"
                titleCustomButton="No"
                typeCustomButton="primary"
                htmlTypeCustomButton="button"
                onClickCustomButton={onCloseModal}
                sizeCustomButton={"small"}
                styleCustomButton={{
                  backgroundColor: "#6C757D",
                  color: "#f2f2f2",
                  borderRadius: "16px",
                  padding: "3px 17px",
                }}
              />
              <CustomButton
                classNameCustomButton="exit-button-custom-modal"
                idCustomButton="exit-button-custom-modal"
                titleCustomButton="Si"
                typeCustomButton="primary"
                htmlTypeCustomButton="submit"
                onClickCustomButton={() => ({})}
                sizeCustomButton={"small"}
                iconCustomButton={
                  isSubmittinCancellationCase && <LoadingOutlined />
                }
                iconPositionCustomButton="end"
                disabledCustomButton={
                  !isSubmittinCancellationCase ? false : true
                }
                styleCustomButton={{
                  backgroundColor: isSubmittinCancellationCase
                    ? "#6C757D"
                    : "#f28322",
                  color: "#f2f2f2",
                  borderRadius: "16px",
                  padding: "3px 17px",
                }}
              />
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default ContentConfirmCancelCase;
