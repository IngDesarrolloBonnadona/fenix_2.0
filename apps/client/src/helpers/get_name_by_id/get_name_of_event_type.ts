export type MappableItem<T> = EventType;

export function getNameOfEventTypeMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.eve_t_name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}