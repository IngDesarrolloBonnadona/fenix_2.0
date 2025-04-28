import React from "react";

import { useRouter } from "next/navigation";

import CustomButton from "../../common/custom_button/CustomButton";
import { LeftOutlined } from "@ant-design/icons";

const Content_button_back_router: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <CustomButton
        idCustomButton="back-router-button"
        typeCustomButton="primary"
        sizeCustomButton="small"
        onClickCustomButton={router.back}
        titleCustomButton="Regresar"
        iconCustomButton={<LeftOutlined />}
        styleCustomButton={{
          background: "#002140",
          color: "#fff",
          fontSize: "12px",
          borderRadius: "16px",
        }}
      />
    </div>
  );
};

export default Content_button_back_router;
