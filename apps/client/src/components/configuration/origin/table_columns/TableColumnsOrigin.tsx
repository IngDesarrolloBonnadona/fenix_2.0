import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Button, Flex, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditOriginButtonComponent from "../buttons/EditOriginButton";

const originNameKey: keyof Origin = "orig_name";
const originDescriptionKey: keyof Origin = "orig_description";
const originStatusKey: keyof Origin = "orig_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsOrigin = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del origen",
    dataIndex: originNameKey,
    key: originNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: Origin, b: Origin) => a.orig_name.length - b.orig_name.length,
  },
  {
    title: "Descripción",
    dataIndex: originDescriptionKey,
    key: originDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: Origin, b: Origin) => {
      const aValue = a.orig_description || "";
      const bValue = b.orig_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: originStatusKey,
    key: originStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: Origin) => (
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
    render: (_: any, record: Origin) => (
      <Space size={"small"}>
        <EditOriginButtonComponent
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

export default TableColumnsOrigin;
