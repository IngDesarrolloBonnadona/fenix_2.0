"use client";

import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import AdminHeaderLayout from "@/components/header_layout_dashboard/AdminHeaderLayout";
import { Button, Col, Layout, Menu, Row, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ItemKeys } from "./enums/item_names_and_keys.enums";
import { useMenuItems } from "@/components/items_menu_dashboard_admin/items_menu_dashboard_admin";
import {
  setSelectedKey,
  setSelectedOpenKeys,
  setShowMenu,
} from "@/redux/features/common/modal/modalSlice";

const { Header, Content, Footer, Sider } = Layout;

const CustomDashboardLayout: React.FC<{
  customLayoutHeader?: ReactNode;
  customLayoutContent: ReactNode;
  customLayoutFooter?: any;
}> = ({ customLayoutHeader, customLayoutContent, customLayoutFooter }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useMenuItems();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedKeyState = useAppSelector((state) => state.modal.selectedKey);
  const selectedOpenKeysState = useAppSelector(
    (state) => state.modal.selectedOpenKeys
  );
  const collapsedState = useAppSelector((state) => state.modal.collapseIsOpen);

  // const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (key: string) => {
    dispatch(setSelectedKey(key));

    router.push(`/${key}`);
  };

  const handleOpenChange: any = (keys: string[]) => {
    dispatch(setSelectedOpenKeys(keys));
  };

  return (
    <Layout
      className="custom-dashboard-layout-sider"
      style={{
        display: "flex",
        minWidth: "888px",
        minHeight: "100vh",
        backgroundColor: "#FF7700",
        margin: "0px",
        padding: "0px",
        overflow: "auto",
      }}
    >
      <Sider
        className="custom--dashboard-layout-sider"
        breakpoint="md"
        collapsedWidth={62}
        width={213}
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
        collapsed={collapsedState}
        collapsible
        trigger={null}
        style={{
          backgroundColor: "#FF7700",
          margin: "0px",
          padding: "0px",
          overflow: "auto",
        }}
      >
        <a
          className="custom--dashboard-layout-logo"
          style={{
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "#f1f1f1",
            paddingBlock: "2px",
            paddingInline: "7px",
            overflow: "hidden",
          }}
          onClick={() => {
            router.replace("/dashboard", { scroll: true });
          }}
        >
          <img
            src={
              collapsedState
                ? "/logos/mockup/icon.png"
                : "/logos/mockup/logo.png"
            }
            alt="Logo de Fénix"
            style={{
              maxWidth: collapsedState ? "125%" : "60%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </a>

        <Menu
          className="custom--dashboard-layout-menu"
          mode="inline"
          items={items}
          selectedKeys={[selectedKeyState]}
          defaultSelectedKeys={[ItemKeys.ITEM_DASHBOARD_KEY]}
          openKeys={selectedOpenKeysState}
          onOpenChange={handleOpenChange}
          onClick={({ key }) => handleMenuClick(key)}
          style={{
            height: "100vh",
            margin: "0px",
            padding: "0px",
          }}
        />
      </Sider>
      <Layout
        className="custom-dashboard-layout-components"
        style={{
          display: "flex",
          flexFlow: "column wrap",
          backgroundColor: "#DFEBF2",
          margin: "0px",
          padding: "0px",
        }}
      >
        <Header
          className="custom--dashboard-layout-header"
          style={{
            display: "flex",
            flexFlow: "row wrap",
            background: "#f1f1f1",
            alignItems: "center",
            padding: "0px",
            margin: "0px",
          }}
        >
          <Row
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Col
              xs={12}
              sm={6}
              md={6}
              lg={6}
              style={{
                display: "flex",
                flexFlow: "row wrap",
                alignContent: "center",
                justifyContent: "flex-start",
                paddingLeft: "17px",
              }}
            >
              <Button
                type="text"
                icon={
                  collapsedState ? (
                    <MenuUnfoldOutlined style={{ color: "#F7F7F7" }} />
                  ) : (
                    <MenuFoldOutlined style={{ color: "#F7F7F7" }} />
                  )
                }
                onClick={() => dispatch(setShowMenu(!collapsedState))}
                style={{
                  width: "37px",
                  height: "37px",
                  backgroundColor: "#015E90",
                }}
              />
            </Col>

            <Col
              xs={12}
              sm={18}
              md={18}
              lg={18}
              style={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "flex-end",
                alignContent: "center",
                paddingRight: "17px",
              }}
            >
              {customLayoutHeader || <AdminHeaderLayout />}
            </Col>
          </Row>
        </Header>
        <Content
          className="custom--dashboard-layout-content"
          style={{ margin: "13px" }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              padding: "13px",
            }}
          >
            {customLayoutContent}
          </div>
        </Content>
        <Footer
          className="custom--dashboard-layout-footer"
          style={{
            height: "13px",
            display: "flex",
            flexFlow: "column wrap",
            textAlign: "center",
            backgroundColor: colorBgContainer,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {customLayoutFooter ||
            `Clínica Bonnadona © ${new Date().getFullYear()} 💙`}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CustomDashboardLayout;
