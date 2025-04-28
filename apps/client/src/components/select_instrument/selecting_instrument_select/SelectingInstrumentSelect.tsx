"use client";

import React from "react";
import { Select } from "antd";

const SelectingInstrumentSelect: React.FC<{
  handleChangeSelectInstrument: (e: any) => void;
  researchInstrumentIdState: number | null;
  allResearchInstrumentData: ResearchInstrument[] | undefined;
}> = ({
  handleChangeSelectInstrument,
  researchInstrumentIdState,
  allResearchInstrumentData,
}) => {
  return (
    <Select
      placeholder={"Seleccione una opción"}
      onChange={handleChangeSelectInstrument}
      value={researchInstrumentIdState}
      showSearch
      allowClear
      size="small"
      filterOption={(input, option) => {
        return (
          (option?.children &&
            option.children
              .toString()
              .toUpperCase()
              .includes(input.toUpperCase())) ||
          false
        );
      }}
      style={{ width: "70%" }}
    >
      {Array.isArray(allResearchInstrumentData) &&
        allResearchInstrumentData?.map((item: any) => (
          <Select.Option key={item.id} value={item.id}>
            {item.inst_r_name}
          </Select.Option>
        ))}
    </Select>
  );
};

export default SelectingInstrumentSelect;
