"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  getItem,
  getItemSpin,
} from "@/helpers/get_item_menu_dashboard_layout/get_item_menu_dashboard_layout";
import {
  AlertOutlined,
  AuditOutlined,
  BookOutlined,
  DesktopOutlined,
  FolderViewOutlined,
  IssuesCloseOutlined,
  MonitorOutlined,
  PieChartOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { LuShieldAlert } from "react-icons/lu";
import { FaChartColumn } from "react-icons/fa6";
import { RiTeamLine } from "react-icons/ri";

import {
  ItemKeys,
  ItemNames,
} from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ApplicationsEnum } from "@/utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "@/utils/enums/permissions/application_modules/application_modules.enum";
import { usePermissionsAppAndModuleValidationInPage } from "@/utils/hooks/use_permissions_app_and_module_validation_in_page";
import { setIdNumberUserSession } from "@/redux/features/user_session/userSessionSlice";
import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";

export const useMenuItems = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const [isLoadingLocalState, setIsLoadingLocalState] = useState(true);

  const idNumberUserSession = session?.user?.id_number;

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  useEffect(() => {
    if (!idNumberUserSessionState) {
      dispatch(setIdNumberUserSession(idNumberUserSession));
    }
  }, [idNumberUserSessionState, idNumberUserSession]);

  const dashboardModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    shouldRedirectOnError: false,
  });

  const createReportModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    shouldRedirectOnError: false,
  });

  const notificationsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_NOTIFICATIONS],
    shouldRedirectOnError: false,
  });

  const summaryModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SUMMARY],
    shouldRedirectOnError: false,
  });

  const synergyModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SYNERGY],
    shouldRedirectOnError: false,
  });

  const validateCasesModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_VALIDATE_CASES],
    shouldRedirectOnError: false,
  });

  const otherCasesModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_ANALYSIS_OTHER_CASES],
    shouldRedirectOnError: false,
  });

  const caseAssignmentModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_ANALYSIS_CASE_ASSIGNMENT],
    shouldRedirectOnError: false,
  });

  const myCasesModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    shouldRedirectOnError: false,
  });

  const informationsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_ANALYSIS_INFORMATION],
    shouldRedirectOnError: false,
  });

  const followUpModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_FOLLOWUPS],
    shouldRedirectOnError: false,
  });

  const createdPlansModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_CREATED_PLANS],
    shouldRedirectOnError: false,
  });

  const monitoringModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_MONITORING],
    shouldRedirectOnError: false,
  });

  const riskAnalysisModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_ANALYSIS],
    shouldRedirectOnError: false,
  });

  const riskSummaryModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_SUMMARY],
    shouldRedirectOnError: false,
  });

  const riskInformationModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_INFORMATION],
    shouldRedirectOnError: false,
  });

  const patientSecurityStrategiesModule =
    usePermissionsAppAndModuleValidationInPage({
      allowedApplications: [ApplicationsEnum.FÉNIX],
      allowedModules: [
        ApplicationModulesEnum.FENIX_PATIENT_SECURITY_STRATEGIES,
      ],
      shouldRedirectOnError: false,
    });

  const patientSecurityinformationModule =
    usePermissionsAppAndModuleValidationInPage({
      allowedApplications: [ApplicationsEnum.FÉNIX],
      allowedModules: [
        ApplicationModulesEnum.FENIX_PATIENT_SECURITY_INFORMATON,
      ],
      shouldRedirectOnError: false,
    });

  const sanctionFrameworkModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SANCTION_FRAMEWORK],
    shouldRedirectOnError: false,
  });

  const cycleClosureModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_CYCLE_CLOSURE],
    shouldRedirectOnError: false,
  });

  const indicatorsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_INDICATORS],
    shouldRedirectOnError: false,
  });

  const eventTypesModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_EVENT_TYPES],
    shouldRedirectOnError: false,
  });

  const eventsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_EVENTS],
    shouldRedirectOnError: false,
  });

  const caseTypesModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_CASE_TYPES],
    shouldRedirectOnError: false,
  });

  const riskTypesModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_TYPES],
    shouldRedirectOnError: false,
  });

  const severityClasificationsModule =
    usePermissionsAppAndModuleValidationInPage({
      allowedApplications: [ApplicationsEnum.FÉNIX],
      allowedModules: [ApplicationModulesEnum.FENIX_SEVERITY_CLASSIFICATIONS],
      shouldRedirectOnError: false,
    });

  const prioritiesModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_PRIORITIES],
    shouldRedirectOnError: false,
  });

  const unitsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_UNITS],
    shouldRedirectOnError: false,
  });

  const servicesModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SERVICES],
    shouldRedirectOnError: false,
  });

  const originsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_ORIGINS],
    shouldRedirectOnError: false,
  });

  const subOriginsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SUB_ORIGINS],
    shouldRedirectOnError: false,
  });

  const riskLevelsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_LEVELS],
    shouldRedirectOnError: false,
  });

  const caseCharacterizationModule = usePermissionsAppAndModuleValidationInPage(
    {
      allowedApplications: [ApplicationsEnum.FÉNIX],
      allowedModules: [ApplicationModulesEnum.FENIX_CASE_CHARACTERIZATION],
      shouldRedirectOnError: false,
    }
  );

  const rolesModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_ROLES],
    shouldRedirectOnError: false,
  });

  const researchInstrumentsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RESEARCH_INSTRUMENTS],
    shouldRedirectOnError: false,
  });

  // const deviceTypesModule = usePermissionsAppAndModuleValidationInPage({
  //   allowedApplications: [ApplicationsEnum.FÉNIX],
  //   allowedModules: [ApplicationModulesEnum.FENIX_DEVICE_TYPES],
  //   shouldRedirectOnError: false,
  // });

  // const damageTypesModule = usePermissionsAppAndModuleValidationInPage({
  //   allowedApplications: [ApplicationsEnum.FÉNIX],
  //   allowedModules: [ApplicationModulesEnum.FENIX_DAMAGE_TYPES],
  //   shouldRedirectOnError: false,
  // });

  // const fluidTypesModule = usePermissionsAppAndModuleValidationInPage({
  //   allowedApplications: [ApplicationsEnum.FÉNIX],
  //   allowedModules: [ApplicationModulesEnum.FENIX_FLUID_TYPES],
  //   shouldRedirectOnError: false,
  // });

  // const influenceFactorsModule = usePermissionsAppAndModuleValidationInPage({
  //   allowedApplications: [ApplicationsEnum.FÉNIX],
  //   allowedModules: [ApplicationModulesEnum.FENIX_INFLUENCE_FACTORS],
  //   shouldRedirectOnError: false,
  // });

  // const failedMeasuresModule = usePermissionsAppAndModuleValidationInPage({
  //   allowedApplications: [ApplicationsEnum.FÉNIX],
  //   allowedModules: [ApplicationModulesEnum.FENIX_FAILED_MEASURES],
  //   shouldRedirectOnError: false,
  // });

  // const riskFactorsModule = usePermissionsAppAndModuleValidationInPage({
  //   allowedApplications: [ApplicationsEnum.FÉNIX],
  //   allowedModules: [ApplicationModulesEnum.FENIX_RISK_FACTORS],
  //   shouldRedirectOnError: false,
  // });

  // const safetyBarriersModule = usePermissionsAppAndModuleValidationInPage({
  //   allowedApplications: [ApplicationsEnum.FÉNIX],
  //   allowedModules: [ApplicationModulesEnum.FENIX_SAFETY_BARRIERS],
  //   shouldRedirectOnError: false,
  // });

  const protocolsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_PROTOCOLS],
    shouldRedirectOnError: false,
  });

  const unsafeActionsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_UNSAFE_ACTIONS],
    shouldRedirectOnError: false,
  });

  const returnReasonModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RETURN_REASONS],
    shouldRedirectOnError: false,
  });

  const cancellationReasonModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_CANCELLATION_REASONS],
    shouldRedirectOnError: false,
  });

  const movementsModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_MOVEMENTS],
    shouldRedirectOnError: false,
  });

  const treatmentCategoryModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_TREATMENT_CATEGORY],
    shouldRedirectOnError: false,
  });

  const probabilityOcurrenceModule = usePermissionsAppAndModuleValidationInPage(
    {
      allowedApplications: [ApplicationsEnum.FÉNIX],
      allowedModules: [ApplicationModulesEnum.FENIX_PROBABILITIES_OCURRENCE],
      shouldRedirectOnError: false,
    }
  );

  const impactModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_IMPACTS],
    shouldRedirectOnError: false,
  });

  const scoreComplianceModule = usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SCORES_COMPLIANCE_CONTROL],
    shouldRedirectOnError: false,
  });

  const isLoadingPermission =
    dashboardModule === null ||
    createReportModule === null ||
    notificationsModule === null ||
    summaryModule === null ||
    synergyModule === null ||
    validateCasesModule === null ||
    otherCasesModule === null ||
    caseAssignmentModule === null ||
    myCasesModule === null ||
    informationsModule === null ||
    followUpModule === null ||
    createdPlansModule === null ||
    monitoringModule === null ||
    riskAnalysisModule === null ||
    riskSummaryModule === null ||
    riskInformationModule === null ||
    patientSecurityStrategiesModule === null ||
    patientSecurityinformationModule === null ||
    sanctionFrameworkModule === null ||
    cycleClosureModule === null ||
    indicatorsModule === null ||
    eventTypesModule === null ||
    eventsModule === null ||
    caseTypesModule === null ||
    riskTypesModule === null ||
    severityClasificationsModule === null ||
    prioritiesModule === null ||
    unitsModule === null ||
    servicesModule === null ||
    originsModule === null ||
    subOriginsModule === null ||
    riskLevelsModule === null ||
    caseCharacterizationModule === null ||
    rolesModule === null ||
    researchInstrumentsModule === null ||
    // deviceTypesModule === null ||
    // damageTypesModule === null ||
    // fluidTypesModule === null ||
    // influenceFactorsModule === null ||
    // failedMeasuresModule === null ||
    // riskFactorsModule === null ||
    // safetyBarriersModule === null ||
    protocolsModule === null ||
    unsafeActionsModule === null ||
    returnReasonModule === null ||
    cancellationReasonModule === null ||
    movementsModule === null ||
    treatmentCategoryModule === null ||
    probabilityOcurrenceModule === null ||
    impactModule === null ||
    scoreComplianceModule === null;

  useEffect(() => {
    setIsLoadingLocalState(isLoadingPermission);
  }, [
    dashboardModule,
    notificationsModule,
    summaryModule,
    synergyModule,
    validateCasesModule,
    otherCasesModule,
    caseAssignmentModule,
    myCasesModule,
    informationsModule,
    followUpModule,
    createdPlansModule,
    monitoringModule,
    riskAnalysisModule,
    riskSummaryModule,
    riskInformationModule,
    patientSecurityStrategiesModule,
    patientSecurityinformationModule,
    sanctionFrameworkModule,
    cycleClosureModule,
    indicatorsModule,
    eventTypesModule,
    eventsModule,
    caseTypesModule,
    riskTypesModule,
    severityClasificationsModule,
    prioritiesModule,
    unitsModule,
    servicesModule,
    originsModule,
    subOriginsModule,
    riskLevelsModule,
    caseCharacterizationModule,
    rolesModule,
    researchInstrumentsModule,
    // deviceTypesModule,
    // damageTypesModule,
    // fluidTypesModule,
    // influenceFactorsModule,
    // failedMeasuresModule,
    // riskFactorsModule,
    // safetyBarriersModule,
    protocolsModule,
    unsafeActionsModule,
    returnReasonModule,
    cancellationReasonModule,
    movementsModule,
    treatmentCategoryModule,
    probabilityOcurrenceModule,
    impactModule,
    scoreComplianceModule,
  ]);

  const menuItems = useMemo(() => {
    if (isLoadingLocalState) {
      return [getItemSpin("spinner")];
    }

    return [
      dashboardModule
        ? getItem(
            ItemNames.ITEM_DASHBOARD,
            `${ItemKeys.ITEM_DASHBOARD_KEY}`,
            <PieChartOutlined />
          )
        : null,

      notificationsModule
        ? getItem(
            ItemNames.ITEM_NOTIFICATIONS,
            `${ItemKeys.ITEM_NOTIFICATIONS_KEY}`,
            <AlertOutlined />
          )
        : null,

      createReportModule
        ? getItem(
            ItemNames.ITEM_CREATE_REPORT,
            `${ItemKeys.ITEM_CREATE_REPORT_KEY}`,
            <SolutionOutlined />
          )
        : null,

      summaryModule
        ? getItem(
            ItemNames.ITEM_SUMMARY,
            `${ItemKeys.ITEM_SUMMARY_KEY}`,
            <DesktopOutlined />
          )
        : null,

      validateCasesModule || otherCasesModule
        ? getItem(
            ItemNames.ITEM_VALIDATION,
            ItemKeys.ITEM_VALIDATION_KEY,
            <SecurityScanOutlined />,
            [
              validateCasesModule
                ? getItem(
                    ItemNames.SUB_VALIDATE_CASES,
                    ItemKeys.SUB_VALIDATE_CASES_KEY
                  )
                : null,
              otherCasesModule
                ? getItem(
                    ItemNames.SUB_OTHER_CASES,
                    ItemKeys.SUB_OTHER_CASES_KEY
                  )
                : null,
            ].filter(Boolean)
          )
        : null,

      synergyModule
        ? getItem(
            ItemNames.ITEM_SYNERGY,
            `${ItemKeys.ITEM_SYNERGY_KEY}`,
            <RiTeamLine />
          )
        : null,

      caseAssignmentModule || myCasesModule || informationsModule
        ? getItem(
            ItemNames.ITEM_ANALYSIS,
            ItemKeys.ITEM_ANALYSIS_KEY,
            <MonitorOutlined />,
            [
              caseAssignmentModule
                ? getItem(
                    ItemNames.SUB_ANALYSIS_CASE_ASSIGNMENT,
                    ItemKeys.SUB_ANALYSIS_CASE_ASSIGNMENT_KEY
                  )
                : null,

              myCasesModule
                ? getItem(
                    ItemNames.SUB_ANALYSIS_MY_CASES,
                    ItemKeys.SUB_ANALYSIS_MY_CASE_KEY
                  )
                : null,

              informationsModule
                ? getItem(
                    ItemNames.SUB_ANALYSIS_INFORMATION,
                    ItemKeys.SUB_ANALYSIS_CASE_INFORMATION_KEY
                  )
                : null,
            ].filter(Boolean)
          )
        : null,

      followUpModule
        ? getItem(
            ItemNames.ITEM_FOLLOW_UPS,
            ItemKeys.ITEM_FOLLOW_UPS_KEY,
            <FolderViewOutlined />
          )
        : null,

      createdPlansModule || monitoringModule
        ? getItem(
            ItemNames.ITEM_ACTION_PLANS,
            ItemKeys.ITEM_ACTION_PLANS_KEY,
            <BookOutlined />,
            [
              createdPlansModule
                ? getItem(
                    ItemNames.SUB_CREATED_PLANS,
                    ItemKeys.SUB_PLANS_CREATED_KEY
                  )
                : null,
              monitoringModule
                ? getItem(ItemNames.SUB_MONITORING, ItemKeys.SUB_MONITORING_KEY)
                : null,
            ].filter(Boolean)
          )
        : null,

      riskAnalysisModule || riskSummaryModule || riskInformationModule
        ? getItem(
            ItemNames.ITEM_RISK,
            ItemKeys.ITEM_RISK_KEY,
            <LuShieldAlert />,
            [
              riskAnalysisModule
                ? getItem(
                    ItemNames.SUB_RISK_ANALYSIS,
                    ItemKeys.SUB_RISK_ANALYSIS_KEY
                  )
                : null,
              riskSummaryModule
                ? getItem(
                    ItemNames.SUB_RISK_SUMMARY,
                    ItemKeys.SUB_RISK_SUMMARY_KEY
                  )
                : null,
              riskInformationModule
                ? getItem(
                    ItemNames.SUB_RISK_INFORMATION,
                    ItemKeys.SUB_RISK_INFORMATION_KEY
                  )
                : null,
            ].filter(Boolean)
          )
        : null,

      patientSecurityStrategiesModule ||
      patientSecurityinformationModule ||
      sanctionFrameworkModule
        ? getItem(
            ItemNames.ITEM_SP_PROGRAM,
            ItemKeys.ITEM_SP_PROGRAM_KEY,
            <AuditOutlined />,
            [
              patientSecurityStrategiesModule
                ? getItem(
                    ItemNames.SUB_PATIENT_SECURITY_STRATEGIES,
                    ItemKeys.SUB_STRATEGIES_KEY
                  )
                : null,
              patientSecurityinformationModule
                ? getItem(
                    ItemNames.SUB_PATIENT_SECURITY_INFORMATION,
                    ItemKeys.SUB_SP_INFORMATION_KEY
                  )
                : null,
              sanctionFrameworkModule
                ? getItem(
                    ItemNames.SUB_SANCTIONS_FRAMEWORK,
                    ItemKeys.SUB_SANCTIONS_FRAMEWORK_KEY
                  )
                : null,
            ].filter(Boolean)
          )
        : null,

      cycleClosureModule
        ? getItem(
            ItemNames.ITEM_CYCLE_CLOSURE,
            ItemKeys.ITEM_CLOSING_CYCLE_KEY,
            <IssuesCloseOutlined />
          )
        : null,

      indicatorsModule
        ? getItem(
            ItemNames.ITEM_INDICATORS,
            ItemKeys.ITEM_INDICATORS_KEY,
            <FaChartColumn />
          )
        : null,

      eventTypesModule ||
      eventsModule ||
      caseTypesModule ||
      riskTypesModule ||
      severityClasificationsModule ||
      prioritiesModule ||
      unitsModule ||
      servicesModule ||
      subOriginsModule ||
      originsModule ||
      riskLevelsModule ||
      caseCharacterizationModule ||
      rolesModule ||
      researchInstrumentsModule ||
      // deviceTypesModule ||
      // damageTypesModule ||
      // failedMeasuresModule ||
      // influenceFactorsModule ||
      // fluidTypesModule ||
      // riskFactorsModule ||
      // safetyBarriersModule ||
      protocolsModule ||
      unsafeActionsModule ||
      treatmentCategoryModule ||
      movementsModule ||
      returnReasonModule ||
      cancellationReasonModule
        ? getItem(
            ItemNames.ITEM_CONFIGURATION,
            ItemKeys.ITEM_CONFIGURATION_KEY,
            <SettingOutlined />,
            [
              eventTypesModule
                ? getItem(
                    ItemNames.SUB_EVENT_TYPES,
                    ItemKeys.SUB_EVENT_TYPE_KEY
                  )
                : null,
              eventsModule
                ? getItem(ItemNames.SUB_EVENTS, ItemKeys.SUB_EVENT_KEY)
                : null,
              caseTypesModule
                ? getItem(ItemNames.SUB_CASE_TYPES, ItemKeys.SUB_CASE_TYPES_KEY)
                : null,
              riskTypesModule
                ? getItem(ItemNames.SUB_RISK_TYPES, ItemKeys.SUB_RISK_TYPES_KEY)
                : null,
              severityClasificationsModule
                ? getItem(
                    ItemNames.SUB_SEVERITY_CLASIFICATIONS,
                    ItemKeys.SUB_SEVERITY_CLASIFICATIONS_KEY
                  )
                : null,
              prioritiesModule
                ? getItem(ItemNames.SUB_PRIORITIES, ItemKeys.SUB_PRIORITIES_KEY)
                : null,
              unitsModule
                ? getItem(ItemNames.SUB_UNITS, ItemKeys.SUB_UNITS_KEY)
                : null,
              servicesModule
                ? getItem(ItemNames.SUB_SERVICES, ItemKeys.SUB_SERVICES_KEY)
                : null,
              originsModule
                ? getItem(ItemNames.SUB_ORIGINS, ItemKeys.SUB_ORIGINS_KEY)
                : null,
              subOriginsModule
                ? getItem(
                    ItemNames.SUB_SUB_ORIGINS,
                    ItemKeys.SUB_SUB_ORIGINS_KEY
                  )
                : null,
              riskLevelsModule
                ? getItem(
                    ItemNames.SUB_RISK_LEVELS,
                    ItemKeys.SUB_RISK_LEVELS_KEY
                  )
                : null,
              caseCharacterizationModule
                ? getItem(
                    ItemNames.SUB_CASE_CHARACTERIZATION,
                    ItemKeys.SUB_CASE_CHARACTERIZATION_KEY
                  )
                : null,
              rolesModule
                ? getItem(ItemNames.SUB_ROLES, ItemKeys.SUB_ROLE_KEY)
                : null,
              researchInstrumentsModule
                ? getItem(
                    ItemNames.SUB_RESEARCH_INSTRUMENTS,
                    ItemKeys.SUB_RESEARCH_INSTRUMENTS_KEY
                  )
                : null,
              // deviceTypesModule
              //   ? getItem(
              //       ItemNames.SUB_DEVICE_TYPES,
              //       ItemKeys.SUB_DEVICE_TYPES_KEY
              //     )
              //   : null,
              // damageTypesModule
              //   ? getItem(
              //       ItemNames.SUB_DAMAGE_TYPES,
              //       ItemKeys.SUB_DAMAGE_TYPES_KEY
              //     )
              //   : null,
              // fluidTypesModule
              //   ? getItem(
              //       ItemNames.SUB_FLUID_TYPES,
              //       ItemKeys.SUB_FLUID_TYPES_KEY
              //     )
              //   : null,
              // influenceFactorsModule
              //   ? getItem(
              //       ItemNames.SUB_INFLUENCY_FACTORS,
              //       ItemKeys.SUB_INFLUENCY_FACTORS_KEY
              //     )
              //   : null,
              // failedMeasuresModule
              //   ? getItem(
              //       ItemNames.SUB_FAILED_MEASURES,
              //       ItemKeys.SUB_FAILED_MEASURES_KEY
              //     )
              //   : null,
              // riskFactorsModule
              //   ? getItem(
              //       ItemNames.SUB_RISK_FACTORS,
              //       ItemKeys.SUB_RISK_FACTORS_KEY
              //     )
              //   : null,
              // safetyBarriersModule
              //   ? getItem(
              //       ItemNames.SUB_SAFETY_BARRIERS,
              //       ItemKeys.SUB_SAFETY_BARRIERS_KEY
              //     )
              //   : null,
              protocolsModule
                ? getItem(ItemNames.SUB_PROTOCOLS, ItemKeys.SUB_PROTOCOLS_KEY)
                : null,
              unsafeActionsModule
                ? getItem(
                    ItemNames.SUB_UNSAFE_ACTIONS,
                    ItemKeys.SUB_UNSAFE_ACTIONS_KEY
                  )
                : null,
              returnReasonModule
                ? getItem(
                    ItemNames.SUB_RETURN_REASONS_CASE,
                    ItemKeys.SUB_RETURN_REASONS_CASE_KEY
                  )
                : null,
              cancellationReasonModule
                ? getItem(
                    ItemNames.SUB_CANCELLATION_REASONS_CASE,
                    ItemKeys.SUB_CANCELLATION_REASONS_CASE_KEY
                  )
                : null,
              movementsModule
                ? getItem(ItemNames.SUB_MOVEMENTS, ItemKeys.SUB_MOVEMENTS_KEY)
                : null,
              treatmentCategoryModule
                ? getItem(
                    ItemNames.SUB_TREATMENT_CATEGORY,
                    ItemKeys.SUB_TREATMENT_CATEGORY_KEY
                  )
                : null,
              probabilityOcurrenceModule
                ? getItem(
                    ItemNames.SUB_PROBABILITY_OCURRENCE,
                    ItemKeys.SUB_PROBABILITY_OCURRENCE_KEY
                  )
                : null,
              impactModule
                ? getItem(ItemNames.SUB_IMPACT, ItemKeys.SUB_IMPACT_KEY)
                : null,
              scoreComplianceModule
                ? getItem(
                    ItemNames.SUB_SCORE_COMPLIANCE_CONTROL,
                    ItemKeys.SUB_SCORE_COMPLIANCE_CONTROL_KEY
                  )
                : null,
            ].filter(Boolean)
          )
        : null,
    ].filter(Boolean);
  }, [
    dashboardModule,
    createReportModule,
    notificationsModule,
    summaryModule,
    synergyModule,
    validateCasesModule,
    otherCasesModule,
    caseAssignmentModule,
    myCasesModule,
    informationsModule,
    followUpModule,
    createdPlansModule,
    monitoringModule,
    riskAnalysisModule,
    riskSummaryModule,
    riskInformationModule,
    patientSecurityStrategiesModule,
    patientSecurityinformationModule,
    sanctionFrameworkModule,
    cycleClosureModule,
    indicatorsModule,
    eventTypesModule,
    eventsModule,
    caseTypesModule,
    riskTypesModule,
    severityClasificationsModule,
    prioritiesModule,
    unitsModule,
    servicesModule,
    originsModule,
    subOriginsModule,
    riskLevelsModule,
    caseCharacterizationModule,
    rolesModule,
    researchInstrumentsModule,
    // deviceTypesModule,
    // damageTypesModule,
    // fluidTypesModule,
    // influenceFactorsModule,
    // failedMeasuresModule,
    // riskFactorsModule,
    // safetyBarriersModule,
    protocolsModule,
    unsafeActionsModule,
    returnReasonModule,
    cancellationReasonModule,
    movementsModule,
    treatmentCategoryModule,
    probabilityOcurrenceModule,
    impactModule,
    scoreComplianceModule,
  ]);

  return menuItems;
};
