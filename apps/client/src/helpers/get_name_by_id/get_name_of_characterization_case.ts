export type MappableItem<T> = CharacterizationCase;

export function getNameOfCharacterizationCaseMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.cha_c_name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}