import { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "@/redux/hook";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

import { useGetUserPermissionsQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";

import { ApplicationsEnum } from "@/utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "@/utils/enums/permissions/application_modules/application_modules.enum";

interface PermissionValidationParams {
  allowedApplications?: ApplicationsEnum[];
  allowedModules?: ApplicationModulesEnum[];
  shouldRedirectOnError?: boolean;
}

export const usePermissionsAppAndModuleValidationInPage = ({
  allowedApplications = [],
  allowedModules = [],
  shouldRedirectOnError = true,
}: PermissionValidationParams) => {
  const { data: session, status } = useSession();

  const idNumberUserState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const {
    data: userPermissionsData,
    isLoading: userPermissionsIsLoadingData,
    isFetching: userPermissionsIsFetchingData,
    isError: userPermissionsIsErrorData,
  } = useGetUserPermissionsQuery(idNumberUserState, {
    skip: !idNumberUserState,
  });

  const [hasPermission, setHasPermission] = useState(false);

  const permissionsValid = useMemo(() => {
    if (!userPermissionsData) return false;

    const hasApplicationPermission =
      allowedApplications.length > 0
        ? userPermissionsData.some((permission) =>
            permission.applications.some((app: IApplication) =>
              allowedApplications.includes(app.name as ApplicationsEnum)
            )
          )
        : true;

    const hasModulePermission =
      allowedModules.length > 0
        ? userPermissionsData.some((permission) =>
            permission.application_modules.some((module: IApplicationModule) =>
              allowedModules.includes(module.name as ApplicationModulesEnum)
            )
          )
        : true;

    return hasApplicationPermission && hasModulePermission;
  }, [userPermissionsData, allowedApplications, allowedModules]);

  useEffect(() => {
    if (
      status === "authenticated" &&
      userPermissionsData &&
      !userPermissionsIsLoadingData &&
      !userPermissionsIsFetchingData
    ) {
      setHasPermission(permissionsValid);

      if (shouldRedirectOnError && !permissionsValid) {
        notFound();
      }
    }
  }, [
    status,
    userPermissionsData,
    userPermissionsIsLoadingData,
    userPermissionsIsFetchingData,
    permissionsValid,
    shouldRedirectOnError,
  ]);

  return hasPermission;
};
