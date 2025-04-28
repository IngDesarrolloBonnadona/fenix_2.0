import { FloatButton } from "antd";
import { ButtonHTMLType, ButtonShape, ButtonType } from "antd/es/button";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React, { ReactNode } from "react";

const CustomFloatButton: React.FC<{
  typeCustomButton?: "default" | "primary";
  htmlTypeCustomButton?: ButtonHTMLType;
  classNameCustomButton?: string;
  descriptionCustomFloatButton?: string | undefined;
  styleCustomButton?: React.CSSProperties | undefined;
  iconCustomButton?: ReactNode;
  shapeCustomButton?: "circle" | "square";
  onClickCustomButton: () => void;
  onMouseDownCustomButton?: () => void;
}> = ({
  typeCustomButton,
  htmlTypeCustomButton,
  classNameCustomButton,
  descriptionCustomFloatButton,
  styleCustomButton,
  iconCustomButton,
  shapeCustomButton,
  onClickCustomButton,
  onMouseDownCustomButton,
}) => {
  return (
    <FloatButton
      className={classNameCustomButton}
      description={descriptionCustomFloatButton}
      type={typeCustomButton}
      htmlType={htmlTypeCustomButton || "button"}
      style={styleCustomButton}
      icon={iconCustomButton}
      shape={shapeCustomButton}
      onClick={onClickCustomButton}
      onMouseDown={onMouseDownCustomButton}
    >
      CustomFloatButton
    </FloatButton>
  );
};

export default CustomFloatButton;
