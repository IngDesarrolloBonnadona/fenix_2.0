import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditMovementReportButtonComponent from "../buttons/EditMovementReportButton";

const movementReportNameKey: keyof MovementReport = "mov_r_name";
const movementReportDescriptionKey: keyof MovementReport = "mov_r_description";
const movementReportTimeKey: keyof MovementReport = "mov_r_time";
const movementReportStatusKey: keyof MovementReport = "mov_r_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsMovementReport = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del movimiento",
    dataIndex: movementReportNameKey,
    key: movementReportNameKey,
    ellipsis: true,
    width: 360,
    searchable: true,
    sorter: (a: MovementReport, b: MovementReport) =>
      a.mov_r_name.length - b.mov_r_name.length,
  },
  {
    title: "Descripción",
    dataIndex: movementReportDescriptionKey,
    key: movementReportDescriptionKey,
    ellipsis: true,
    width: 350,
    searchable: true,
    sorter: (a: MovementReport, b: MovementReport) => {
      const aValue = a.mov_r_description || "";
      const bValue = b.mov_r_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Tiempo",
    dataIndex: movementReportTimeKey,
    key: movementReportTimeKey,
    width: 100,
  },
  {
    title: "Estado",
    dataIndex: movementReportStatusKey,
    key: movementReportStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: MovementReport) => (
      <Flex justify="center">
        {item ? (
          <CustomTags
            colorCustom="green"
            labelCustom={StatusOptionsEnum.ENABLED}
          />
        ) : (
          <CustomTags
            colorCustom="red"
            labelCustom={StatusOptionsEnum.CANCELED}
          />
        )}
      </Flex>
    ),
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    width: 75,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: MovementReport) => (
      <Space size={"small"}>
        <EditMovementReportButtonComponent
          dataRecord={record}
          onRefectRegister={onRefetchRegister}
        />
        <CustomDeletePopConfirm
          onConfirm={() => handleClickDelete(record.id)}
          titleButton="Eliminar"
          title="Eliminar registro"
          description="¿Estás seguro de que deseas eliminar este registro?"
        />
      </Space>
    ),
  },
];

export default TableColumnsMovementReport;
