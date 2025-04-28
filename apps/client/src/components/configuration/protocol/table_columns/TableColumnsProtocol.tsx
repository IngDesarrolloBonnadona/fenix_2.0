import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditProtocolButtonComponent from "../buttons/EditProtocolButton";

const protocolNameKey: keyof Protocol = "prot_name";
const protocolDescriptionKey: keyof Protocol = "prot_description";
const protocolStatusKey: keyof Protocol = "prot_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsProtocol = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del protocolo",
    dataIndex: protocolNameKey,
    key: protocolNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: Protocol, b: Protocol) =>
      a.prot_name.length - b.prot_name.length,
  },
  {
    title: "Descripción",
    dataIndex: protocolDescriptionKey,
    key: protocolDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: Protocol, b: Protocol) => {
      const aValue = a.prot_description || "";
      const bValue = b.prot_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: protocolStatusKey,
    key: protocolStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: Protocol) => (
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
    render: (_: any, record: Protocol) => (
      <Space size={"small"}>
        <EditProtocolButtonComponent
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
export default TableColumnsProtocol;
