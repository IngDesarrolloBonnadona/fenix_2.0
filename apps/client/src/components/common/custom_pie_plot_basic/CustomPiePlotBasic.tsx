"use client";

import React, { useEffect, useRef } from "react";
import { Pie } from "@antv/g2plot";

const CustomPiePlotBasic: React.FC<{
  groupedData: DataCustomPlotBasic[];
}> = ({ groupedData }) => {
  const containerRef = useRef(null);
  const pieRef = useRef<Pie | null>(null);

  const hasCustomColors = groupedData?.some((item) => item.color !== undefined);

  useEffect(() => {
    if (containerRef) {
      if (containerRef.current) {
        const config: any = {
          appendPadding: 10,
          data: groupedData || [],
          angleField: "value",
          colorField: "type",
          radius: 1,
          legend: {
            position: "right",
          },
          label: {
            type: "inner",
            offset: "-30%",
            content: ({ percent }: { percent: number }) =>
              `${(percent * 100).toFixed(0)}%`,
            style: {
              fontSize: 14,
              textAlign: "center",
              fontWeight: "bold",
            },
          },
          tooltip: {
            formatter: (datum: DataCustomPlotBasic) => {
              return { name: datum.type, value: datum.value };
            },
          },
          interactions: [
            { type: "element-active" },
            { type: "element-selected" },
          ],
        };

        if (hasCustomColors) {
          config.color = ({ type }: { type: string }) => {
            const item = groupedData.find((d) => d.type === type);
            return item?.color;
          };
        }

        pieRef.current = new Pie(containerRef.current, config);

        pieRef.current.render();

        return () => {
          if (pieRef.current) {
            pieRef.current.destroy();
          }
        };
      }
    }
  }, [groupedData, hasCustomColors]);

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", height: "100%", width: "100%" }}
    />
  );
};

export default React.memo(CustomPiePlotBasic);
