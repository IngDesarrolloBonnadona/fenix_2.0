"use client";

import React from "react";

import { Card, Col, Form, Input, Row, Typography } from "antd";
import { MdOutlineWorkOutline } from "react-icons/md";
import { IdcardOutlined, UserOutlined } from "@ant-design/icons";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { titleStyleCss } from "@/theme/text_styles";

interface RerporterForm {
  identificationUserLocalState: string;
  setIdentificationUserLocalState: (value: string) => void;
  fullNameUserLocalState: string;
  setFullNameUserLocalState: (value: string) => void;
  chargeUserLocalState: string;
  setChargeUserLocalState: (value: string) => void;
  userVerifyLoading: boolean;
}

const ReporterForm: React.FC<RerporterForm> = ({
  identificationUserLocalState,
  setIdentificationUserLocalState,
  fullNameUserLocalState,
  setFullNameUserLocalState,
  chargeUserLocalState,
  setChargeUserLocalState,
  userVerifyLoading,
}) => {
  return (
    <div>
      <Card
        style={{
          width: "100%",
          height: "100%",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
        }}
        bordered={false}
        size="small"
      >
        <Typography.Title
          level={5}
          style={{
            ...titleStyleCss,
            color: "#f28322",
            // marginBottom: "10px",
            // marginTop: "10px",
          }}
        >
          Datos del reportante
        </Typography.Title>
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          {userVerifyLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <CustomSpin />
            </div>
          ) : (
            <>
              {/* Identificación reportante*/}
              <Col xs={24} sm={12} md={8} lg={4}>
                <Form.Item
                  label="Identificación"
                  id="identification-user"
                  className="identification-user"
                  name="identification-user"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) =>
                      setIdentificationUserLocalState(e.target.value)
                    }
                    value={identificationUserLocalState}
                    prefix={<IdcardOutlined />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              {/* Nombre completo reportante*/}
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item
                  label="Nombre Completo:"
                  id="full-name-user"
                  className="full-name-user"
                  name="full-name-user"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) => setFullNameUserLocalState(e.target.value)}
                    value={fullNameUserLocalState}
                    prefix={<UserOutlined />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              {/* Cargo*/}
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item
                  label="Cargo:"
                  id="position-user"
                  className="position-user"
                  name="position-user"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input
                    onChange={(e) => setChargeUserLocalState(e.target.value)}
                    value={chargeUserLocalState}
                    prefix={<MdOutlineWorkOutline />}
                    size="small"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default ReporterForm;
