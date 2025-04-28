import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditServiceButtonComponent from "../buttons/EditServiceButton";

const serviceNameKey: keyof Service = "serv_name";
const serviceDescriptionKey: keyof Service = "serv_description";
const unitKey: keyof Service = "serv_unit_id_fk";
const serviceStatusKey: keyof Service = "serv_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  unitData: Unit[] | undefined;
}

const TableColumnsService = ({
  handleClickDelete,
  onRefetchRegister,
  unitData,
}: TableColumnProps) => [
  {
    title: "Nombre del servicio",
    dataIndex: serviceNameKey,
    key: serviceNameKey,
    ellipsis: true,
    width: 300,
    searchable: true,
    sorter: (a: Service, b: Service) => a.serv_name.length - b.serv_name.length,
  },
  {
    title: "Descripción",
    dataIndex: serviceDescriptionKey,
    key: serviceDescriptionKey,
    ellipsis: true,
    width: 210,
    searchable: true,
    sorter: (a: Service, b: Service) => {
      const aValue = a.serv_description || "";
      const bValue = b.serv_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Unidad",
    dataIndex: unitKey,
    key: unitKey,
    ellipsis: true,
    width: 300,
    filters:
      unitData?.map((type) => ({
        value: type.unit_name,
        text: type.unit_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.serv_unit_id_fk) === String(value);
    },
    render: (type: any) => type,
  },
  {
    title: "Estado",
    dataIndex: serviceStatusKey,
    key: serviceStatusKey,
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
    render: (_: any, record: Service) => (
      <Space size={"small"}>
        <EditServiceButtonComponent
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

export default TableColumnsService;
