import { Button, Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";
import { calculateRemainingDays } from "@/helpers/calculate_remaining_days/calculate_remaining_days";
import { MovementReportEnum } from "@/utils/enums/movement_report.enum";

const fillingNumberKey: keyof CaseReportValidate = "val_cr_filingnumber";
const eventNameKey: keyof CaseReportValidate = "val_cr_event_id_fk";
const CaseTypeNameKey: keyof CaseReportValidate = "val_cr_casetype_id_fk";
const MovementReportNameKey: keyof CaseReportValidate =
  "val_cr_statusmovement_id_fk";
const PriorityNameKey: keyof CaseReportValidate = "val_cr_priority_id_fk";
const reportAnalystAssignmentTimeKey: keyof CaseReportValidate =
  "reportAnalystAssignment";
const reportResearcherAssignmentTimeKey: keyof CaseReportValidate =
  "reportResearcherAssignment";

interface TableColumnProps {
  caseTypeData: CaseType[] | undefined;
  eventData: Events[] | undefined;
  priorityData: Priority[] | undefined;
  movementReportData: MovementReport[] | undefined;
  handleClickSeeMore: any;
}

const TableColumnsAnalysisCaseAssignment = ({
  eventData,
  caseTypeData,
  priorityData,
  movementReportData,
  handleClickSeeMore,
}: TableColumnProps) => [
  {
    title: "Estado",
    dataIndex: MovementReportNameKey,
    key: MovementReportNameKey,
    width: 180,
    filters: [
      {
        value: MovementReportEnum.ASSIGNMENT_ANALYST,
        text: MovementReportEnum.ASSIGNMENT_ANALYST,
      },
      {
        value: MovementReportEnum.ASSIGNMENT_RESEARCHER,
        text: MovementReportEnum.ASSIGNMENT_RESEARCHER,
      },
      {
        value: MovementReportEnum.CASE_RAISED_SYNERGY_COMMITTEE,
        text: MovementReportEnum.CASE_RAISED_SYNERGY_COMMITTEE,
      },
      {
        value: MovementReportEnum.SOLUTION_CASE_SYNERGY,
        text: MovementReportEnum.SOLUTION_CASE_SYNERGY,
      },
      {
        value: MovementReportEnum.RETURN_CASE_ANALYST,
        text: MovementReportEnum.RETURN_CASE_ANALYST,
      },
      {
        value: MovementReportEnum.REASSIGNMENT_ANALYST,
        text: MovementReportEnum.REASSIGNMENT_ANALYST,
      },
      {
        value: MovementReportEnum.REASSIGNMENT_RESEARCHER,
        text: MovementReportEnum.REASSIGNMENT_RESEARCHER,
      },
      {
        value: MovementReportEnum.CASE_UNDER_INVESTIGATION,
        text: MovementReportEnum.CASE_UNDER_INVESTIGATION,
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
    dataIndex: fillingNumberKey,
    key: fillingNumberKey,
    width: 120,
    ellipsis: true,
    searchable: true,
    sorter: (a: CaseReportValidate, b: CaseReportValidate) =>
      a.val_cr_filingnumber.length - b.val_cr_filingnumber.length,
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
    title: "T. Analista",
    dataIndex: reportAnalystAssignmentTimeKey,
    key: reportAnalystAssignmentTimeKey,
    width: 110,
    ellipsis: true,
    render: (item: ReportAnalystAssignment[]) => {
      const analystAssignment = item?.[0];
      if (analystAssignment?.updateAt) {
        const { text, color } = calculateRemainingDays(
          analystAssignment.updateAt,
          analystAssignment.ana_days
        );
        return <p style={{ color }}>{text}</p>;
      }
      return <p>{"No asignado"}</p>;
    },
    sorter: (a: CaseReportValidate, b: CaseReportValidate) => {
      const analystA = Array.isArray(a[reportAnalystAssignmentTimeKey])
        ? a[reportAnalystAssignmentTimeKey][0]
        : null;
      const analystB = Array.isArray(b[reportAnalystAssignmentTimeKey])
        ? b[reportAnalystAssignmentTimeKey][0]
        : null;

      const daysA = analystA?.updateAt
        ? calculateRemainingDays(analystA.updateAt, analystA.ana_days).text
        : null;
      const daysB = analystB?.updateAt
        ? calculateRemainingDays(analystB.updateAt, analystB.ana_days).text
        : null;

      const parseDays = (daysText: string | null): number => {
        if (!daysText) return Number.MAX_SAFE_INTEGER;

        if (daysText.includes("vencidos")) {
          return -parseInt(daysText.replace(/\D/g, ""), 10);
        }
        return parseInt(daysText.replace(/\D/g, ""), 10);
      };

      const numericDaysA = parseDays(daysA);
      const numericDaysB = parseDays(daysB);

      return numericDaysA - numericDaysB;
    },
  },
  {
    title: "T. Investigador",
    dataIndex: reportResearcherAssignmentTimeKey,
    key: reportResearcherAssignmentTimeKey,
    width: 110,
    ellipsis: true,
    render: (item: ReportResearcherAssignment[]) => {
      const researcherAssignment = item?.[0];
      if (researcherAssignment?.updateAt) {
        const { text, color } = calculateRemainingDays(
          researcherAssignment.updateAt,
          researcherAssignment.res_days
        );
        return <p style={{ color }}>{text}</p>;
      }
      return <p>{"No asignado"}</p>;
    },
    sorter: (a: CaseReportValidate, b: CaseReportValidate) => {
      const researchA = Array.isArray(a[reportResearcherAssignmentTimeKey])
        ? a[reportResearcherAssignmentTimeKey][0]
        : null;
      const researchB = Array.isArray(b[reportResearcherAssignmentTimeKey])
        ? b[reportResearcherAssignmentTimeKey][0]
        : null;

      const daysA = researchA?.updateAt
        ? calculateRemainingDays(researchA.updateAt, researchA.res_days).text
        : null;
      const daysB = researchB?.updateAt
        ? calculateRemainingDays(researchB.updateAt, researchB.res_days).text
        : null;

      const parseDays = (daysText: string | null): number => {
        if (!daysText) return Number.MAX_SAFE_INTEGER;

        if (daysText.includes("vencidos")) {
          return -parseInt(daysText.replace(/\D/g, ""), 10);
        }
        return parseInt(daysText.replace(/\D/g, ""), 10);
      };

      const numericDaysA = parseDays(daysA);
      const numericDaysB = parseDays(daysB);

      return numericDaysA - numericDaysB;
    },
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

export default TableColumnsAnalysisCaseAssignment;
