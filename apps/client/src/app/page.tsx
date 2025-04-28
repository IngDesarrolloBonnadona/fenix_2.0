"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Col, Divider, Space } from "antd";

import CustomButton from "@/components/common/custom_button/CustomButton";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";

const HomePage = () => {
  const router = useRouter();

  return (
    <div
      className="homepage"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F7F7",
      }}
    >
      <div
        className="content-homepage"
        style={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Col span={24}>
          <div
            className="logos-homepage"
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              paddingBlock: "13px",
            }}
          >
            <img
              src="/logos/bonnadona/logo_original.png"
              alt="Logo de Fenix"
              style={{ height: "88px", paddingInline: "31px" }}
            />

            <Divider
              orientation="center"
              type="vertical"
              style={{
                height: "54px",
                borderWidth: 2,
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            />

            <img
              src="/logos/mockup/logo.png"
              alt="Logo de Fenix"
              style={{ height: "88px", paddingInline: "31px" }}
            />
          </div>

          <div
            className="text-and-buttons"
            style={{
              textAlign: "center",
              paddingBlock: "13px",
            }}
          >
            <h1
              className="presentation-text-title"
              style={{
                ...titleStyleCss,
                color: "#FF7700",
              }}
            >
              Fénix
            </h1>

            <h3
              className="presentation-text-content"
              style={{
                ...subtitleStyleCss,
              }}
            >
              Plataforma para reportar casos de riesgos e incidentes clínicos.
            </h3>

            <div
              className="content"
              style={{
                textAlign: "center",
                paddingBlock: "31px",
              }}
            >
              <Space size={"large"}>
                <CustomButton
                  titleCustomButton="Reporte Externo"
                  typeCustomButton="primary"
                  sizeCustomButton="middle"
                  styleCustomButton={{
                    backgroundColor: "#015E90",
                    borderRadius: "16px",
                  }}
                  onClickCustomButton={() => {}}
                />

                <CustomButton
                  titleCustomButton="Reporte Interno"
                  typeCustomButton="primary"
                  sizeCustomButton="middle"
                  styleCustomButton={{
                    backgroundColor: "#FF7700",
                    borderRadius: "16px",
                  }}
                  onClickCustomButton={() => {
                    router.push("/dashboard", {
                      scroll: true,
                    });
                  }}
                />
              </Space>
            </div>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default HomePage;
