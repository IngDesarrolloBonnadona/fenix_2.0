const probabilityOcurrenceLevelNameKey: keyof ProbabilityOcurrence =
  "prob_o_level";
const probabilityOcurrenceDescriptionKey: keyof ProbabilityOcurrence =
  "prob_o_description";

const TableColumnsProbabilityOcurrence = () => [
  {
    title: "Calificación",
    dataIndex: probabilityOcurrenceLevelNameKey,
    key: probabilityOcurrenceLevelNameKey,
    render: (level: number, item: any) => `(${level}) ${item.prob_o_name}`,
  },
  {
    title: "Criterio",
    dataIndex: probabilityOcurrenceDescriptionKey,
    key: probabilityOcurrenceDescriptionKey,
  },
];

export default TableColumnsProbabilityOcurrence;
