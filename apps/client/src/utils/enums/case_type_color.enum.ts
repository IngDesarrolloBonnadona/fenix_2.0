export enum CaseTypeReportEnum {
  RISK = "RIESGO",
  ADVERSE_EVENT = "EVENTO ADVERSO O COMPLICACION",
  INCIDENT = "INCIDENTE",
  INDICATING_UNSAFE_CARE = "INDICIO DE ATENCIÓN INSEGURA",
  COMPLICATIONS = "COMPLICACIONES",
}
export const getColorByCaseType = (type: string) => {
  switch (type) {
    case CaseTypeReportEnum.RISK.toUpperCase():
      return "geekblue";
    case CaseTypeReportEnum.ADVERSE_EVENT.toUpperCase():
      return "green";
    case CaseTypeReportEnum.INCIDENT.toUpperCase():
      return "yellow";
    case CaseTypeReportEnum.INDICATING_UNSAFE_CARE.toUpperCase():
      return "volcano";
    case CaseTypeReportEnum.COMPLICATIONS.toUpperCase():
      return "red";
    default:
      return "black";
  }
};
