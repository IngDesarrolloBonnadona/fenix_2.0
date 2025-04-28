"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Space } from "antd";

import { FaCircleCheck } from "react-icons/fa6";

import { titleStyleCss } from "@/theme/text_styles";

import CustomButton from "../../common/custom_button/CustomButton";

const ContentReportGeneratedSuccessfully: React.FC<{
  messageData: string;
}> = ({ messageData }) => {
  const router = useRouter();

  return (
    <div
      className="content-report-generated-successfully"
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
          <FaCircleCheck color="#1D8348" size={77} />
        </div>

        <h2
          className="title-report-generated-successfully"
          style={{ ...titleStyleCss, textAlign: "center" }}
        >
          {messageData}
        </h2>

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
            titleCustomButton="Salir"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            onClickCustomButton={() => router.push(`/dashboard`)}
            sizeCustomButton={"small"}
            styleCustomButton={{
              backgroundColor: "#6C757D",
              color: "#f2f2f2",
              borderRadius: "16px",
              padding: "3px 17px",
            }}
          />
          <CustomButton
            classNameCustomButton="confirm-button-custom-modal"
            idCustomButton="confirm-button-custom-modal"
            titleCustomButton="Generar otro reporte"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            onClickCustomButton={() => router.push(`/create_report`)}
            sizeCustomButton={"small"}
            styleCustomButton={{
              backgroundColor: "#f28322",
              color: "#f2f2f2",
              borderRadius: "16px",
              padding: "3px 17px",
            }}
          />
        </Space>
      </Space>
    </div>
  );
};

export default ContentReportGeneratedSuccessfully;
