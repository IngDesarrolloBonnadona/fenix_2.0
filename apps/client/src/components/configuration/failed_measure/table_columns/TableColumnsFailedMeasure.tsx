import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditFailedMeasureButtonComponent from "../buttons/EditFailedMeasureButton";

const failedMeasureNameKey: keyof FailedMeasure = "meas_f_name";
const failedMeasureDescriptionKey: keyof FailedMeasure = "meas_f_description";
const failedMeasureStatusKey: keyof FailedMeasure = "meas_f_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsFailedMeasure = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre de la medida fallida",
    dataIndex: failedMeasureNameKey,
    key: failedMeasureNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: FailedMeasure, b: FailedMeasure) =>
      a.meas_f_name.length - b.meas_f_name.length,
  },
  {
    title: "Descripción",
    dataIndex: failedMeasureDescriptionKey,
    key: failedMeasureDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: FailedMeasure, b: FailedMeasure) => {
      const aValue = a.meas_f_description || "";
      const bValue = b.meas_f_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: failedMeasureStatusKey,
    key: failedMeasureStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: FailedMeasure) => (
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
        <EditFailedMeasureButtonComponent
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

export default TableColumnsFailedMeasure;
