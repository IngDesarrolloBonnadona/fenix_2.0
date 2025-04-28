import CustomButton from "@/components/common/custom_button/CustomButton";
import { Space } from "antd";
import { PiFileMagnifyingGlassBold } from "react-icons/pi";
import { filterCasesByCurrentQuarter } from "../helpers/filter_cases_by_current_quarter";
import { filterCasesByUnit } from "../helpers/filter_cases_by_unit";
import { calculateConcurrence } from "../helpers/calculate_concurrence";
import { generateUniqueFilters } from "@/helpers/generate_unique_filters/generate_unique_fliters";

const eventNameKey: keyof Events = "eve_name";
const eventTypeKey: keyof Events = "eve_eventtype_id_fk";
const unitKey: keyof Events = "eve_unit_id_fk";
const concurrenceKey: keyof Events = "caseReportValidate";

interface TableColumnProps {
  filteredEventType: EventType[] | undefined;
  unitData: Unit[] | undefined;
  serviceData: Service[] | undefined;
  handleClickSeeMore: any;
}

const TableColumnsRisksEvent = ({
  filteredEventType,
  unitData,
  serviceData,
  handleClickSeeMore,
}: TableColumnProps) => [
  {
    title: "Concurrencia",
    dataIndex: concurrenceKey,
    key: concurrenceKey,
    width: 110,
    sorter: (a: Events, b: Events) => {
      const totalConcurrenceA = calculateConcurrence(a, serviceData);
      const totalConcurrenceB = calculateConcurrence(b, serviceData);
      return totalConcurrenceA - totalConcurrenceB;
    },
    render: (_: any, record: Events) =>
      calculateConcurrence(record, serviceData),
  },
  {
    title: "Riesgo identificado",
    dataIndex: eventNameKey,
    key: eventNameKey,
    ellipsis: true,
    width: 500,
    searchable: true,
    sorter: (a: Events, b: Events) => a.eve_name.length - b.eve_name.length,
  },
  {
    title: "Subsistema",
    dataIndex: eventTypeKey,
    key: eventTypeKey,
    width: 240,
    ellipsis: true,
    filters: generateUniqueFilters(
      filteredEventType,
      "eve_t_name",
      "eve_t_name"
    ),
    onFilter: (value: any, record: any) =>
      String(record.eve_eventtype_id_fk) === String(value),
    render: (type: string) => type,
  },
  {
    title: "Unidad",
    dataIndex: unitKey,
    key: unitKey,
    ellipsis: true,
    width: 200,
    filters:
      unitData?.map((type) => ({
        value: type.unit_name,
        text: type.unit_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_unit_id_fk) === String(value);
    },
    render: (type: any) => type,
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    fixed: "right" as "right",
    ellipsis: true,
    width: 75,
    render: (_: any, record: Events) => (
      <Space size="small">
        <CustomButton
          sizeCustomButton="small"
          typeCustomButton="primary"
          titleTooltipCustomButton="Detalles"
          shapeCustomButton="circle"
          iconCustomButton={<PiFileMagnifyingGlassBold />}
          styleCustomButton={{ background: "#6F42C1", color: "#ffffff" }}
          onClickCustomButton={() => handleClickSeeMore(record)}
        />
      </Space>
    ),
  },
];

export default TableColumnsRisksEvent;
