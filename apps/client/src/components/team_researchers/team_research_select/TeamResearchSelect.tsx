import { Select } from "antd";
import React from "react";

const TeamResearchSelect: React.FC<{
  researcherOptionsData: {
    value: number | undefined;
    label: string;
  }[];
  idNumberResearcherLocalStateData: string;
  onChangeIdNumberResearcherLocalStateData: (e: any) => void;
  allAssignedResearchersByIdNumberAnalystLoadingData: boolean;
  allAssignedResearchersByIdNumberAnalystFetchingData: boolean;
  allUsersActiveLoadingData: boolean;
  allUsersActiveFetchingData: boolean;
}> = ({
  allAssignedResearchersByIdNumberAnalystFetchingData,
  allAssignedResearchersByIdNumberAnalystLoadingData,
  allUsersActiveFetchingData,
  allUsersActiveLoadingData,
  idNumberResearcherLocalStateData,
  onChangeIdNumberResearcherLocalStateData,
  researcherOptionsData,
}) => {
  return (
    <div>
      {" "}
      <Select
        options={researcherOptionsData}
        style={{ width: "100%" }}
        placeholder="Seleccione una opción"
        value={idNumberResearcherLocalStateData}
        onChange={(value) => {
          onChangeIdNumberResearcherLocalStateData(value);
        }}
        loading={
          allAssignedResearchersByIdNumberAnalystLoadingData ||
          allAssignedResearchersByIdNumberAnalystFetchingData ||
          allUsersActiveLoadingData ||
          allUsersActiveFetchingData
        }
        allowClear
        showSearch
        filterOption={(input, option) => {
          return (
            (option?.label &&
              option.label
                .toString()
                .toUpperCase()
                .includes(input.toUpperCase())) ||
            false
          );
        }}
      />
    </div>
  );
};

export default TeamResearchSelect;
