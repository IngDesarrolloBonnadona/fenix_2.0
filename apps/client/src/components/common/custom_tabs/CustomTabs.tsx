import { Tabs } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Tab } from "rc-tabs/lib/interface";
import React from "react";

interface CustomTabsProps {
  item: Tab[];
  sizeName: SizeType;
  isCentered: boolean;
  defaultKey: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  item,
  sizeName,
  isCentered,
  defaultKey,
}) => {
  return (
    <Tabs
      items={item}
      size={sizeName}
      centered={isCentered}
      defaultActiveKey={defaultKey}
    />
  );
};

export default CustomTabs;
