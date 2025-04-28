import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditRiskTypeButtonComponent from "../buttons/EditRiskTypeButton";

const riskTypeNameKey: keyof RiskType = "ris_t_name";
const riskTypeDescriptionKey: keyof RiskType = "ris_t_description";
const riskTypeStatusKey: keyof RiskType = "ris_t_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsRiskType = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del tipo de riesgo",
    dataIndex: riskTypeNameKey,
    key: riskTypeNameKey,
    ellipsis: true,
    width: 390,
    searchable: true,
    sorter: (a: RiskType, b: RiskType) =>
      a.ris_t_name.length - b.ris_t_name.length,
  },
  {
    title: "Descripción",
    dataIndex: riskTypeDescriptionKey,
    key: riskTypeDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: RiskType, b: RiskType) => {
      const aValue = a.ris_t_description || "";
      const bValue = b.ris_t_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: riskTypeStatusKey,
    key: riskTypeStatusKey,
    fixed: "right" as "right",
    width: 100,
    render: (item: RiskType) => (
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
    width: 75,
    render: (_: any, record: RiskType) => (
      <Space size={"small"}>
        <EditRiskTypeButtonComponent
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

export default TableColumnsRiskType;
