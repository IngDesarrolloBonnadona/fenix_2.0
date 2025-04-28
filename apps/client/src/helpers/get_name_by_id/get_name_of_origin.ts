export type MappableItem<T> = Origin;

export function getNameOfOriginMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.orig_name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}
