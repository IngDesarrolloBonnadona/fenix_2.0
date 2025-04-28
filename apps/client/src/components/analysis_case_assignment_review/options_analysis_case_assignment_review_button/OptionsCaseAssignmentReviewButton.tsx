"use client";

import React from "react";

import { Space } from "antd";

import CustomButton from "@/components/common/custom_button/CustomButton";

import { BsTrashFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { CaseTypeReportEnum } from "@/utils/enums/case_type_color.enum";
import { SeverityClasificationEnum } from "@/utils/enums/severity_clasif.enum";
import { PermissionsActionsValidation } from "@/helpers/permission_validation/permissionsActionsValidation";
import { ModuleActionsEnum } from "@/utils/enums/permissions/module_actions/module_actions.enum";

const OptionsAnalysisCaseAssignmentReviewButton: React.FC<{
  handleCLickCancelCase: () => void;
  handleClickAssignResearch: () => void;
  handleClickReturnBetwenAnalyst: () => void;
  handleClickReturnCaseToValidator: () => void;
  handleClickReassignResearch: () => void;
  reportResearcherAssignment: ReportResearcherAssignment | undefined;
  caseTypeName: string | undefined;
  severityClasificationName: string | undefined;
}> = ({
  handleCLickCancelCase,
  handleClickAssignResearch,
  handleClickReturnCaseToValidator,
  handleClickReturnBetwenAnalyst,
  handleClickReassignResearch,
  reportResearcherAssignment,
  caseTypeName,
  severityClasificationName,
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
        {!(
          caseTypeName === CaseTypeReportEnum.ADVERSE_EVENT &&
          (severityClasificationName ===
            SeverityClasificationEnum.MODERATE_SEVERITY ||
            severityClasificationName ===
              SeverityClasificationEnum.SERIOUS_SEVERITY)
        ) && (
          <>
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

            {Array.isArray(reportResearcherAssignment) &&
              reportResearcherAssignment.length === 0 && (
                <>
                  <div className="return-case-button">
                    <CustomButton
                      idCustomButton="return-case-button"
                      typeCustomButton="primary"
                      sizeCustomButton="small"
                      iconPositionCustomButton={"end"}
                      onClickCustomButton={handleClickReturnCaseToValidator}
                      titleCustomButton="Devolver caso a validador"
                      iconCustomButton={<IoReturnUpBackOutline />}
                      styleCustomButton={{
                        background: "#FF7F50",
                        color: "#fff",
                        fontSize: "12px",
                        borderRadius: "16px",
                      }}
                    />
                  </div>

                  <div className="return-between-analysts-button">
                    <CustomButton
                      idCustomButton="return-between-analysts-button"
                      typeCustomButton="primary"
                      sizeCustomButton="small"
                      iconPositionCustomButton={"end"}
                      onClickCustomButton={handleClickReturnBetwenAnalyst}
                      titleCustomButton="Reasignar entre analistas"
                      iconCustomButton={<IoReturnUpBackOutline />}
                      styleCustomButton={{
                        background: "#1D8348",
                        color: "#fff",
                        fontSize: "12px",
                        borderRadius: "16px",
                      }}
                    />
                  </div>
                </>
              )}

            {Array.isArray(reportResearcherAssignment) &&
              reportResearcherAssignment.length !== 0 && (
                <>
                  <div className="reassign-research-button">
                    <CustomButton
                      idCustomButton="ressign-research-button"
                      typeCustomButton="primary"
                      sizeCustomButton="small"
                      iconPositionCustomButton={"end"}
                      onClickCustomButton={handleClickReassignResearch}
                      titleCustomButton="Reasignar investigador"
                      iconCustomButton={<FaUserAlt />}
                      styleCustomButton={{
                        background: "#015E90",
                        color: "#fff",
                        fontSize: "12px",
                        borderRadius: "16px",
                      }}
                    />
                  </div>
                </>
              )}
          </>
        )}

        <>
          {Array.isArray(reportResearcherAssignment) &&
            reportResearcherAssignment.length === 0 && (
              <div className="assign-research-button">
                <CustomButton
                  idCustomButton="assign-research-button"
                  typeCustomButton="primary"
                  sizeCustomButton="small"
                  iconPositionCustomButton={"end"}
                  onClickCustomButton={handleClickAssignResearch}
                  titleCustomButton="Asignar investigador"
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
      </Space>
    </>
  );
};

export default OptionsAnalysisCaseAssignmentReviewButton;
