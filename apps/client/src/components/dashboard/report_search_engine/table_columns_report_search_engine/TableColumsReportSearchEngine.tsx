import { Button, Space } from "antd";

import { EyeOutlined } from "@ant-design/icons";

import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";

const FilingNumberKey: keyof CaseReportValidate = "val_cr_filingnumber";
const DateOfCaseKey: keyof CaseReportValidate = "val_cr_dateofcase";
const DocumentPatientKey: keyof CaseReportValidate = "val_cr_documentpatient";
const CaseTypeNameKey: keyof CaseReportValidate = "val_cr_casetype_id_fk";
const MovementReportNameKey: keyof CaseReportValidate =
  "val_cr_statusmovement_id_fk";

interface TableColumnProps {
  caseTypeData: CaseType[] | undefined;
  movementReportData: MovementReport[] | undefined;
  handleClickSeeMore: any;
}

const TableColumnsReportSearchEngine = ({
  caseTypeData,
  movementReportData,
  handleClickSeeMore,
}: TableColumnProps) => [
  {
    title: "Estado",
    dataIndex: MovementReportNameKey,
    key: MovementReportNameKey,
    width: 200,
    filters:
      movementReportData?.map((type) => ({
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
    dataIndex: FilingNumberKey,
    key: FilingNumberKey,
    width: 100,
    ellipsis: true,
    searchable: true,
    sorter: (a: CaseReportValidate, b: CaseReportValidate) =>
      a.val_cr_filingnumber.length - b.val_cr_filingnumber.length,
  },
  {
    title: "Fecha ocurrencia",
    dataIndex: DateOfCaseKey,
    key: DateOfCaseKey,
    width: 100,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "Documento",
    dataIndex: DocumentPatientKey,
    key: DocumentPatientKey,
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
    width: 180,
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
          onClick={() => handleClickSeeMore(record.id)}
        />
      </Space>
    ),
  },
];

export default TableColumnsReportSearchEngine;
