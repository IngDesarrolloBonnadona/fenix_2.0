"use client";

import React from "react";
import { TabsProps } from "antd";
import CustomTabs from "@/components/common/custom_tabs/CustomTabs";
import AssignedCases from "./analysis_my_cases_content_option/AssignedCases";
import CasesCharacterization from "./analysis_my_cases_content_option/CasesCharacterization";
import { myCasesOption } from "../utils/enums/myCasesOption.enum";
import { titleStyleCss } from "@/theme/text_styles";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: myCasesOption.ASSIGNED_CASES,
    children: <AssignedCases />,
  },
  {
    key: "2",
    label: myCasesOption.CHARACTERIZATION_CASES,
    children: <CasesCharacterization />,
  },
];

const AnalysisMyCasesContent: React.FC = () => {
  return (
    <>
      <div className="title-module">
        <h2
          style={{
            ...titleStyleCss,
            textAlign: "center",
          }}
        >
          Mis casos
        </h2>
      </div>
      <div>
        <CustomTabs
          item={items}
          sizeName="small"
          isCentered={true}
          defaultKey="1"
        />
      </div>
    </>
  );
};

export default AnalysisMyCasesContent;
