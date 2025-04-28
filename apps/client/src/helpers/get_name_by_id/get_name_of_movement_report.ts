export type MappableItem<T> = MovementReport;

export function getNameOfMovementReportMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.mov_r_name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}
