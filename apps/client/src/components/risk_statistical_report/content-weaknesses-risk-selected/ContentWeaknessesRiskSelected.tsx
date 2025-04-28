"use client";

import React from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";

const ContentWeaknessesRiskSelected: React.FC<{
  riskTitleData: string | undefined;
}> = ({ riskTitleData }) => {
  return (
    <div>
      <Card
        style={{
          width: "100%",
          border: "1px solid #477bb6",
          background: "#D5E5FF",
          borderRadius: "12px",
          padding: "0px 7px",
          marginBottom: "10px",
        }}
        size="small"
      >
        <Row
          gutter={[16, 8]}
          justify="center"
          align="middle"
          style={{ marginTop: "8px" }}
        >
          <Col span={10} style={{ textAlign: "center" }}>
            <Typography.Text
              style={{
                ...subtitleStyleCss,
              }}
            >
              {riskTitleData || "-"}
            </Typography.Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ContentWeaknessesRiskSelected;
