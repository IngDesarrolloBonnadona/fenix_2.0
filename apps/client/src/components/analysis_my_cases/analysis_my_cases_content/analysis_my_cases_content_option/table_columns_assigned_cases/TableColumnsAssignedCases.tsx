import { Button, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";
import { calculateRemainingDays } from "@/helpers/calculate_remaining_days/calculate_remaining_days";
import CustomButton from "@/components/common/custom_button/CustomButton";

const fillingNumberKey: keyof CaseReportValidate = "val_cr_filingnumber";
const eventNameKey: keyof CaseReportValidate = "val_cr_event_id_fk";
const CaseTypeNameKey: keyof CaseReportValidate = "val_cr_casetype_id_fk";
const PriorityNameKey: keyof CaseReportValidate = "val_cr_priority_id_fk";
const reportAnalystAssignmentTimeKey: keyof CaseReportValidate =
  "reportAnalystAssignment";
const reportResearcherAssignmentTimeKey: keyof CaseReportValidate =
  "reportResearcherAssignment";
const documentPatientKey: keyof CaseReportValidate = "val_cr_documentpatient";

interface TableColumnProps {
  caseTypeData: CaseType[] | undefined;
  priorityData: Priority[] | undefined;
  handleClickSeeMore: any;
}

const TableColumnsAssignedCases = ({
  caseTypeData,
  priorityData,
  handleClickSeeMore,
}: TableColumnProps) => [
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
    width: 110,
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
    width: 120,
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
    width: 120,
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
    title: "P. Plan Asociado",
    dataIndex: "possible_associated_plan",
    key: "possible_associated_plan",
    width: 70,
    fixed: "right" as "right",
    ellipsis: true,
    // render: (synergy: Synergy[]) =>
    //   synergy && synergy.length > 0 ? (
    //     <div style={{ textAlign: "center" }}>
    //       <FaAngleDoubleUp
    //         style={{ color: "green", fontSize: "20px" }}
    //         title="En sinergia"
    //       />
    //     </div>
    //   ) : null,
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
          sizeCustomButton="small"
          typeCustomButton="primary"
          titleTooltipCustomButton="Detalles"
          shapeCustomButton="circle"
          iconCustomButton={<EyeOutlined />}
          styleCustomButton={{ background: "#6F42C1", color: "#ffffff" }}
          onClickCustomButton={() => handleClickSeeMore(record.id)}
        />
      </Space>
    ),
  },
];

export default TableColumnsAssignedCases;
