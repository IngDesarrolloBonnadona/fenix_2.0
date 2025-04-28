import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditRiskFactorButtonComponent from "../buttons/EditRiskFactorButton";

const riskFactorNameKey: keyof RiskFactor = "ris_f_name";
const riskFactorDescriptionKey: keyof RiskFactor = "ris_f_description";
const riskFactorStatusKey: keyof RiskFactor = "ris_f_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsRiskFactor = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del factor de riesgo",
    dataIndex: riskFactorNameKey,
    key: riskFactorNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: RiskFactor, b: RiskFactor) =>
      a.ris_f_name.length - b.ris_f_name.length,
  },
  {
    title: "Descripción",
    dataIndex: riskFactorDescriptionKey,
    key: riskFactorDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: RiskFactor, b: RiskFactor) => {
      const aValue = a.ris_f_description || "";
      const bValue = b.ris_f_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: riskFactorStatusKey,
    key: riskFactorStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: RiskFactor) => (
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
        <EditRiskFactorButtonComponent
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

export default TableColumnsRiskFactor;
