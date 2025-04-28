import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import EditDamageTypeButtonComponent from "../buttons/EditDamageTypeButton";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";

const damageTypeNameKey: keyof DamageType = "dam_t_name";
const damageTypeDescriptionKey: keyof DamageType = "dam_t_description";
const damageTypeStatusKey: keyof DamageType = "dam_t_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsDamageType = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del tipo de daño",
    dataIndex: damageTypeNameKey,
    key: damageTypeNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: DamageType, b: DamageType) =>
      a.dam_t_name.length - b.dam_t_name.length,
  },
  {
    title: "Descripción",
    dataIndex: damageTypeDescriptionKey,
    key: damageTypeDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: DamageType, b: DamageType) => {
      const aValue = a.dam_t_description || "";
      const bValue = b.dam_t_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: damageTypeStatusKey,
    key: damageTypeStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: DamageType) => (
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
    render: (_: any, record: any) => (
      <Space size={"small"}>
        <EditDamageTypeButtonComponent
          dataRecord={record}
          onRefetchRegister={onRefetchRegister}
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
export default TableColumnsDamageType;
