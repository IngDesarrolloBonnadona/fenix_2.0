"use client";

import React from "react";

const ContentSimpleCaseDataDetails: React.FC<{
  selectedCasesData: CaseReportValidate;
  severityClasificationNameData?: string | null;
}> = ({ selectedCasesData, severityClasificationNameData }) => {
  return (
    <div>
      <p>
        <b>Fecha del caso:</b>&nbsp;
        <span>{selectedCasesData.val_cr_dateofcase}</span>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>
          <b>Tipo de documento:</b>&nbsp;
          <span>{selectedCasesData.val_cr_doctypepatient}</span>
        </p>
        <p>
          <b>Documento:</b>&nbsp;
          <span>{selectedCasesData.val_cr_documentpatient}</span>
        </p>
      </div>
      <p>
        <b>Paciente:</b>&nbsp;
        <span>{selectedCasesData.val_cr_firstnamepatient}</span>
        &nbsp;
        <span>{selectedCasesData.val_cr_secondnamepatient}</span>&nbsp;
        <span>{selectedCasesData.val_cr_firstlastnamepatient}</span>
        &nbsp;
        <span>{selectedCasesData.val_cr_secondlastnamepatient}</span>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>
          <b>Edad:</b>&nbsp;
          <span>{selectedCasesData.val_cr_agepatient}</span>
        </p>
        <p>
          <b>EPS:</b>&nbsp;
          <span>{selectedCasesData.val_cr_epspatient}</span>
        </p>
      </div>
      <p>
        <b>Diagnóstico:</b>&nbsp;
        <span>{selectedCasesData.val_cr_diagnosticdescriptionpatient}</span>
      </p>
      {severityClasificationNameData && (
        <p>
          <b>Clasificación de severidad:</b>&nbsp;
          <span>{severityClasificationNameData}</span>
        </p>
      )}
      <p>
        <b>Descripción del caso:</b>&nbsp;
        <span>{selectedCasesData.val_cr_description}</span>
      </p>
      {selectedCasesData.val_cr_inmediateaction && (
        <p>
          <b>Acciones inmediatas:</b>&nbsp;
          <span>{selectedCasesData.val_cr_inmediateaction}</span>
        </p>
      )}
    </div>
  );
};

export default ContentSimpleCaseDataDetails;
