export const filterCasesByCurrentQuarter = (cases: CaseReportValidate[]) => {
  const currentQuarter = getCurrentQuarter(new Date());
  return cases.filter((caseItem) => {
    const caseDate = new Date(caseItem.val_cr_dateofcase);
    const caseQuarter = getCurrentQuarter(caseDate);
    return caseQuarter === currentQuarter;
  });
};

export const getCurrentQuarter = (date: Date) => {
  const month = date.getMonth() + 1;
  return Math.ceil(month / 3);
};

export const filterMaterializedCasesByQuarterAndYear = (
  item: ControlEvaluation
) => {
  return [
    ...(item.event?.materializedAdverseEvent?.caseReportValidate || []),
    ...(item.event?.materializedIncident?.caseReportValidate || []),
  ].filter((caseItem) => {
    const caseDate = new Date(caseItem.val_cr_dateofcase);
    const caseYear = caseDate.getFullYear();
    const caseQuarter = Math.floor(caseDate.getMonth() / 3) + 1;

    return (
      caseYear === item.con_e_year &&
      caseQuarter === item.quarterYear?.qua_number
    );
  });
};
