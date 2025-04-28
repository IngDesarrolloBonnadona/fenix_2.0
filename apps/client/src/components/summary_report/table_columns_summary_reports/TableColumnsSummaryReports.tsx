import { Button, Space } from "antd";

import { EyeOutlined } from "@ant-design/icons";

import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";
import { FaAngleDoubleUp } from "react-icons/fa";
import { MovementReportEnum } from "@/utils/enums/movement_report.enum";

const fillingNumberKey: keyof CaseReportValidate = "val_cr_filingnumber";
const dateOfCaseKey: keyof CaseReportValidate = "val_cr_dateofcase";
const ddocumentPatientKey: keyof CaseReportValidate = "val_cr_documentpatient";
const eventNameKey: keyof CaseReportValidate = "val_cr_event_id_fk";
const CaseTypeNameKey: keyof CaseReportValidate = "val_cr_casetype_id_fk";
const PriorityNameKey: keyof CaseReportValidate = "val_cr_priority_id_fk";
const MovementReportNameKey: keyof CaseReportValidate =
  "val_cr_statusmovement_id_fk";
const Synergy: keyof CaseReportValidate = "synergy";

interface TableColumnProps {
  caseTypeData: CaseType[] | undefined;
  eventData: Events[] | undefined;
  priorityData: Priority[] | undefined;
  movementReportData: MovementReport[] | undefined;
  handleToRedirectToReportSummary: any;
}

const TableColumnsSummaryReports = ({
  caseTypeData,
  eventData,
  priorityData,
  movementReportData,
  handleToRedirectToReportSummary,
}: TableColumnProps) => [
  {
    title: "Estado",
    dataIndex: MovementReportNameKey,
    key: MovementReportNameKey,
    width: 200,
    filters:
      movementReportData
        ?.filter((type) => type.mov_r_name !== MovementReportEnum.ANULATION)
        .map((type) => ({
          value: type.mov_r_name,
          text: type.mov_r_name,
        })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.val_cr_statusmovement_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Código",
    dataIndex: fillingNumberKey,
    key: fillingNumberKey,
    width: 100,
    ellipsis: true,
    searchable: true,
    sorter: (a: CaseReportValidate, b: CaseReportValidate) =>
      a.val_cr_filingnumber.length - b.val_cr_filingnumber.length,
  },
  {
    title: "Fecha ocurrencia",
    dataIndex: dateOfCaseKey,
    key: dateOfCaseKey,
    width: 100,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "Documento paciente",
    dataIndex: ddocumentPatientKey,
    key: ddocumentPatientKey,
    width: 120,
    ellipsis: true,
    searchable: true,
    sorter: (a: CaseReportValidate, b: CaseReportValidate) =>
      (a.val_cr_documentpatient ?? "").length -
      (b.val_cr_documentpatient ?? "").length,
  },
  {
    title: "Tipo de caso",
    dataIndex: CaseTypeNameKey,
    key: CaseTypeNameKey,
    width: 200,
    filters:
      caseTypeData?.map((type) => ({
        value: type.cas_t_name,
        text: type.cas_t_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.val_cr_casetype_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => customTagCaseTypes(type),
  },
  {
    title: "Suceso",
    dataIndex: eventNameKey,
    key: eventNameKey,
    width: 240,
    // filters:
    //   eventData?.map((type) => ({
    //     value: type.eve_name,
    //     text: type.eve_name,
    //   })) || [],
    // onFilter: (value: any, record: any) => {
    //   return String(record.val_cr_event_id_fk) === String(value);
    // },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Prioridad",
    dataIndex: PriorityNameKey,
    key: PriorityNameKey,
    width: 100,
    filters:
      priorityData?.map((type) => ({
        value: type.prior_name,
        text: type.prior_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.val_cr_priority_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Sinergia",
    dataIndex: Synergy,
    key: Synergy,
    width: 70,
    ellipsis: true,
    render: (synergy: Synergy[]) =>
      synergy && synergy.length > 0 ? (
        <div style={{ textAlign: "center" }}>
          <FaAngleDoubleUp
            style={{ color: "green", fontSize: "20px" }}
            title="En sinergia"
          />
        </div>
      ) : null,
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    fixed: "right" as "right",
    ellipsis: true,
    width: 70,
    render: (_: any, record: CaseReportValidate) => (
      <Space size="small">
        <Button
          size="small"
          type="primary"
          title="Detalles"
          shape="circle"
          icon={<EyeOutlined />}
          style={{
            background: "#6F42C1",
            color: "#ffffff",
          }}
          onClick={() => handleToRedirectToReportSummary(record.id)}
        />
      </Space>
    ),
  },
];

export default TableColumnsSummaryReports;
