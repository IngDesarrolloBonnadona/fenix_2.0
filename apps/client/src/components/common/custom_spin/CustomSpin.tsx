"use client";

import React from "react";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const CustomSpin: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin />
    </div>
  );
};

export default CustomSpin;
