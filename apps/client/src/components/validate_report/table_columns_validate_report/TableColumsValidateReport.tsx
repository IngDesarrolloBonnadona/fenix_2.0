import { Button, Space } from "antd";

import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";

import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";
import CustomButton from "@/components/common/custom_button/CustomButton";
import { MovementReportEnum } from "@/utils/enums/movement_report.enum";

const eventNameKey: keyof CaseReportValidate = "val_cr_event_id_fk";
const caseTypeNameKey: keyof CaseReportValidate = "val_cr_casetype_id_fk";
const movementReportNameKey: keyof CaseReportValidate =
  "val_cr_statusmovement_id_fk";
const priorityNameKey: keyof CaseReportValidate = "val_cr_priority_id_fk";
const filingNumberKey: keyof CaseReportValidate = "val_cr_filingnumber";
const dateOfcaseKey: keyof CaseReportValidate = "val_cr_dateofcase";
const documentPatientKey: keyof CaseReportValidate = "val_cr_documentpatient";

interface TableColumnProps {
  caseTypeData: CaseType[] | undefined;
  eventData: Events[] | undefined;
  priorityData: Priority[] | undefined;
  movementReportData: MovementReport[] | undefined;
  handleClickSeeMore: (id: string, caseOriginalId: string) => void;
  reportValidateByIdDataLoading: boolean;
}

const TableColumnsValidateReport = ({
  caseTypeData,
  priorityData,
  handleClickSeeMore: handleClickSeeMore,
  reportValidateByIdDataLoading,
}: TableColumnProps) => [
  {
    title: "Estado",
    dataIndex: movementReportNameKey,
    key: movementReportNameKey,
    width: 180,
    filters: [
      {
        value: MovementReportEnum.REPORT_CREATION,
        text: MovementReportEnum.REPORT_CREATION,
      },
      {
        value: MovementReportEnum.VALIDATION,
        text: MovementReportEnum.VALIDATION,
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
        <CustomButton
          classNameCustomButton="see-more-report-button"
          idCustomButton="see-more-report-button"
          typeCustomButton="primary"
          titleTooltipCustomButton="Detalles"
          iconCustomButton={
            !reportValidateByIdDataLoading ? (
              <EyeOutlined />
            ) : (
              <LoadingOutlined />
            )
          }
          onClickCustomButton={() =>
            handleClickSeeMore(record.id, record.val_cr_originalcase_id_fk)
          }
          styleCustomButton={{
            background: "#6F42C1",
            color: "#ffffff",
          }}
          shapeCustomButton="circle"
          sizeCustomButton={"small"}
          disabledCustomButton={!reportValidateByIdDataLoading ? false : true}
        />
      </Space>
    ),
  },
];

export default TableColumnsValidateReport;
