"use client";

import { Popover } from "antd";
import React, { ReactNode } from "react";

type ActionType = "click" | "hover" | "focus" | "contextMenu";

const CustomPopoverNoContent: React.FC<{
  contentCustomPopover: ReactNode;
  componentCustomPopover: ReactNode;
  titleCustomPopover: string;
  triggerCustomPopover: ActionType | ActionType[] | undefined;
  overlayStyleCustomPopover?: React.CSSProperties | undefined;
}> = ({
  contentCustomPopover,
  componentCustomPopover,
  titleCustomPopover,
  triggerCustomPopover,
  overlayStyleCustomPopover,
}) => {
  return (
    <Popover
      title={titleCustomPopover}
      content={contentCustomPopover}
      trigger={triggerCustomPopover}
      overlayStyle={overlayStyleCustomPopover}
    >
      {componentCustomPopover}
    </Popover>
  );
};

export default CustomPopoverNoContent;
