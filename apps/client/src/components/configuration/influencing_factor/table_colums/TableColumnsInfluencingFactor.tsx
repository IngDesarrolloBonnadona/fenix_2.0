import CustomTags from "@/components/common/custom_tags/CustomTags";
import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditInfluencingFactorButtonComponent from "../buttons/EditInfluencingFactorButton";

const influencingFactorNameKey: keyof InfluencingFactor = "inf_f_name";
const influencingFactorDescriptionKey: keyof InfluencingFactor =
  "inf_f_description";
const influencingFactorStatusKey: keyof InfluencingFactor = "inf_f_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsInfluencyFactor = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del factor de influencia",
    dataIndex: influencingFactorNameKey,
    key: influencingFactorNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: InfluencingFactor, b: InfluencingFactor) =>
      a.inf_f_name.length - b.inf_f_name.length,
  },
  {
    title: "Descripción",
    dataIndex: influencingFactorDescriptionKey,
    key: influencingFactorDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: InfluencingFactor, b: InfluencingFactor) => {
      const aValue = a.inf_f_description || "";
      const bValue = b.inf_f_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: influencingFactorStatusKey,
    key: influencingFactorStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: InfluencingFactor) => (
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
    render: (_: any, record: InfluencingFactor) => (
      <Space size={"small"}>
        <EditInfluencingFactorButtonComponent
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

export default TableColumnsInfluencyFactor;
