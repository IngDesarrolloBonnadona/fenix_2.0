export type MappableItem<T> = Role;

export function getNameOfRoleMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.role_name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}
