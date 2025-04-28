export type MappableItem<T> = Events;

export function getNameOfEventMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.eve_name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}
