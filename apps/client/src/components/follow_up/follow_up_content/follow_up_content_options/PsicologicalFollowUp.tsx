import React, { useState } from "react";
import CustomMessageState from "@/components/common/custom_messages/CustomMessageState";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

const PsicologicalFollowUp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [psicologicalFollowUp, setPsicologicalFollowUp] = useState<
    CaseReportValidate[]
  >([]);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={psicologicalFollowUp || []}
        onClickRechargeCustomTable={() => ({})}
        loading={false}
        columnsCustomTable={[]}
      />
    </div>
  );
};

export default PsicologicalFollowUp;
