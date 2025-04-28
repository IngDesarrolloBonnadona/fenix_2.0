import { Col, Row } from "antd";
import React from "react";
import CaseTypeOptionComponent from "./case_type_options/CaseTypeOptionComponent";

const CreateReportContent: React.FC = () => {
  return (
    <div className="case-type-option" style={{ padding: "16px" }}>
      <CaseTypeOptionComponent />
    </div>
  );
};

export default CreateReportContent;
