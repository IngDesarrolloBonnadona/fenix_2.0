import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import EditRoleButtonComponent from "../buttons/EditRoleButton";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";

const roleNameKey: keyof Role = "role_name";
const roleDescriptionKey: keyof Role = "role_description";
const roleStatusKey: keyof Role = "role_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsRole = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del rol",
    dataIndex: roleNameKey,
    key: roleNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: Role, b: Role) =>
      a.role_name.length - b.role_description.length,
  },
  {
    title: "Descripción",
    dataIndex: roleDescriptionKey,
    key: roleDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: Role, b: Role) => {
      const aValue = a.role_description || "";
      const bValue = b.role_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: roleStatusKey,
    key: roleStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: Role) => (
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
    render: (_: any, record: Role) => (
      <Space size={"small"}>
        <EditRoleButtonComponent
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

export default TableColumnsRole;
