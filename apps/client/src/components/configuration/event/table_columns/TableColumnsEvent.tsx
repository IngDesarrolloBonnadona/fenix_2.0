import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditEventButtonComponent from "../buttons/EditEventButton";
import { FaCheck } from "react-icons/fa";
import { generateUniqueFilters } from "@/helpers/generate_unique_filters/generate_unique_fliters";

const eventNameKey: keyof Events = "eve_name";
const eventTypeKey: keyof Events = "eve_eventtype_id_fk";
const unitKey: keyof Events = "eve_unit_id_fk";
const oncologyCategoryKey: keyof Events = "eve_oncologycategory_id_fk";
const characterizationCaseKey: keyof Events = "eve_characterizationcase_id_fk";
const riskTypeKey: keyof Events = "eve_risk_type_id";
const medicineassociatedKey: keyof Events = "eve_medicineassociated";
const deviceassociatedKey: keyof Events = "eve_deviceassociated";
const stayKey: keyof Events = "eve_stay";
const mentalHealthKey: keyof Events = "eve_mentalhealth";
const publicHealthKey: keyof Events = "eve_publichealth";
const oncologicalPathologyKey: keyof Events = "eve_oncologicalpathology";
const medicinesKey: keyof Events = "eve_medicines";
const devicesKey: keyof Events = "eve_devices";
const chemotherapyKey: keyof Events = "eve_chemotherapy";
const cerebralKey: keyof Events = "eve_cerebral";
const respiratoryKey: keyof Events = "eve_respiratory";
const cardiovascularKey: keyof Events = "eve_cardiovascular";
const prostateKey: keyof Events = "eve_prostate";
const renalKey: keyof Events = "eve_renal";
const gastrointestinalKey: keyof Events = "eve_gastrointestinal";
const metabolicKey: keyof Events = "eve_metabolic";
const immunologicalKey: keyof Events = "eve_immunological";
const nutritionalKey: keyof Events = "eve_nutritional";
const transfusionalKey: keyof Events = "eve_transfusional";
const changesParaclinicalKey: keyof Events = "eve_changesparaclinical";
const surgeryKey: keyof Events = "eve_surgery";
const proceduresKey: keyof Events = "eve_procedures";
const infectiousKey: keyof Events = "eve_infectious";
const eventStatusKey: keyof Events = "eve_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  eventTypeData: EventType[] | undefined;
  unitData: Unit[] | undefined;
  oncologyCategoryData: OncologyCategory[] | undefined;
  characterizationCaseData: CharacterizationCase[] | undefined;
  riskTypeData: RiskType[] | undefined;
}

const TableColumnsEvent = ({
  handleClickDelete,
  onRefetchRegister,
  eventTypeData,
  unitData,
  oncologyCategoryData,
  characterizationCaseData,
  riskTypeData,
}: TableColumnProps) => [
  {
    title: "Nombre del suceso",
    dataIndex: eventNameKey,
    key: eventNameKey,
    ellipsis: true,
    width: 500,
    searchable: true,
    fixed: "left" as "left",
    sorter: (a: Events, b: Events) => a.eve_name.length - b.eve_name.length,
  },
  {
    title: "Estrategia",
    dataIndex: eventTypeKey,
    key: eventTypeKey,
    width: 300,
    ellipsis: true,
    filters: generateUniqueFilters(eventTypeData, "eve_t_name", "eve_t_name"),
    onFilter: (value: any, record: any) =>
      String(record.eve_eventtype_id_fk) === String(value),
    render: (type: string) => type,
  },
  {
    title: "Asoc. Medicamento",
    key: medicineassociatedKey,
    dataIndex: medicineassociatedKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Asoc. Dispositivo",
    key: deviceassociatedKey,
    dataIndex: deviceassociatedKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Unidad",
    dataIndex: unitKey,
    key: unitKey,
    ellipsis: true,
    width: 200,
    filters:
      unitData?.map((type) => ({
        value: type.unit_name,
        text: type.unit_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_unit_id_fk) === String(value);
    },
    render: (type: any) => type,
  },
  {
    title: "Tipo de riesgo",
    key: riskTypeKey,
    dataIndex: riskTypeKey,
    width: 200,
    filters:
      riskTypeData?.map((type) => ({
        value: type.ris_t_name,
        text: type.ris_t_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_risk_type_id) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Categoría",
    key: oncologyCategoryKey,
    dataIndex: oncologyCategoryKey,
    width: 170,
    filters:
      oncologyCategoryData?.map((type) => ({
        value: type.onc_c_name,
        text: type.onc_c_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_oncologycategory_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Caracterización",
    key: characterizationCaseKey,
    dataIndex: characterizationCaseKey,
    width: 180,
    filters:
      characterizationCaseData?.map((type) => ({
        value: type.cha_c_name,
        text: type.cha_c_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_characterizationcase_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Estancia",
    key: stayKey,
    dataIndex: stayKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Salud mental",
    key: mentalHealthKey,
    dataIndex: mentalHealthKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Salud publica",
    key: publicHealthKey,
    dataIndex: publicHealthKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Patología oncológica",
    key: oncologicalPathologyKey,
    dataIndex: oncologicalPathologyKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Medicamentos",
    key: medicinesKey,
    dataIndex: medicinesKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Dispositivos",
    key: devicesKey,
    dataIndex: devicesKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Quimioterapia",
    key: chemotherapyKey,
    dataIndex: chemotherapyKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Cerebrales",
    key: cerebralKey,
    dataIndex: cerebralKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Respiratorias",
    key: respiratoryKey,
    dataIndex: respiratoryKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Cardiovasculares",
    key: cardiovascularKey,
    dataIndex: cardiovascularKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Prostata",
    key: prostateKey,
    dataIndex: prostateKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Renales",
    key: renalKey,
    dataIndex: renalKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Gastrointestinales",
    key: gastrointestinalKey,
    dataIndex: gastrointestinalKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Metabólicas",
    key: metabolicKey,
    dataIndex: metabolicKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Inmunológicas",
    key: immunologicalKey,
    dataIndex: immunologicalKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Nutricionales",
    key: nutritionalKey,
    dataIndex: nutritionalKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Transfusionales",
    key: transfusionalKey,
    dataIndex: transfusionalKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Alteración en paraclínicos",
    key: changesParaclinicalKey,
    dataIndex: changesParaclinicalKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Cirugía",
    key: surgeryKey,
    dataIndex: surgeryKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Procedimientos",
    key: proceduresKey,
    dataIndex: proceduresKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Infecciosos",
    key: infectiousKey,
    dataIndex: infectiousKey,
    width: 130,
    ellipsis: true,
    render: (type: boolean) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {type ? <FaCheck style={{ color: "green" }} /> : null}
      </div>
    ),
  },
  {
    title: "Estado",
    dataIndex: eventStatusKey,
    key: eventStatusKey,
    ellipsis: true,
    fixed: "right" as "right",
    width: 100,
    render: (item: Events) => (
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
    fixed: "right" as "right",
    ellipsis: true,
    width: 75,
    render: (_: any, record: Events) => (
      <Space size={"small"}>
        <EditEventButtonComponent
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

export default TableColumnsEvent;
