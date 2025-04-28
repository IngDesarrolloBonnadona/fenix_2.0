import { Tooltip } from "antd";
import { MenuItem } from "./types/menu_item_type";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    children,
    label: (
      <Tooltip title={label} placement="right">
        <span
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </span>
      </Tooltip>
    ),
    icon,
  } as MenuItem;
}

export function getItemSpin(key: React.Key): MenuItem {
  return {
    key,
    label: <CustomSpin />,
    icon: null,
    children: [],
  } as MenuItem;
}
