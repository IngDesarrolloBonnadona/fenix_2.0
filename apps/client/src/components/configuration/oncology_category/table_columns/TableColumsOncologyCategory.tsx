import { Flex, Space } from "antd";
import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import EditOncologyCategoryButtonComponent from "../buttons/EditOncologyCategoryButton";

const oncologyCategoryNameKey: keyof OncologyCategory = "onc_c_name";
const oncologyCategoryDescriptionKey: keyof OncologyCategory =
  "onc_c_description";
const oncologyCategoryStatusKey: keyof OncologyCategory = "onc_c_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsOncologyCategory = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre de la categoría",
    dataIndex: oncologyCategoryNameKey,
    key: oncologyCategoryNameKey,
    ellipsis: true,
    width: 200,
    searchable: true,
    sorter: (a: OncologyCategory, b: OncologyCategory) =>
      a.onc_c_name.length - b.onc_c_name.length,
  },
  {
    title: "Descripción",
    dataIndex: oncologyCategoryDescriptionKey,
    key: oncologyCategoryDescriptionKey,
    ellipsis: true,
    width: 510,
    searchable: true,
    sorter: (a: OncologyCategory, b: OncologyCategory) => {
      const aValue = a.onc_c_description || "";
      const bValue = b.onc_c_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: oncologyCategoryStatusKey,
    key: oncologyCategoryStatusKey,
    fixed: "right" as "right",
    ellipsis: true,
    width: 100,
    render: (item: OncologyCategory) => (
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
    fixed: "right" as "right",
    ellipsis: true,
    width: 75,
    render: (_: any, record: OncologyCategory) => (
      <Space size={"small"}>
        <EditOncologyCategoryButtonComponent
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
export default TableColumnsOncologyCategory;
