import { Button, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";

interface TableColumnProps {}

const TableColumnsCasesCharacterization = (): TableColumnProps => [
  {
    title: "Código",
    dataIndex: "val_cr_filingnumber",
    key: "val_cr_filingnumber",
    width: 100,
    searchable: true,
    // sorter: (a: ISummaryReportInterfaceItem, b: ISummaryReportInterfaceItem) =>
    //   a.val_cr_filingnumber.length - b.val_cr_filingnumber.length,
  },
  {
    title: "Tipo de caso",
    dataIndex: "caseType",
    key: "caseType",
    width: 200,
    // filters: Array.from(
    //   new Set(summaryReports.map((report) => report.caseType?.cas_t_name))
    // ).map((name) => ({
    //   text: name || "No disponible",
    //   value: name || "No disponible",
    // })),
    // onFilter: (value: any, record: any) =>
    //   record.caseType?.cas_t_name.includes(value as string),
    // sorter: (a: ISummaryReportInterfaceItem, b: ISummaryReportInterfaceItem) =>
    //   a.caseType.cas_t_name.length - b.caseType.cas_t_name.length,
    render: (type: string) => customTagCaseTypes(type),
  },
  {
    title: "Suceso",
    dataIndex: "event",
    key: "event",
    // filters: Array.from(
    //   new Set(summaryReports.map((report) => report.event?.eve_name))
    // ).map((name) => ({
    //   text: name || "No disponible",
    //   value: name || "No disponible",
    // })),
    // onFilter: (value: any, record: any) =>
    //   record.event?.eve_name.includes(value as string),
    // sorter: (a: ISummaryReportInterfaceItem, b: ISummaryReportInterfaceItem) =>
    //   a.event.eve_name.length - b.event.eve_name.length,
    render: (item: any) => <p>{item?.eve_name || "No disponible"}</p>,
  },
  {
    title: "Prioridad",
    dataIndex: "priority",
    key: "priority",
    width: 100,
    // filters: Array.from(
    //   new Set(summaryReports.map((report) => report.priority?.prior_name))
    // ).map((name) => ({
    //   text: name || "No disponible",
    //   value: name || "No disponible",
    // })),
    // onFilter: (value: any, record: any) =>
    //   record.priority?.prior_name.includes(value as string),
    // sorter: (a: ISummaryReportInterfaceItem, b: ISummaryReportInterfaceItem) =>
    //   a.priority.prior_name.length - b.priority.prior_name.length,
    render: (item: any) => <p>{item?.prior_name || "No disponible"}</p>,
  },
  {
    title: "Tiempo Analista",
    dataIndex: "reportAnalystAssignment",
    key: "reportAnalystAssignment",
    width: 100,
    render: (item: any) => <p>{item?.ana_days || "No asignado"}</p>,
  },
  {
    title: "Tiempo Investigador",
    dataIndex: "reportResearcherAssignment",
    key: "reportResearcherAssignment",
    width: 100,
    render: (item: any) => <p>{item?.res_days || "No asignado"}</p>,
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    width: 70,
    render: (_: any, record: any) => (
      <Space size="small">
        <Button
          size="small"
          type="primary"
          title="Detalles"
          shape="circle"
          icon={<EyeOutlined />}
          style={{ background: "#6F42C1", color: "#ffffff" }}
        />
      </Space>
    ),
  },
];

export default TableColumnsCasesCharacterization;
