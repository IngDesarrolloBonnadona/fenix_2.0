export type MappableItem<T> = OncologyCategory;

export function getNameOfOncologyCategoryMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.onc_c_name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}