import { Flex, Space } from "antd";

import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";

import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import EditImpactButtonComponent from "../buttons/EditImpactButton";

const impactLevelKey: keyof Impact = "imp_level";
const impactNameKey: keyof Impact = "imp_name";
const impactHealthKey: keyof Impact = "imp_health_impact";
const impactBusinessKey: keyof Impact = "imp_business_impact";
const impactStatusKey: keyof Impact = "imp_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsImpact = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre de la ocurrencia",
    dataIndex: impactNameKey,
    key: impactNameKey,
    ellipsis: true,
    width: 150,
    searchable: true,
    sorter: (a: Impact, b: Impact) => a.imp_name.length - b.imp_name.length,
  },
  {
    title: "Nivel",
    dataIndex: impactLevelKey,
    key: impactLevelKey,
    ellipsis: true,
    width: 150,
  },
  {
    title: "Impacto en salud",
    dataIndex: impactHealthKey,
    key: impactHealthKey,
    ellipsis: true,
    width: 510,
    searchable: true,
    sorter: (a: Impact, b: Impact) => {
      const aValue = a.imp_health_impact || "";
      const bValue = b.imp_health_impact || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Impacto en general",
    dataIndex: impactBusinessKey,
    key: impactBusinessKey,
    ellipsis: true,
    width: 510,
    searchable: true,
    sorter: (a: Impact, b: Impact) => {
      const aValue = a.imp_business_impact || "";
      const bValue = b.imp_business_impact || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: impactStatusKey,
    key: impactStatusKey,
    fixed: "right" as "right",
    ellipsis: true,
    width: 100,
    render: (item: Impact) => (
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
    render: (_: any, record: Impact) => (
      <Space size={"small"}>
        <EditImpactButtonComponent
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

export default TableColumnsImpact;
