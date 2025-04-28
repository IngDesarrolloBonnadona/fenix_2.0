export type MappableItem<T> = Priority;

export function getNameOfPriorityMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.prior_name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}
