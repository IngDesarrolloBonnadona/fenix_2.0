import React, { useState } from "react";

import CustomMessageState from "@/components/common/custom_messages/CustomMessageState";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

const CasesCharacterization: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [casesCharacterization, setCasesCharacterization] = useState<
    CaseReportValidate[]
  >([]);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={casesCharacterization || []}
        onClickRechargeCustomTable={() => ({})}
        loading={false}
        customButton={<>{/* Button "inv. Clinica grupal" */}</>}
        columnsCustomTable={[]}
      />
    </div>
  );
};

export default CasesCharacterization;
