export type MappableItem<T> = SeverityClasification;

export function getNameOfSeverityClasificationMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.sev_c_name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}
