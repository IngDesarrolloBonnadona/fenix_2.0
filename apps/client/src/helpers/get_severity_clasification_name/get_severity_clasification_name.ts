export const getSeverityClasificarionName = (
  id: number | null,
  severityClasificationData: SeverityClasification[] | undefined
) => {
  const severityClasification = severityClasificationData?.find(
    (item) => item.id === id
  );
  return severityClasification ? severityClasification.sev_c_name : null;
};
