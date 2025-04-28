"use client";

import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

const ContentRiskStatisticalReportTable: React.FC<{
  controlEvaluationData: ControlEvaluation[] | undefined;
  riskTypeData: RiskType[] | undefined;
  quartersYearData: QuarterYear[] | undefined;
  onCellClick: (evaluations: ControlEvaluation[]) => void;
}> = ({
  controlEvaluationData,
  riskTypeData,
  quartersYearData,
  onCellClick,
}) => {
  const getTableData = () => {
    return quartersYearData
      ? quartersYearData.map((quarter) => {
          const rowData: any = { key: quarter.id, trimestre: quarter.qua_name };

          riskTypeData?.forEach((riskType) => {
            const relatedEvaluations =
              controlEvaluationData?.filter(
                (item) =>
                  item.con_e_quarter_year_id === quarter.id &&
                  item.event?.eve_risk_type_id === riskType.id
              ) || [];

            const totalCases = relatedEvaluations.reduce(
              (sum, item) => sum + item.con_e_materialized_case,
              0
            );

            rowData[riskType.ris_t_name] = totalCases || "-";
            rowData[`evaluations_${riskType.id}`] = relatedEvaluations;
          });

          return rowData;
        })
      : [];
  };

  const columns: ColumnsType<any> = [
    {
      title: "Trimestre",
      dataIndex: "trimestre",
      key: "trimestre",
      align: "center",
      onCell: () => ({
        style: { fontSize: "12px" },
      }),
    },
    ...(riskTypeData
      ? riskTypeData.map((riskType) => ({
          title:
            riskType.ris_t_name.charAt(0).toLocaleUpperCase() +
            riskType.ris_t_name.slice(1).toLocaleLowerCase(),
          dataIndex: riskType.ris_t_name,
          key: riskType.id,
          align: "center" as "center",
          onCell: (record: any) => ({
            style: {
              backgroundColor:
                record[riskType.ris_t_name] > 0 ? "#f0f0f0" : "normal",
              fontWeight: record[riskType.ris_t_name] > 0 ? "bold" : "normal",
              cursor: record[riskType.ris_t_name] > 0 ? "pointer" : "default",
              fontSize: "12px",
            },
            onClick: () => {
              if (record[riskType.ris_t_name] > 0) {
                onCellClick(record[`evaluations_${riskType.id}`]);
              }
            },
          }),
        }))
      : []),
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={getTableData()}
        pagination={false}
        bordered
        size="small"
        style={{ padding: "10px" }}
        components={{
          header: {
            cell: (props: any) => (
              <th
                {...props}
                style={{
                  backgroundColor: "#002140",
                  color: "#ffff",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default ContentRiskStatisticalReportTable;
