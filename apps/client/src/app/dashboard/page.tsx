"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { Col, Row } from "antd";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import ReportSearchEngineComponent from "@/components/dashboard/report_search_engine/ReportSearchEngineContent";
import StatisticsContent from "@/components/dashboard/Statistics/StatisticsContent";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import useAuthValidation from "@/utils/hooks/use_auth_validation";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";

import {
  setIdNumberUserSession,
  setNameUserSession,
} from "@/redux/features/user_session/userSessionSlice";
import { setSelectedKey } from "@/redux/features/common/modal/modalSlice";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { ItemKeys } from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";

const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useAuthValidation();

  const allowedRoles = [RolesEnum.COLLABORATOR];
  useRoleValidation(allowedRoles);

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const selectedKeyState = useAppSelector((state) => state.modal.selectedKey);

  useEffect(() => {
    if (
      !idNumberUserSessionState &&
      status === "authenticated" &&
      session &&
      session.user.id_number
    ) {
      const userIdNumber = session.user.id_number;
      const userName = session.user.name;

      dispatch(setNameUserSession(userName));
      dispatch(setIdNumberUserSession(userIdNumber));
    }
    if (selectedKeyState !== ItemKeys.ITEM_DASHBOARD_KEY) {
      dispatch(setSelectedKey(ItemKeys.ITEM_DASHBOARD_KEY));
    }
  }, [session, status, idNumberUserSessionState]);

  return (
    <div className="homepage-dashboard">
      {!idNumberUserSessionState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <CustomDashboardLayout
          customLayoutContent={
            <div
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "column wrap",
              }}
            >
              <div style={{ padding: "16px" }}>
                <Row style={{ marginBottom: "32px" }}>
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <ReportSearchEngineComponent />
                  </Col>
                </Row>

                <Row>
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <StatisticsContent />
                  </Col>
                </Row>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};
export default DashboardPage;
