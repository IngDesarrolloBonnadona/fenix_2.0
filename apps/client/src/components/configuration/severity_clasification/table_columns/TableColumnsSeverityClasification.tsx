import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { Button, Flex, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditSeverityClasificationButtonComponent from "../buttons/EditSeverityClasificationButton";

const severityClasificationNameKey: keyof SeverityClasification = "sev_c_name";
const severityClasificationDescriptionKey: keyof SeverityClasification =
  "sev_c_description";
const severityClasificationStatusKey: keyof SeverityClasification =
  "sev_c_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsSeverityClasification = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre de la clasificación de severidad",
    dataIndex: severityClasificationNameKey,
    key: severityClasificationNameKey,
    ellipsis: true,
    width: 350,
    searchable: true,
    sorter: (a: SeverityClasification, b: SeverityClasification) =>
      a.sev_c_name.length - b.sev_c_name.length,
  },
  {
    title: "Descripción",
    dataIndex: severityClasificationDescriptionKey,
    key: severityClasificationDescriptionKey,
    ellipsis: true,
    width: 460,
    searchable: true,
    sorter: (a: SeverityClasification, b: SeverityClasification) => {
      const aValue = a.sev_c_description || "";
      const bValue = b.sev_c_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: severityClasificationStatusKey,
    key: severityClasificationStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: SeverityClasification) => (
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
    render: (_: any, record: SeverityClasification) => (
      <Space size={"small"}>
        <EditSeverityClasificationButtonComponent
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

export default TableColumnsSeverityClasification;
