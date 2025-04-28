"use client";

import React from "react";

import { TabsProps } from "antd";
import CustomTabs from "@/components/common/custom_tabs/CustomTabs";
import StayFollowUp from "./follow_up_content_options/StayFollowUp";
import PsicologicalFollowUp from "./follow_up_content_options/PsicologicalFollowUp";
import TelephoneFollowUp from "./follow_up_content_options/TelephoneFollowUp";

import { followUpOption } from "../utils/enums/monitoringOption.enum";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: followUpOption.STAY_FOLLOW_UP,
    children: <StayFollowUp />,
  },
  {
    key: "2",
    label: followUpOption.PSICOLOGICAL_FOLLOW_UP,
    children: <PsicologicalFollowUp />,
  },
  {
    key: "3",
    label: followUpOption.TELEPHONE_FOLLOW_UP,
    children: <TelephoneFollowUp />,
  },
];

const FollowUpsContent: React.FC = () => {
  return (
    <div>
      <CustomTabs
        item={items}
        sizeName="small"
        isCentered={true}
        defaultKey="1"
      />
    </div>
  );
};

export default FollowUpsContent;
