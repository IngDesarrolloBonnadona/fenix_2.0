import { Flex, Space } from "antd";

import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";

import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import EditProbabilityOcurrenceButtonComponent from "../buttons/EditProbabilityOcurrenceButton";

const probabilityOcurrenceLevelKey: keyof ProbabilityOcurrence = "prob_o_level";
const probabilityOcurrenceNameKey: keyof ProbabilityOcurrence = "prob_o_name";
const probabilityOcurrenceDescriptionKey: keyof ProbabilityOcurrence =
  "prob_o_description";
const probabilityOcurrenceStatusKey: keyof ProbabilityOcurrence =
  "prob_o_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsProbabilityOcurrence = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre de la ocurrencia",
    dataIndex: probabilityOcurrenceNameKey,
    key: probabilityOcurrenceNameKey,
    ellipsis: true,
    width: 150,
    searchable: true,
    sorter: (a: ProbabilityOcurrence, b: ProbabilityOcurrence) =>
      a.prob_o_name.length - b.prob_o_name.length,
  },
  {
    title: "Nivel",
    dataIndex: probabilityOcurrenceLevelKey,
    key: probabilityOcurrenceLevelKey,
    ellipsis: true,
    width: 150,
  },
  {
    title: "Descripción",
    dataIndex: probabilityOcurrenceDescriptionKey,
    key: probabilityOcurrenceDescriptionKey,
    ellipsis: true,
    width: 510,
    searchable: true,
    sorter: (a: ProbabilityOcurrence, b: ProbabilityOcurrence) => {
      const aValue = a.prob_o_description || "";
      const bValue = b.prob_o_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: probabilityOcurrenceStatusKey,
    key: probabilityOcurrenceStatusKey,
    fixed: "right" as "right",
    ellipsis: true,
    width: 100,
    render: (item: ProbabilityOcurrence) => (
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
    render: (_: any, record: ProbabilityOcurrence) => (
      <Space size={"small"}>
        <EditProbabilityOcurrenceButtonComponent
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
export default TableColumnsProbabilityOcurrence;
