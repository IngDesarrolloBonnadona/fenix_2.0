import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditSafetyBarrierButtonComponent from "../buttons/EditSafetyBarrierButton";

const safetyBarrierNameKey: keyof SafetyBarrier = "saf_b_name";
const safetyBarrierDescriptionKey: keyof SafetyBarrier = "saf_b_description";
const safetyBarrierStatusKey: keyof SafetyBarrier = "saf_b_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsSafetyBarrier = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre de la barrera de seguridad",
    dataIndex: safetyBarrierNameKey,
    key: safetyBarrierNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: SafetyBarrier, b: SafetyBarrier) =>
      a.saf_b_name.length - b.saf_b_name.length,
  },
  {
    title: "Descripción",
    dataIndex: safetyBarrierDescriptionKey,
    key: safetyBarrierDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: SafetyBarrier, b: SafetyBarrier) => {
      const aValue = a.saf_b_description || "";
      const bValue = b.saf_b_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: safetyBarrierStatusKey,
    key: safetyBarrierStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: SafetyBarrier) => (
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
    render: (_: any, record: SafetyBarrier) => (
      <Space size={"small"}>
        <EditSafetyBarrierButtonComponent
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
export default TableColumnsSafetyBarrier;
