"use client";

import React from "react";

import { CaseTypeReportEnum } from "@/utils/enums/case_type_color.enum";
import CustomTags from "./CustomTags";

export const customTagCaseTypes = (statusName: string | undefined) => {
  switch (statusName) {
    case CaseTypeReportEnum.RISK:
      return (
        <CustomTags colorCustom="red" labelCustom={CaseTypeReportEnum.RISK} />
      );

    case CaseTypeReportEnum.ADVERSE_EVENT:
      return (
        <CustomTags
          colorCustom="cyan"
          labelCustom={CaseTypeReportEnum.ADVERSE_EVENT}
        />
      );

    case CaseTypeReportEnum.INCIDENT:
      return (
        <CustomTags
          colorCustom="orange"
          labelCustom={CaseTypeReportEnum.INCIDENT}
        />
      );

    case CaseTypeReportEnum.INDICATING_UNSAFE_CARE:
      return (
        <CustomTags
          colorCustom="lime"
          labelCustom={CaseTypeReportEnum.INDICATING_UNSAFE_CARE}
        />
      );

    case CaseTypeReportEnum.COMPLICATIONS:
      return (
        <CustomTags
          colorCustom="pink"
          labelCustom={CaseTypeReportEnum.COMPLICATIONS}
        />
      );

    default:
      return null;
  }
};
