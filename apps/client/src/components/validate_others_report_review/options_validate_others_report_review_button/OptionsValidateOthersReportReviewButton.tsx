import React from "react";

import { Space } from "antd";

import CustomButton from "@/components/common/custom_button/CustomButton";

import { BsTrashFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { PermissionsActionsValidation } from "@/helpers/permission_validation/permissionsActionsValidation";
import { ModuleActionsEnum } from "@/utils/enums/permissions/module_actions/module_actions.enum";

const OptionsValidateOthersReportReviewButton: React.FC<{
  handleCLickCancelCase: () => void;
  handleClickReAssignAnalyst: () => void;
  caseValidateDeleted: string;
}> = ({
  handleCLickCancelCase,
  handleClickReAssignAnalyst,
  caseValidateDeleted,
}) => {
  return (
    <>
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <>
          {!caseValidateDeleted && (
            <CustomButton
              idCustomButton="cancel-case-button"
              typeCustomButton="primary"
              sizeCustomButton="small"
              iconPositionCustomButton={"end"}
              onClickCustomButton={handleCLickCancelCase}
              titleCustomButton="Anular Caso"
              iconCustomButton={<BsTrashFill />}
              styleCustomButton={{
                background: "#8C1111",
                color: "#fff",
                fontSize: "12px",
                borderRadius: "16px",
              }}
            />
          )}
        </>

        <div className="reassign-analyst-button">
          <CustomButton
            idCustomButton="reassign-analyst-button"
            typeCustomButton="primary"
            sizeCustomButton="small"
            iconPositionCustomButton={"end"}
            onClickCustomButton={handleClickReAssignAnalyst}
            titleCustomButton="Reasignar analista"
            iconCustomButton={<FaUserAlt />}
            styleCustomButton={{
              background: "#015E90",
              color: "#fff",
              fontSize: "12px",
              borderRadius: "16px",
            }}
          />
        </div>
      </Space>
    </>
  );
};

export default OptionsValidateOthersReportReviewButton;
