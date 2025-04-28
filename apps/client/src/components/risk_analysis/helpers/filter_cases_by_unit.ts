export const filterCasesByUnit = (
  cases: CaseReportValidate[],
  services: Service[] | undefined,
  recordEvent: Events
) => {
  return cases.filter((item) => {
    const service = services?.find(
      (service) => service.id === item.val_cr_reportingservice_id_fk
    );
    return service?.serv_unit_id_fk === recordEvent.unit?.id;
  });
};
