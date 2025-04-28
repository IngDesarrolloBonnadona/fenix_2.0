import React from "react";

import { Form, Input, Select, Space } from "antd";

import { titleStyleCss } from "@/theme/text_styles";

import CustomButton from "../../common/custom_button/CustomButton";

import { LuFileQuestion } from "react-icons/lu";
import { LoadingOutlined } from "@ant-design/icons";

const ContentConfirmReturnCase: React.FC<{
  textTitleConfirmReturnCase: string;
  observationReturnCase: string;
  setObservationReturnCase: (value: string) => void;
  reasonReturnCaseId: number;
  setReasonReturnCaseId: (value: number) => void;
  isSubmittingReturnCase: boolean;
  allReasonReturnCaseByRoleIdLoading: boolean;
  allReasonReturnCaseByRoleIdFetching: boolean;
  allReasonReturnCaseByRoleIdData: ReasonReturnCase[] | undefined;
  onCloseModal: () => void;
  handleClickReturnCase: () => void;
}> = ({
  textTitleConfirmReturnCase,
  observationReturnCase,
  setObservationReturnCase,
  reasonReturnCaseId,
  setReasonReturnCaseId,
  isSubmittingReturnCase,
  allReasonReturnCaseByRoleIdData,
  allReasonReturnCaseByRoleIdFetching,
  allReasonReturnCaseByRoleIdLoading,
  handleClickReturnCase,
  onCloseModal,
}) => {
  return (
    <div
      className="content-confirm-return-case"
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
          className="title-confirm-return-case"
          style={{ ...titleStyleCss, textAlign: "center" }}
        >
          {textTitleConfirmReturnCase}
        </h2>

        <Form
          id="reason-return-case-form"
          name="reason-return-case-form"
          className="reason-return-case-form"
          layout="vertical"
          autoComplete="off"
          onFinish={handleClickReturnCase}
        >
          <Form.Item
            label="Razón de devolución"
            id="reason-return-id"
            className="reason-return-id"
            name="reason-return-id"
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
              onChange={(value) => setReasonReturnCaseId(value)}
              value={reasonReturnCaseId}
              allowClear
              size="small"
              loading={
                allReasonReturnCaseByRoleIdFetching ||
                allReasonReturnCaseByRoleIdLoading
              }
              style={{ width: "100%" }}
            >
              {Array.isArray(allReasonReturnCaseByRoleIdData) &&
                allReasonReturnCaseByRoleIdData?.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.rec_r_cause}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Describa la justificación de devolución"
            id="justification-return-input"
            className="justification-return-input"
            name="justification-return-input"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Escribe la justificación de devolución!",
              },
            ]}
          >
            <Input.TextArea
              id="reason-of-return-report"
              className="reason-of-return-report"
              size="small"
              placeholder="Justifique..."
              value={observationReturnCase}
              onChange={(e) =>
                setObservationReturnCase(e.target.value.toUpperCase())
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
                disabledCustomButton={!isSubmittingReturnCase ? false : true}
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
                iconCustomButton={isSubmittingReturnCase && <LoadingOutlined />}
                iconPositionCustomButton="end"
                disabledCustomButton={!isSubmittingReturnCase ? false : true}
                styleCustomButton={{
                  backgroundColor: isSubmittingReturnCase
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

export default ContentConfirmReturnCase;
