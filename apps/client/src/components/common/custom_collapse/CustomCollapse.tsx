"use client";

import { Collapse } from "antd";
import React from "react";

const CustomCollapse: React.FC<{
  labelCustomCollapse: React.ReactNode;
  childrenCustomCollapse: React.ReactNode;
}> = ({ labelCustomCollapse, childrenCustomCollapse }) => {
  return (
    <Collapse
      size="small"
      items={[
        {
          key: "1",
          label: labelCustomCollapse,
          children: childrenCustomCollapse,
          styles: {
            header: {
              fontWeight: "bold",
              color: "#f28322",
            },
          },
        },
      ]}
    />
  );
};

export default CustomCollapse;
