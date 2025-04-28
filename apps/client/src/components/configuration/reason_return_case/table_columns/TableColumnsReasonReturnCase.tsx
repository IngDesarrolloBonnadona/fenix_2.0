import { Flex, Space } from "antd";

import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";

import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";

import EditReasonReturnCaseButtonComponent from "../buttons/EditReasonReturnCaseButton";

const reasonReturnCaseCauseKey: keyof ReasonReturnCase = "rec_r_cause";
const reasonReturnCaseDescriptionKey: keyof ReasonReturnCase =
  "rec_r_description";
const roleKey: keyof ReasonReturnCase = "rec_r_role_id_fk";
const reasonReturnCaseStatusnKey: keyof ReasonReturnCase = "rec_r_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  roleData: Role[] | undefined;
}

const TableColumnsReasonReturnCase = ({
  handleClickDelete,
  onRefetchRegister,
  roleData,
}: TableColumnProps) => [
  {
    title: "Nombre de la razón devolución de caso",
    dataIndex: reasonReturnCaseCauseKey,
    key: reasonReturnCaseCauseKey,
    ellipsis: true,
    width: 300,
    searchable: true,
    sorter: (a: ReasonReturnCase, b: ReasonReturnCase) =>
      a.rec_r_cause.length - b.rec_r_cause.length,
  },
  {
    title: "Descripción",
    dataIndex: reasonReturnCaseDescriptionKey,
    key: reasonReturnCaseDescriptionKey,
    ellipsis: true,
    width: 210,
    searchable: true,
    sorter: (a: ReasonReturnCase, b: ReasonReturnCase) => {
      const aValue = a.rec_r_description || "";
      const bValue = b.rec_r_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Rol",
    dataIndex: roleKey,
    key: roleKey,
    ellipsis: true,
    width: 300,
    filters:
      roleData?.map((type) => ({
        value: type.role_name,
        text: type.role_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.rec_r_role_id_fk) === String(value);
    },
    render: (type: any) => type,
  },
  {
    title: "Estado",
    dataIndex: reasonReturnCaseStatusnKey,
    key: reasonReturnCaseStatusnKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: ReasonReturnCase) => (
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
    render: (_: any, record: ReasonReturnCase) => (
      <Space size={"small"}>
        <EditReasonReturnCaseButtonComponent
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

export default TableColumnsReasonReturnCase;
