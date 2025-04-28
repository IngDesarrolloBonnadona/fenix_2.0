import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditUnsafeActionButtonComponent from "../buttons/EditUnsafeActionButton";

const unsafeActionNameKey: keyof UnsafeAction = "uns_a_name";
const unsafeActionDescriptionKey: keyof UnsafeAction = "uns_a_description";
const unsafeActionStatusKey: keyof UnsafeAction = "uns_a_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsUnsafeAction = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre de la acción insegura",
    dataIndex: unsafeActionNameKey,
    key: unsafeActionNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: UnsafeAction, b: UnsafeAction) =>
      a.uns_a_name.length - b.uns_a_name.length,
  },
  {
    title: "Descripción",
    dataIndex: unsafeActionDescriptionKey,
    key: unsafeActionDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: UnsafeAction, b: UnsafeAction) => {
      const aValue = a.uns_a_description || "";
      const bValue = b.uns_a_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: unsafeActionStatusKey,
    key: unsafeActionStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: UnsafeAction) => (
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
        <EditUnsafeActionButtonComponent
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
export default TableColumnsUnsafeAction;
