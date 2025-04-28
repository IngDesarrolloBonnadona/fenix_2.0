"use client";

import CustomButton from "@/components/common/custom_button/CustomButton";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";
import { Space } from "antd";
import React from "react";
import { LuFileQuestion } from "react-icons/lu";
import { LoadingOutlined } from "@ant-design/icons";

const ContentConfirmResolutionSynergy: React.FC<{
  onCloseModal: () => void;
  handleClickSubmit: () => void;
  isSubmittinCancellationCase: boolean;
}> = ({ onCloseModal, handleClickSubmit, isSubmittinCancellationCase }) => {
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
          className="title-confirm-resolution-synergy"
          style={{ ...titleStyleCss, textAlign: "center" }}
        >
          ¿Estas seguro(a) que deseas resolver el caso en sinergia?
        </h2>

        <h3
          className="title-confirm-resolution-synergy-message"
          style={{ ...subtitleStyleCss, textAlign: "center" }}
        >
          Esta acción es irreversible
        </h3>

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
            onClickCustomButton={handleClickSubmit}
            sizeCustomButton={"small"}
            iconCustomButton={
              isSubmittinCancellationCase && <LoadingOutlined />
            }
            iconPositionCustomButton="end"
            disabledCustomButton={!isSubmittinCancellationCase ? false : true}
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
      </Space>
    </div>
  );
};

export default ContentConfirmResolutionSynergy;
