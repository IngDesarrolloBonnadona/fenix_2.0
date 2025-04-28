import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import EditFluidTypeButtonComponent from "../buttons/EditFluidTypeButton";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";

const fluidTypeNameKey: keyof FluidType = "flu_t_name";
const fluidTypeDescriptionKey: keyof FluidType = "flu_t_description";
const fluidTypeStatusKey: keyof FluidType = "flu_t_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsFluidType = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del tipo de fluido",
    dataIndex: fluidTypeNameKey,
    key: fluidTypeNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: FluidType, b: FluidType) =>
      a.flu_t_name.length - b.flu_t_name.length,
  },
  {
    title: "Descripción",
    dataIndex: fluidTypeDescriptionKey,
    key: fluidTypeDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: FluidType, b: FluidType) => {
      const aValue = a.flu_t_description || "";
      const bValue = b.flu_t_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: fluidTypeStatusKey,
    key: fluidTypeStatusKey,
    ellipsis: true,
    fixed: "right" as "right",
    width: 100,
    render: (item: FluidType) => (
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
        <EditFluidTypeButtonComponent
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

export default TableColumnsFluidType;
