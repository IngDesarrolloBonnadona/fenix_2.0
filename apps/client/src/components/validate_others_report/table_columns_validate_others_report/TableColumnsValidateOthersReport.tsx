import { Button, Space, Tag } from "antd";

import { EyeOutlined } from "@ant-design/icons";

import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";
import { MovementReportEnum } from "@/utils/enums/movement_report.enum";

const eventNameKey: keyof CaseReportValidate = "val_cr_event_id_fk";
const filingNumberKey: keyof CaseReportValidate = "val_cr_filingnumber";
const dateOfcaseKey: keyof CaseReportValidate = "val_cr_dateofcase";
const caseTypeNameKey: keyof CaseReportValidate = "val_cr_casetype_id_fk";
const documentPatientKey: keyof CaseReportValidate = "val_cr_documentpatient";
const movementReportNameKey: keyof CaseReportValidate =
  "val_cr_statusmovement_id_fk";
const priorityNameKey: keyof CaseReportValidate = "val_cr_priority_id_fk";

interface TableColumnProps {
  handleClickSeeMore: any;
  caseTypeData: CaseType[] | undefined;
  eventData: Events[] | undefined;
  priorityData: Priority[] | undefined;
  movementReportData: MovementReport[] | undefined;
}

const TableColumnsValidateOthersReport = ({
  caseTypeData,
  priorityData,
  movementReportData,
  handleClickSeeMore,
}: TableColumnProps) => [
  {
    title: "Estado",
    dataIndex: movementReportNameKey,
    key: movementReportNameKey,
    width: 180,
    filters: [
      {
        value: MovementReportEnum.ANULATION,
        text: MovementReportEnum.ANULATION,
      },
      {
        value: MovementReportEnum.RETURN_CASE_VALIDATOR,
        text: MovementReportEnum.RETURN_CASE_VALIDATOR,
      },
    ],
    onFilter: (value: any, record: any) => {
      return String(record.val_cr_statusmovement_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Código",
    dataIndex: filingNumberKey,
    key: filingNumberKey,
    width: 120,
    ellipsis: true,
    searchable: true,
    sorter: (a: CaseReportValidate, b: CaseReportValidate) =>
      a.val_cr_filingnumber.length - b.val_cr_filingnumber.length,
  },
  {
    title: "Fecha ocurrencia",
    dataIndex: dateOfcaseKey,
    key: dateOfcaseKey,
    width: 100,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "Documento paciente",
    dataIndex: documentPatientKey,
    key: documentPatientKey,
    width: 120,
    ellipsis: true,
    searchable: true,
    sorter: (a: CaseReportValidate, b: CaseReportValidate) =>
      (a.val_cr_documentpatient ?? "").length -
      (b.val_cr_documentpatient ?? "").length,
  },
  {
    title: "Tipo de caso",
    dataIndex: caseTypeNameKey,
    key: caseTypeNameKey,
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
    width: 220,
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
    dataIndex: priorityNameKey,
    key: priorityNameKey,
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
          style={{ background: "#6F42C1", color: "#ffffff" }}
          onClick={() => handleClickSeeMore(record.id)}
        />
      </Space>
    ),
  },
];

export default TableColumnsValidateOthersReport;
