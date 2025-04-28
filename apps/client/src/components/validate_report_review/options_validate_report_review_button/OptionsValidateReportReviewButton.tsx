import React from "react";

import { Space } from "antd";

import CustomButton from "@/components/common/custom_button/CustomButton";

import { BsTrashFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { useAppSelector } from "@/redux/hook";
import { MovementReportEnum } from "@/utils/enums/movement_report.enum";
import { PermissionsActionsValidation } from "@/helpers/permission_validation/permissionsActionsValidation";
import { ModuleActionsEnum } from "@/utils/enums/permissions/module_actions/module_actions.enum";

const OptionsValidateReportReviewButton: React.FC<{
  handleCLickCancelCase: () => void;
  handleClickAssignAnalyst: () => void;
  handleClickGeneratePdf: () => void;
}> = ({
  handleCLickCancelCase,
  handleClickAssignAnalyst,
  handleClickGeneratePdf,
}) => {
  const movementReportName = useAppSelector(
    (state) => state.movementReport.mov_r_name
  );

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "center" }}>
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

        <>
          {movementReportName === MovementReportEnum.VALIDATION && (
            <div className="assign-analyst-button">
              <CustomButton
                idCustomButton="assign-analyst-button"
                typeCustomButton="primary"
                sizeCustomButton="small"
                iconPositionCustomButton={"end"}
                onClickCustomButton={handleClickAssignAnalyst}
                titleCustomButton="Asignar analista"
                iconCustomButton={<FaUserAlt />}
                styleCustomButton={{
                  background: "#015E90",
                  color: "#fff",
                  fontSize: "12px",
                  borderRadius: "16px",
                }}
              />
            </div>
          )}
        </>

        {/* <div className="generate-pdf-button">
          <CustomButton
            idCustomButton="generate-pdf-button"
            typeCustomButton="primary"
            sizeCustomButton="small"
            iconPositionCustomButton={"end"}
            onClickCustomButton={handleClickGeneratePdf}
            titleCustomButton="Generar PDF"
            iconCustomButton={<FaFilePdf />}
            styleCustomButton={{
              background: "#FF7F50",
              color: "#fff",
              fontSize: "12px",
              borderRadius: "16px",
            }}
          />
        </div> */}
      </Space>
    </>
  );
};

export default OptionsValidateReportReviewButton;
