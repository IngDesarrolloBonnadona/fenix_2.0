"use client";

import React from "react";

import { Space } from "antd";

import CustomButton from "@/components/common/custom_button/CustomButton";

import { BsTrashFill } from "react-icons/bs";
import { FaMicroscope, FaUserAlt } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { CaseTypeReportEnum } from "@/utils/enums/case_type_color.enum";
import { SeverityClasificationEnum } from "@/utils/enums/severity_clasif.enum";

const OptionsAnalysisMyCasesAssignmentReviewButton: React.FC<{
  handleCLickCancelCase: () => void;
  handleClickReturnCaseToAnalyst: () => void;
  handleClickClinicialResearch: () => void;
  caseTypeName: string | undefined;
  severityClasificationName: string | undefined;
}> = ({
  handleCLickCancelCase,
  handleClickReturnCaseToAnalyst,
  handleClickClinicialResearch,
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

            <div className="return-case-button">
              <CustomButton
                idCustomButton="return-case-button"
                typeCustomButton="primary"
                sizeCustomButton="small"
                iconPositionCustomButton={"end"}
                onClickCustomButton={handleClickReturnCaseToAnalyst}
                titleCustomButton="Devolver caso a analista"
                iconCustomButton={<IoReturnUpBackOutline />}
                styleCustomButton={{
                  background: "#FF7F50",
                  color: "#fff",
                  fontSize: "12px",
                  borderRadius: "16px",
                }}
              />
            </div>
          </>
        )}
        <div className="clinic-investigation-button">
          <CustomButton
            idCustomButton="start-investigation-button"
            typeCustomButton="primary"
            sizeCustomButton="small"
            iconPositionCustomButton={"end"}
            onClickCustomButton={handleClickClinicialResearch}
            titleCustomButton="Investigación Clínica"
            iconCustomButton={<FaMicroscope />}
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

export default OptionsAnalysisMyCasesAssignmentReviewButton;
