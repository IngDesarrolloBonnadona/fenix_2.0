import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { Button, Flex, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditPriorityButtonComponent from "../buttons/EditPriorityButton";

const priorityNameKey: keyof Priority = "prior_name";
const priorityDescriptionKey: keyof Priority = "prior_description";
const priorityResponseTimeKey: keyof Priority = "prior_responsetime";
const severityClasificationKey: keyof Priority = "prior_severityclasif_id_fk";
const priorityStatusKey: keyof Priority = "prior_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  severityClasificationData: SeverityClasification[] | undefined;
}

const TableColumnsPriority = ({
  handleClickDelete,
  onRefetchRegister,
  severityClasificationData,
}: TableColumnProps) => [
  {
    title: "Nombre de la prioridad",
    dataIndex: priorityNameKey,
    key: priorityNameKey,
    ellipsis: true,
    width: 150,
    searchable: true,
    sorter: (a: Priority, b: Priority) =>
      a.prior_name.length - b.prior_name.length,
  },
  {
    title: "Descripción",
    dataIndex: priorityDescriptionKey,
    key: priorityDescriptionKey,
    ellipsis: true,
    width: 188,
    searchable: true,
    sorter: (a: Priority, b: Priority) => {
      const aValue = a.prior_description || "";
      const bValue = b.prior_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Tiempo de respuesta",
    dataIndex: priorityResponseTimeKey,
    key: priorityResponseTimeKey,
    ellipsis: true,
    width: 150,
  },
  {
    title: "Clasificacion de Severidad",
    dataIndex: severityClasificationKey,
    key: severityClasificationKey,
    ellipsis: true,
    width: 295,
    filters: severityClasificationData?.map((type) => ({
      value: type.sev_c_name,
      text: type.sev_c_name,
    })),
    onFilter: (value: any, record: any) => {
      return String(record.prior_severityclasif_id_fk) === String(value);
    },
    render: (type: any) => type,
  },
  {
    title: "Estado",
    dataIndex: priorityStatusKey,
    key: priorityStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: Priority) => (
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
    render: (_: any, record: Priority) => (
      <Space size={"small"}>
        <EditPriorityButtonComponent
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

export default TableColumnsPriority;
