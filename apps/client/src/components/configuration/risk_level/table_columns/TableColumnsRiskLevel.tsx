import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { Flex, Space } from "antd";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditRiskLevelButtonComponent from "../buttons/EditRiskLevelButton";

const riskLevelNameKey: keyof RiskLevel = "ris_l_name";
const riskLevelDescriptionKey: keyof RiskLevel = "ris_l_description";
const riskLevelStatusKey: keyof RiskLevel = "ris_l_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsRiskLevel = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del nivel de riesgo",
    dataIndex: riskLevelNameKey,
    key: riskLevelNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: RiskLevel, b: RiskLevel) =>
      a.ris_l_name.length - b.ris_l_name.length,
  },
  {
    title: "Descripción",
    dataIndex: riskLevelDescriptionKey,
    key: riskLevelDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: RiskLevel, b: RiskLevel) => {
      const aValue = a.ris_l_description || "";
      const bValue = b.ris_l_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: riskLevelStatusKey,
    key: riskLevelStatusKey,
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
    render: (_: any, record: RiskLevel) => (
      <Space size={"small"}>
        <EditRiskLevelButtonComponent
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

export default TableColumnsRiskLevel;
