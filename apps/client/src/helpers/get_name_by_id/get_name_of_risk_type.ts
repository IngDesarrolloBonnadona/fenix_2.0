export type MappableItem<T> = RiskType;

export function getNameOfRiskTypeMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce(
      (acc, item) => {
        acc[item.id] = item.ris_t_name;
        return acc;
      },
      {} as Record<number, string>
    ) || {}
  );
}
