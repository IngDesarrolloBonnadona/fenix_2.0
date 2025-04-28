const impactLevelNameKey: keyof Impact = "imp_level";
const impactHealthKey: keyof Impact = "imp_health_impact";
const impactBusinessKey: keyof Impact = "imp_business_impact";

const TableColumnsImpact = () => [
  {
    title: "Calificación",
    dataIndex: impactLevelNameKey,
    key: impactLevelNameKey,
    render: (level: number, record: any) => `(${level}) ${record.imp_name}`,
  },
  {
    title: "En salud",
    dataIndex: impactHealthKey,
    key: impactHealthKey,
  },
  {
    title: "Financiero, Reputacional, Operacional, Legal, Servicio",
    dataIndex: impactBusinessKey,
    key: impactBusinessKey,
    render: (text: string) => (
      <div style={{ whiteSpace: "pre-line", fontSize: "12px" }}>
        {text.split(".\n").map((line, index) => (
          <p key={index} style={{ marginBottom: "5px" }}>
            - {line}.
          </p>
        ))}
      </div>
    ),
  },
];

export default TableColumnsImpact;
