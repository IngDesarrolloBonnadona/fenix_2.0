import { SeverityClasificationEnum } from "@/utils/enums/severity_clasif.enum";

export const getSeverityClasificationColor = (severity: string): string => {
  switch (severity) {
    case SeverityClasificationEnum.SERIOUS_SEVERITY:
      return "#8C1111";
    case SeverityClasificationEnum.MODERATE_SEVERITY:
      return "#FD7E14";
    case SeverityClasificationEnum.MILD_SEVERITY:
      return "#1D8348";
    default:
      return "#002140";
  }
};
