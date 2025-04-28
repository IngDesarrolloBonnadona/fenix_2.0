export type MappableItem<T> = CaseType;

export function getNameOfCaseTypeMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.cas_t_name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}
