"use client";

import React, { useEffect, useMemo } from "react";

import { Card, Col, Empty, Row, Space } from "antd";

import { titleStyleCss } from "@/theme/text_styles";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { FcStatistics } from "react-icons/fc";

import dayjs from "dayjs";
import "dayjs/locale/es";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomButton from "@/components/common/custom_button/CustomButton";

import { useGetAllSummaryReportsLastMonthsQuery } from "@/redux/apis/case_report_validate/caseReportValidateApi";
import CustomBarPlotBasic from "@/components/common/custom_bar_plot_basic/CustomBarPlotBasic";
import CustomPiePlotBasic from "@/components/common/custom_pie_plot_basic/CustomPiePlotBasic";
import { FaChartLine } from "react-icons/fa";

dayjs.locale("es");

const StatisticsContent: React.FC = () => {
  const sixMonthsAgo = 6;

  const {
    data: allSummaryReportsLastMonthsData,
    isFetching: allSummaryReportsLastMonthsFetching,
    isLoading: allSummaryReportsLastMonthsLoading,
    error: allSummaryReportsLastMonthsError,
    refetch: allSummaryReportsLastMonthsRefetch,
  } = useGetAllSummaryReportsLastMonthsQuery(sixMonthsAgo);

  const barChartData: DataCustomPlotBasic[] = useMemo(() => {
    if (!allSummaryReportsLastMonthsData) return [];

    const groupedBarData: Record<string, number> = {};

    allSummaryReportsLastMonthsData.forEach((report: CaseReportValidate) => {
      const creationDate = dayjs(report.val_cr_creationdate);
      const monthLabel = creationDate.format("MMMM YYYY");
      groupedBarData[monthLabel] = (groupedBarData[monthLabel] || 0) + 1;
    });

    return Object.entries(groupedBarData).map(([month, count]) => ({
      type: month.charAt(0).toUpperCase() + month.slice(1),
      value: count,
    }));
  }, [allSummaryReportsLastMonthsData]);

  const pieChartData: DataCustomPlotBasic[] = useMemo(() => {
    if (!allSummaryReportsLastMonthsData) return [];

    const groupedPieData: Record<string, number> = {};

    allSummaryReportsLastMonthsData.forEach((report: CaseReportValidate) => {
      const caseTypeName = report.caseType?.cas_t_name || "N/A";
      groupedPieData[caseTypeName] = (groupedPieData[caseTypeName] || 0) + 1;
    });

    return Object.entries(groupedPieData).map(([type, count]) => ({
      type,
      value: count,
    }));
  }, [allSummaryReportsLastMonthsData]);

  return (
    <Card style={{ width: "100%" }}>
      {allSummaryReportsLastMonthsLoading ||
      allSummaryReportsLastMonthsFetching ? (
        <CustomSpin />
      ) : (
        <>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3
                style={{
                  ...titleStyleCss,
                  fontSize: "16px",
                }}
              >
                Recepción de los casos según los últimos 6 meses
              </h3>
              <Space>
                <CustomButton
                  classNameCustomButton="recharge-button"
                  idCustomButton="recharge-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="button"
                  iconCustomButton={
                    !allSummaryReportsLastMonthsFetching ? (
                      <ReloadOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  onClickCustomButton={allSummaryReportsLastMonthsRefetch}
                  styleCustomButton={{
                    background: "#002140",
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                  iconPositionCustomButton="end"
                  sizeCustomButton="small"
                  disabledCustomButton={
                    allSummaryReportsLastMonthsLoading ||
                    allSummaryReportsLastMonthsFetching
                  }
                />
                <CustomButton
                  classNameCustomButton="see-more-statistic-button"
                  idCustomButton="see-more-statistic-button"
                  titleCustomButton="Ver más estadísticas"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="button"
                  iconCustomButton={<FaChartLine />}
                  onClickCustomButton={() => ({})}
                  styleCustomButton={{
                    background: "#002140",
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                  iconPositionCustomButton="end"
                  sizeCustomButton="small"
                />
              </Space>
            </div>

            <Row
              gutter={24}
              justify={"center"}
              align={"middle"}
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              {Array.isArray(allSummaryReportsLastMonthsData) &&
              allSummaryReportsLastMonthsData.length === 0 ? (
                <Empty
                  description="No hay datos para mostrar"
                  style={{ marginTop: "10px" }}
                />
              ) : (
                <>
                  <Col
                    span={12}
                    style={{ display: "flex", width: "100%", height: "222px" }}
                  >
                    <CustomBarPlotBasic
                      dataCustomBarPlotBasic={barChartData}
                      dataCustomTitleY="Casos Reportados"
                    />
                  </Col>

                  <Col
                    span={12}
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "222px",
                    }}
                  >
                    <CustomPiePlotBasic groupedData={pieChartData || []} />
                  </Col>
                </>
              )}
            </Row>
          </Space>
        </>
      )}
    </Card>
  );
};

export default StatisticsContent;
