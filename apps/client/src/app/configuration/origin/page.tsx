"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useSession } from "next-auth/react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import OriginContent from "@/components/configuration/origin/OriginContent";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import useAuthValidation from "@/utils/hooks/use_auth_validation";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";

import {
  setIdNumberUserSession,
  setNameUserSession,
} from "@/redux/features/user_session/userSessionSlice";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { usePermissionsAppAndModuleValidationInPage } from "@/utils/hooks/use_permissions_app_and_module_validation_in_page";
import { ApplicationsEnum } from "@/utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "@/utils/enums/permissions/application_modules/application_modules.enum";

const OriginParametrizationPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useAuthValidation();

  const allowedRoles = [RolesEnum.COLLABORATOR];
  useRoleValidation(allowedRoles);

  usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_ORIGINS],
  });

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

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
  }, [session, status, idNumberUserSessionState]);

  return (
    <div className="homepage-origin">
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
              <OriginContent />
            </div>
          }
        />
      )}
    </div>
  );
};

export default OriginParametrizationPage;
