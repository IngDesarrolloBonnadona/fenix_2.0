import React from "react";

import { Space } from "antd";

import { titleStyleCss } from "@/theme/text_styles";

import CustomButton from "../../common/custom_button/CustomButton";

import { TbUserCheck } from "react-icons/tb";

const ContentMessageSuccessfully: React.FC<{
  messageData: string;
  handleClickCLoseModal: () => void;
}> = ({ messageData, handleClickCLoseModal }) => {
  return (
    <div
      className="content-message-successfully"
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
          <TbUserCheck color="#1D8348" size={77} />
        </div>

        <h2
          className="title-message-successfully"
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
            onClickCustomButton={handleClickCLoseModal}
            sizeCustomButton={"small"}
            styleCustomButton={{
              backgroundColor: "#6C757D",
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

export default ContentMessageSuccessfully;
