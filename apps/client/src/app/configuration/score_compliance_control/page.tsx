"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useSession } from "next-auth/react";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";

import useAuthValidation from "@/utils/hooks/use_auth_validation";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { usePermissionsAppAndModuleValidationInPage } from "@/utils/hooks/use_permissions_app_and_module_validation_in_page";
import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { ApplicationsEnum } from "@/utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "@/utils/enums/permissions/application_modules/application_modules.enum";

import {
  setIdNumberUserSession,
  setNameUserSession,
} from "@/redux/features/user_session/userSessionSlice";
import ScoreComplianceContent from "@/components/configuration/score_compliance/ScoreComplianceContent";

const ScoreCompliancePage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useAuthValidation();

  const allowedRoles = [RolesEnum.COLLABORATOR];
  useRoleValidation(allowedRoles);

  usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SCORES_COMPLIANCE_CONTROL],
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
    <div className="homepage-score-compliance">
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
              <ScoreComplianceContent />
            </div>
          }
        />
      )}
    </div>
  );
};

export default ScoreCompliancePage;
