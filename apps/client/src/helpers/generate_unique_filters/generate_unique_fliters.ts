export const generateUniqueFilters = (
  data: any[] | undefined,
  key: string,
  label: string
) =>
  data
    ?.map((item) => ({
      value: item[key],
      text: item[label],
    }))
    .filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i) || [];
