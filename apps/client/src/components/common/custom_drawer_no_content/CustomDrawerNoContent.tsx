"use client";

import { Drawer } from "antd";
import React, { ReactNode } from "react";

const CustomDrawerNoContent: React.FC<{
  widthCustomDrawerContent?: string;
  titleCustomDrawerContent: string;
  minWidthCustomDrawerNoContent?: string;
  paddingBlockCustomDrawerNoContent?: number | string;
  openCustomDrawerState: boolean;
  maskClosableCustomDrawer: boolean;
  closableCustomDrawer: boolean;
  contentCustomDrawer: ReactNode;
  handleCancelCustomDrawer?: () => void;
}> = ({
  widthCustomDrawerContent,
  titleCustomDrawerContent,
  minWidthCustomDrawerNoContent,
  paddingBlockCustomDrawerNoContent,
  openCustomDrawerState,
  maskClosableCustomDrawer,
  closableCustomDrawer,
  contentCustomDrawer,
  handleCancelCustomDrawer,
}) => {
  return (
    <Drawer
      className="custom-drawer-no-content"
      width={widthCustomDrawerContent}
      style={{
        minWidth: minWidthCustomDrawerNoContent || "345px",
        alignContent: "center",
        justifyContent: "center",
        paddingBlock: paddingBlockCustomDrawerNoContent || "31px",
        margin: "0px",
      }}
      open={openCustomDrawerState}
      title={titleCustomDrawerContent}
      onClose={handleCancelCustomDrawer}
      maskClosable={maskClosableCustomDrawer}
      closable={closableCustomDrawer}
      destroyOnClose={true}
      footer={null}
    >
      <div className="content-custom-drawer-no-content">
        {contentCustomDrawer}
      </div>
    </Drawer>
  );
};

export default CustomDrawerNoContent;
