import { Flex, Space } from "antd";

import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";

import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";

import EditScoreComplianceButtonComponent from "../buttons/EditScoreComplianceButton";

const scoreComplianceNameKey: keyof ScoreComplianceControl = "sco_name";
const scoreCompliancePercentageey: keyof ScoreComplianceControl =
  "sco_percentage";
const scoreComplianceStatusKey: keyof ScoreComplianceControl = "sco_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsScoreCompliance = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del cumplimiento",
    dataIndex: scoreComplianceNameKey,
    key: scoreComplianceNameKey,
    ellipsis: true,
    width: 150,
    searchable: true,
    sorter: (a: ScoreComplianceControl, b: ScoreComplianceControl) =>
      a.sco_name.length - b.sco_name.length,
  },
  {
    title: "Porcentaje",
    dataIndex: scoreCompliancePercentageey,
    key: scoreCompliancePercentageey,
    ellipsis: true,
    width: 150,
  },
  {
    title: "Estado",
    dataIndex: scoreComplianceStatusKey,
    key: scoreComplianceStatusKey,
    fixed: "right" as "right",
    ellipsis: true,
    width: 100,
    render: (item: ScoreComplianceControl) => (
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
    render: (_: any, record: ScoreComplianceControl) => (
      <Space size={"small"}>
        <EditScoreComplianceButtonComponent
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
export default TableColumnsScoreCompliance;
