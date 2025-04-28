import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { Flex, Space, Tag } from "antd";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditEventTypeButtonComponent from "../buttons/EditEventTypeButtonComponent";
import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";

const caseTypeKey: keyof EventType = "eve_t_casetype_id_fk";
const eventTypeNameKey: keyof EventType = "eve_t_name";
const eventTypeStatusKey: keyof EventType = "eve_t_status";
const eventStatusKey: keyof EventType = "event";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  caseTypeData: CaseType[] | undefined;
}

const TableColumnsEventType = ({
  handleClickDelete,
  onRefetchRegister,
  caseTypeData,
}: TableColumnProps) => [
  {
    title: "Nombre de la estrategia",
    dataIndex: eventTypeNameKey,
    key: eventTypeNameKey,
    ellipsis: true,
    searchable: true,
    width: 430,
    sorter: (a: EventType, b: EventType) =>
      a.eve_t_name.length - b.eve_t_name.length,
  },
  {
    title: "Cantidad de Sucesos",
    dataIndex: eventStatusKey,
    key: eventStatusKey,
    width: 130,
    render: (item: string) => item.length,
  },
  {
    title: "Tipo de caso",
    key: caseTypeKey,
    dataIndex: caseTypeKey,
    width: 250,
    filters:
      caseTypeData?.map((type) => ({
        value: type.cas_t_name,
        text: type.cas_t_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_t_casetype_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => customTagCaseTypes(type),
  },
  {
    title: "Estado",
    dataIndex: eventTypeStatusKey,
    key: eventTypeStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: Service) => (
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
    render: (_: any, record: EventType) => (
      <Space size={"small"}>
        <EditEventTypeButtonComponent
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

export default TableColumnsEventType;
