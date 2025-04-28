import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { Flex, Space } from "antd";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditSubOriginButtonComponent from "../buttons/EditSubOriginButton";

const subOriginNameKey: keyof SubOrigin = "sub_o_name";
const subOriginDescriptionKey: keyof SubOrigin = "sub_o_description";
const originKey: keyof SubOrigin = "sub_o_origin_id_fk";
const subOriginStatusKey: keyof SubOrigin = "sub_o_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  originData: Origin[] | undefined;
}

const TableColumnsSubOrigin = ({
  handleClickDelete,
  onRefetchRegister,
  originData,
}: TableColumnProps) => [
  {
    title: "Nombre del sub origen",
    dataIndex: subOriginNameKey,
    key: subOriginNameKey,
    ellipsis: true,
    width: 300,
    searchable: true,
    sorter: (a: SubOrigin, b: SubOrigin) =>
      a.sub_o_name.length - b.sub_o_name.length,
  },
  {
    title: "Descripción",
    dataIndex: subOriginDescriptionKey,
    key: subOriginDescriptionKey,
    ellipsis: true,
    width: 210,
    searchable: true,
    sorter: (a: SubOrigin, b: SubOrigin) => {
      const aValue = a.sub_o_description || "";
      const bValue = b.sub_o_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Origen",
    dataIndex: originKey,
    key: originKey,
    ellipsis: true,
    width: 300,
    filters: originData?.map((type) => ({
      value: type.orig_name,
      text: type.orig_name,
    })),
    onFilter: (value: any, record: any) => {
      return String(record.sub_o_origin_id_fk) === String(value);
    },
    render: (type: any) => type,
  },
  {
    title: "Estado",
    dataIndex: subOriginStatusKey,
    key: subOriginStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: SubOrigin) => (
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
    render: (_: any, record: SubOrigin) => (
      <Space size={"small"}>
        <EditSubOriginButtonComponent
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

export default TableColumnsSubOrigin;
