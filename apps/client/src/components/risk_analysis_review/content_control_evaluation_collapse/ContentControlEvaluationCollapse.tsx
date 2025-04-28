import CustomCollapse from "@/components/common/custom_collapse/CustomCollapse";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { useGetAllControlEvaluationByEventAndYearQuery } from "@/redux/apis/control_evaluation/controlEvaluationApi";
import { Empty, Skeleton, Table, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import { getRiskLevelProbabilityByImpact } from "../helpers/get_risk_level_probability_by_impact";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";

const ContentControlEvaluationCollapse: React.FC<{
  allControlEvaluationByEventAndYearData: ControlEvaluation[] | undefined;
  allControlEvaluationByEventAndYearLoading: boolean;
  allControlEvaluationByEventAndYearFetching: boolean;
}> = ({
  allControlEvaluationByEventAndYearData,
  allControlEvaluationByEventAndYearLoading,
  allControlEvaluationByEventAndYearFetching,
}) => {
  const dateKey: keyof ControlEvaluation = "createdAt";
  const quarterYearKey: keyof ControlEvaluation = "quarterYear";
  const quarterYearNameKey: keyof QuarterYear = "qua_name";
  const probabilityKey: keyof ControlEvaluation = "probabilityOcurrence";
  const probabilityNameKey: keyof ProbabilityOcurrence = "prob_o_name";
  const impactKey: keyof ControlEvaluation = "impact";
  const impactNamKey: keyof Impact = "imp_name";
  const materializedKey: keyof ControlEvaluation = "con_e_materialized_case";
  const complianceKey: keyof ControlEvaluation = "con_e_compliance_control";

  return (
    <CustomCollapse
      childrenCustomCollapse={
        <>
          {Array.isArray(allControlEvaluationByEventAndYearData) &&
          allControlEvaluationByEventAndYearData.length > 0 ? (
            <Table
              size="small"
              dataSource={allControlEvaluationByEventAndYearData}
              rowKey={(record) => record.id}
              pagination={false}
              bordered
              components={{
                body: {
                  cell: (props: any) => (
                    <td
                      {...props}
                      style={{
                        padding: "4px 8px",
                        fontSize: "12px",
                      }}
                    />
                  ),
                },
              }}
              loading={{
                spinning:
                  allControlEvaluationByEventAndYearFetching ||
                  allControlEvaluationByEventAndYearLoading,
                indicator: <CustomSpin />,
              }}
              locale={{
                emptyText:
                  allControlEvaluationByEventAndYearFetching ||
                  allControlEvaluationByEventAndYearLoading ? (
                    <Skeleton active />
                  ) : (
                    <Empty description="No hay evaluaciones de control disponibles" />
                  ),
              }}
            >
              <Table.Column
                title="Fecha"
                dataIndex={dateKey}
                key={dateKey}
                render={(date, record) => (
                  <div key={record.id}>
                    <Typography.Text strong>
                      {record.con_e_is_inherent
                        ? "Fecha inherente:"
                        : "Fecha residual:"}
                    </Typography.Text>
                    <br />
                    {dayjs(date).format("DD / MM / YYYY")}
                  </div>
                )}
              />

              <Table.Column
                title="Trimestre"
                dataIndex={[quarterYearKey, quarterYearNameKey]}
                key={quarterYearKey}
                render={(prob) => prob || "-"}
              />

              <Table.Column
                title="Probabilidad"
                dataIndex={[probabilityKey, probabilityNameKey]}
                key={probabilityKey}
                render={(prob) => prob || "-"}
              />

              <Table.Column
                title="Impacto"
                dataIndex={[impactKey, impactNamKey]}
                key={impactKey}
                render={(impact) => impact || "-"}
              />

              <Table.Column
                title="Nivel de riesgo"
                key="rislLevel"
                render={(record) => {
                  const riskLevel = getRiskLevelProbabilityByImpact(
                    record.probabilityOcurrence?.prob_o_level,
                    record.impact?.imp_level
                  );
                  return (
                    <span style={{ color: riskLevel?.color }}>
                      {riskLevel?.name || "-"}
                    </span>
                  );
                }}
              />

              <Table.Column
                title="Materializado"
                dataIndex={materializedKey}
                key={materializedKey}
                render={(value) => `${value} veces`}
              />

              <Table.Column
                title="Cumplimiento control"
                dataIndex={complianceKey}
                key={complianceKey}
                render={(value) => (value !== null ? `${value} %` : "-")}
              />
            </Table>
          ) : (
            <Typography.Text type="secondary">
              No hay evaluaciones de control disponibles
            </Typography.Text>
          )}
        </>
      }
      labelCustomCollapse={
        <Typography.Title
          level={5}
          style={{
            ...titleStyleCss,
            color: "#f28322",
            margin: 0,
            marginBottom: 0,
          }}
        >
          Evaluación de control
        </Typography.Title>
      }
    />
  );
};

export default ContentControlEvaluationCollapse;
