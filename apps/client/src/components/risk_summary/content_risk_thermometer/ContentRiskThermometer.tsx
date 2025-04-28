"use client";

import React from "react";

import { Table } from "antd";

import { getRiskLevelProbabilityByImpact } from "@/components/risk_analysis_review/helpers/get_risk_level_probability_by_impact";

const ContentRiskThermometer: React.FC<{
  controlEvaluationData: ControlEvaluation[] | undefined;
  onCellClick: (data: ControlEvaluation[]) => void;
}> = ({ controlEvaluationData, onCellClick }) => {
  // Definir los valores estándar de riesgo
  const standardRiskLevels = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 20, 25];

  // Crear un objeto para contar los casos materializados en cada nivel de riesgo
  const riskCounts: Record<number, number> = {};
  standardRiskLevels.forEach((level) => {
    riskCounts[level] = 0;
  });

  // Agrupar los casos materializados en base al nivel de riesgo
  Array.isArray(controlEvaluationData) &&
    controlEvaluationData?.forEach((item) => {
      if (item.probabilityOcurrence?.prob_o_level && item.impact?.imp_level) {
        const riskLevel =
          item.probabilityOcurrence.prob_o_level * item.impact.imp_level;

        if (riskCounts[riskLevel] !== undefined) {
          riskCounts[riskLevel] += item.con_e_materialized_case;
        }
      }
    });

  // Sumar todos los casos materializados
  const totalMaterializedCases = Object.values(riskCounts).reduce(
    (acc, curr) => acc + curr,
    0
  );

  const columns: Array<{
    title: JSX.Element;
    dataIndex: number | string;
    key: number | string;
    align: "center";
    render: (value: number, record: any) => JSX.Element | number;
  }> = standardRiskLevels.map((level) => {
    const riskInfo = getRiskLevelProbabilityByImpact(level, 1);

    return {
      title: (
        <div
          style={{
            backgroundColor: riskInfo?.color,
            color: "#fff",
            textAlign: "center",
            padding: "5px",
            borderRadius: "4px",
          }}
        >
          {level}
        </div>
      ),
      dataIndex: level,
      key: level,
      align: "center" as "center",
      render: (value: number, record: any) => {
        const relatedData: ControlEvaluation[] | undefined =
          controlEvaluationData?.filter((item) => {
            const riskLevel =
              (item.probabilityOcurrence?.prob_o_level ?? 0) *
              (item.impact?.imp_level ?? 0);
            return riskLevel === level;
          });

        return (
          <div
            onClick={() => onCellClick(relatedData || [])}
            style={{ cursor: "pointer" }}
          >
            {value || 0}
          </div>
        );
      },
    };
  });

  // Agregar la columna "Total"
  columns.push({
    title: <div>Total</div>,
    dataIndex: "total",
    key: "total",
    align: "center",
    render: (value: number) => value,
  });

  // Configurar los datos de la tabla
  const dataSource = [
    {
      key: "cases",
      ...riskCounts,
      total: totalMaterializedCases,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered
      size="small"
      style={{ padding: "18px" }}
    />
  );
};

export default ContentRiskThermometer;
