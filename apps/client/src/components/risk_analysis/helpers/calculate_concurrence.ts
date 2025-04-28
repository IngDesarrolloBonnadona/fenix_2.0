import { filterCasesByCurrentQuarter } from "./filter_cases_by_current_quarter";
import { filterCasesByUnit } from "./filter_cases_by_unit";

export const calculateConcurrence = (
  record: Events,
  serviceData: Service[] | undefined
): number => {
  const adverseEventCases = filterCasesByUnit(
    filterCasesByCurrentQuarter(
      record.materializedAdverseEvent?.caseReportValidate || []
    ),
    serviceData,
    record
  ).length;

  const incidentCases = filterCasesByUnit(
    filterCasesByCurrentQuarter(
      record.materializedIncident?.caseReportValidate || []
    ),
    serviceData,
    record
  ).length;

  return adverseEventCases + incidentCases;
};
