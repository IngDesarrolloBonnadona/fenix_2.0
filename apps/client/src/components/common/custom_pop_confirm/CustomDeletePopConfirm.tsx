import { Button, Popconfirm } from "antd";
import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

interface DeletePopConfirmProps {
  onConfirm: () => void;
  titleButton: string;
  title: string;
  description: string;
}

const CustomDeletePopConfirm: React.FC<DeletePopConfirmProps> = ({
  onConfirm,
  titleButton,
  title,
  description,
}) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={() => onConfirm()}
      okText={"Si"}
      cancelText={"Cancelar"}
      trigger="click"
    >
      <Button
        size={"small"}
        title={titleButton}
        shape="circle"
        icon={<DeleteOutlined />}
        style={{ background: "#ff4d4f", color: "#ffffff" }}
      />
    </Popconfirm>
  );
};

export default CustomDeletePopConfirm;
