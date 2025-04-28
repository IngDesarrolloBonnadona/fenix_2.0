import { Flex, Space } from "antd";

import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";

import EditCaseTypeButtonComponent from "../buttons/EditCaseTypeButton";

import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";

const caseTypeNameKey: keyof CaseType = "cas_t_name";
const caseTypeDescriptionKey: keyof CaseType = "cas_t_description";
const caseTypeStatusKey: keyof CaseType = "cas_t_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsCaseType = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del tipo de caso",
    dataIndex: caseTypeNameKey,
    key: caseTypeNameKey,
    ellipsis: true,
    width: 200,
    searchable: true,
    sorter: (a: CaseType, b: CaseType) =>
      a.cas_t_name.length - b.cas_t_name.length,
  },
  {
    title: "Descripción",
    dataIndex: caseTypeDescriptionKey,
    key: caseTypeDescriptionKey,
    ellipsis: true,
    width: 510,
    searchable: true,
    sorter: (a: CaseType, b: CaseType) => {
      const aValue = a.cas_t_description || "";
      const bValue = b.cas_t_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: caseTypeStatusKey,
    key: caseTypeStatusKey,
    fixed: "right" as "right",
    ellipsis: true,
    width: 100,
    render: (item: CaseType) => (
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
    render: (_: any, record: CaseType) => (
      <Space size={"small"}>
        <EditCaseTypeButtonComponent
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
export default TableColumnsCaseType;
