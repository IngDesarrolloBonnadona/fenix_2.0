export type MappableItem<T> = Unit;

export function getNameOfUnitMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.unit_name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}