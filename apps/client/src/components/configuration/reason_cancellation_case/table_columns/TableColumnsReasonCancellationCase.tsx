"use client";

import { Flex, Space } from "antd";

import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";

import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditReasonCancellationCaseButton from "../buttons/EditReasonCancellationCaseButton";

const reasonCancellationCaseCauseKey: keyof ReasonCancellationCase =
  "cac_r_cause";
const reasonCancellationCaseStatusnKey: keyof ReasonCancellationCase =
  "cac_r_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsReasonCancellationCase = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre de la razón anulación de caso",
    dataIndex: reasonCancellationCaseCauseKey,
    key: reasonCancellationCaseCauseKey,
    ellipsis: true,
    width: 300,
    searchable: true,
    sorter: (a: ReasonCancellationCase, b: ReasonCancellationCase) =>
      a.cac_r_cause.length - b.cac_r_cause.length,
  },

  {
    title: "Estado",
    dataIndex: reasonCancellationCaseStatusnKey,
    key: reasonCancellationCaseStatusnKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: ReasonCancellationCase) => (
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
    render: (_: any, record: ReasonCancellationCase) => (
      <Space size={"small"}>
        <EditReasonCancellationCaseButton
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

export default TableColumnsReasonCancellationCase;
