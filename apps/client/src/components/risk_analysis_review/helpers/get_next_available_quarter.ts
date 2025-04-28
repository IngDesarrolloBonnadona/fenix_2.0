export const getNextAvailableQuarter = (
  evaluations: ControlEvaluation[] | undefined,
  quarters: QuarterYear[] | undefined
) => {
  const evaluatedQuarter = (evaluations ?? [])
    .map((evaluation) => evaluation.quarterYear?.qua_number)
    .filter(Boolean);
  const nextQuarter = (quarters ?? []).find(
    (quarter) => !evaluatedQuarter.includes(quarter.qua_number)
  );
  return nextQuarter ? nextQuarter.id : null;
};
