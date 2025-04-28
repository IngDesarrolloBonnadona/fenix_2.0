import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import EditResearchInstrumentButtonComponent from "../buttons/EditResearchInstrumentButton";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";

const researchInstrumentNameKey: keyof ResearchInstrument = "inst_r_name";
const researchInstrumentDescriptionKey: keyof ResearchInstrument =
  "inst_r_description";
const researchInstrumentStatusKey: keyof ResearchInstrument = "inst_r_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsResearchInstrument = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Nombre del instrumento",
    dataIndex: researchInstrumentNameKey,
    key: researchInstrumentNameKey,
    ellipsis: true,
    width: 500,
    searchable: true,
    sorter: (a: ResearchInstrument, b: ResearchInstrument) =>
      a.inst_r_name.length - b.inst_r_name.length,
  },
  {
    title: "Descripción",
    dataIndex: researchInstrumentDescriptionKey,
    key: researchInstrumentDescriptionKey,
    ellipsis: true,
    width: 310,
    searchable: true,
    sorter: (a: ResearchInstrument, b: ResearchInstrument) => {
      const aValue = a.inst_r_description || "";
      const bValue = b.inst_r_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: researchInstrumentStatusKey,
    key: researchInstrumentStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: ResearchInstrument) => (
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
        <EditResearchInstrumentButtonComponent
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
export default TableColumnsResearchInstrument;
