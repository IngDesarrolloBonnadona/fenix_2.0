import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { Button, Flex, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditCharacterizationCaseButtonComponent from "../buttons/EditCharacterizationCaseButton";

const characterizationCaseNameKey: keyof CharacterizationCase = "cha_c_name";
const characterizationCaseDescriptionKey: keyof CharacterizationCase =
  "cha_c_description";
const characterizationCaseStatusKey: keyof CharacterizationCase =
  "cha_c_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsCharacterizationCase = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del caracterización de caso",
    dataIndex: characterizationCaseNameKey,
    key: characterizationCaseNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: CharacterizationCase, b: CharacterizationCase) =>
      a.cha_c_name.length - b.cha_c_name.length,
  },
  {
    title: "Descripción",
    dataIndex: characterizationCaseDescriptionKey,
    key: characterizationCaseDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: CharacterizationCase, b: CharacterizationCase) => {
      const aValue = a.cha_c_description || "";
      const bValue = b.cha_c_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: characterizationCaseStatusKey,
    key: characterizationCaseStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: CharacterizationCase) => (
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
        <EditCharacterizationCaseButtonComponent
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

export default TableColumnsCharacterizationCase;
