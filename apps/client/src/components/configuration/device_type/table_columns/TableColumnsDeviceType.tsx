import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import EditDeviceTypeButtonComponent from "../buttons/EditDeviceTypeButton";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";

const deviceTypeNameKey: keyof DeviceType = "dev_t_name";
const deviceTypeDescriptionKey: keyof DeviceType = "dev_t_description";
const deviceTypeStatusKey: keyof DeviceType = "dev_t_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsDeviceType = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del tipo de dispositivo",
    dataIndex: deviceTypeNameKey,
    key: deviceTypeNameKey,
    width: 400,
    searchable: true,
    sorter: (a: DeviceType, b: DeviceType) =>
      a.dev_t_name.length - b.dev_t_name.length,
  },
  {
    title: "Descripción",
    dataIndex: deviceTypeDescriptionKey,
    key: deviceTypeDescriptionKey,
    width: 410,
    searchable: true,
    sorter: (a: DeviceType, b: DeviceType) => {
      const aValue = a.dev_t_description || "";
      const bValue = b.dev_t_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: deviceTypeStatusKey,
    key: deviceTypeStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: DeviceType) => (
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
    render: (_: any, record: DeviceType) => (
      <Space size={"small"}>
        <EditDeviceTypeButtonComponent
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
export default TableColumnsDeviceType;
