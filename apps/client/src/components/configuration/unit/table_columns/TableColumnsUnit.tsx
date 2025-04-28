import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { Flex, Space, Tag } from "antd";
import EditUnitButtonComponent from "../buttons/EditUnitButton";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import CustomTags from "@/components/common/custom_tags/CustomTags";

const unitNameKey: keyof Unit = "unit_name";
const unitDescriptionKey: keyof Unit = "unit_description";
const unitStatusKey: keyof Unit = "unit_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsUnit = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre de la unidad",
    dataIndex: unitNameKey,
    key: unitNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: Unit, b: Unit) => a.unit_name.length - b.unit_name.length,
  },
  {
    title: "Descripción",
    dataIndex: unitDescriptionKey,
    key: unitDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: Unit, b: Unit) => {
      const aValue = a.unit_description || "";
      const bValue = b.unit_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: unitStatusKey,
    key: unitStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: Unit) => (
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
    render: (_: any, record: Unit) => (
      <Space size={"small"}>
        <EditUnitButtonComponent
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

export default TableColumnsUnit;
