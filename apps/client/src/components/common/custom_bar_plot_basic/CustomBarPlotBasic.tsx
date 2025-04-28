"use client";

import React, { useEffect, useRef } from "react";
import { Column } from "@antv/g2plot";

const CustomBarPlotBasic: React.FC<{
  dataCustomBarPlotBasic: DataCustomPlotBasic[];
  dataCustomTitleY?: string;
}> = ({ dataCustomBarPlotBasic, dataCustomTitleY }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current && dataCustomBarPlotBasic.length > 0) {
      const columnPlot = new Column(chartContainerRef.current, {
        data: dataCustomBarPlotBasic,
        xField: "type",
        yField: "value",
        seriesField: "type",
        // label: {
        //   position: "middle",
        //   style: { fill: "#fff", fontSize: 12 },
        // },
        xAxis: {
          label: {
            autoRotate: true,
            style: { fontSize: 12, fontWeight: 500 },
          },
        },
        yAxis: {
          title: {
            text: dataCustomTitleY,
            style: { fontSize: 14 },
          },
        },
        tooltip: {
          showMarkers: false,
        },
        columnWidthRatio: 0.08,
        animation: {
          appear: {
            animation: "scale-in-y",
            duration: 1000,
          },
        },
        columnStyle: {
          radius: [10, 10, 0, 0],
        },
        color: ({ type }) => {
          const colors = [
            "#e74c3c", //Rojo
            "#9b59b6", //Morado
            "#e67e22", //Naranja
            "#fac800", //Amarillo
            "#0365a6", //Azul
            "#03a347", //Verde
          ];
          const monthIndex = dataCustomBarPlotBasic.findIndex(
            (data) => data.type === type
          );
          return colors[monthIndex % colors.length];
        },
      });

      columnPlot.render();

      return () => {
        columnPlot.destroy();
      };
    }
  }, [dataCustomBarPlotBasic, dataCustomTitleY]);

  return (
    <div
      ref={chartContainerRef}
      style={{ display: "flex", width: "100%", height: "100%" }}
    />
  );
};

export default React.memo(CustomBarPlotBasic);
