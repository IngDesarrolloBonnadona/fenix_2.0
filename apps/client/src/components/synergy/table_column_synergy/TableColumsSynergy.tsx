"use client";

import { Flex, Space } from "antd";

import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";

import CustomButton from "@/components/common/custom_button/CustomButton";
import dayjs from "dayjs";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { StatusResultEnum } from "@/utils/enums/status_result.enum";

const synergyResponsibleKey: keyof Synergy = "syn_analystidnumber";
const synergyEvaluationDateKey: keyof Synergy = "syn_evaluationdate";
const synergyResolutionDateKey: keyof Synergy = "syn_resolutiondate";
const synergyStatusKey: keyof Synergy = "syn_status";
const synergyFillingNumberKey: keyof CaseReportValidate = "val_cr_filingnumber";
const synergyPatientFirstNameKey: keyof CaseReportValidate = `val_cr_firstnamepatient`;
const synergyPatientSecondNameKey: keyof CaseReportValidate = `val_cr_secondnamepatient`;
const synergyPatientfirstLastNameKey: keyof CaseReportValidate = `val_cr_firstlastnamepatient`;
const synergyPatientSecondLastNameKey: keyof CaseReportValidate = `val_cr_secondlastnamepatient`;
const synergyPatientAgeNameKey: keyof CaseReportValidate = `val_cr_agepatient`;

interface TableColumnProps {
  handleClickSeeMore: (record: Synergy) => void;
}

const TableColumnsSynergy = ({
  handleClickSeeMore: handleClickSeeMore,
}: TableColumnProps) => [
  {
    title: "Responsable",
    dataIndex: synergyResponsibleKey,
    key: synergyResponsibleKey,
    width: 100,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "Codigo",
    dataIndex: synergyFillingNumberKey,
    key: synergyFillingNumberKey,
    width: 80,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "Primer nombre paciente",
    dataIndex: synergyPatientFirstNameKey,
    key: synergyPatientFirstNameKey,
    width: 100,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "Segundo nombre paciente",
    dataIndex: synergyPatientSecondNameKey,
    key: synergyPatientSecondNameKey,
    width: 100,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "Primer apellido paciente",
    dataIndex: synergyPatientfirstLastNameKey,
    key: synergyPatientfirstLastNameKey,
    width: 100,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "Segundo apellido paciente",
    dataIndex: synergyPatientSecondLastNameKey,
    key: synergyPatientSecondLastNameKey,
    width: 100,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "Edad paciente",
    dataIndex: synergyPatientAgeNameKey,
    key: synergyPatientAgeNameKey,
    width: 80,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "Fecha de evaluación",
    dataIndex: synergyEvaluationDateKey,
    key: synergyEvaluationDateKey,
    width: 150,
    ellipsis: true,
    searchable: true,
    render: (text: Date) => {
      return text ? dayjs(text).format("YYYY-MM-DD") : "";
    },
  },
  {
    title: "Fecha de resolución",
    dataIndex: synergyResolutionDateKey,
    key: synergyResolutionDateKey,
    width: 150,
    ellipsis: true,
    searchable: true,
    render: (text: Date) => {
      return text ? dayjs(text).format("YYYY-MM-DD") : "";
    },
  },
  {
    title: "Estado",
    dataIndex: synergyStatusKey,
    key: synergyStatusKey,
    fixed: "right" as "right",
    ellipsis: true,
    width: 120,
    render: (item: CaseType) => (
      <Flex justify="center">
        {item ? (
          <CustomTags
            colorCustom="green"
            labelCustom={StatusResultEnum.RESOLVED}
          />
        ) : (
          <CustomTags
            colorCustom="red"
            labelCustom={StatusResultEnum.UNSOLVED}
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
    render: (_: any, record: any) => (
      <Space size="small">
        <CustomButton
          classNameCustomButton="see-more-report-button"
          idCustomButton="see-more-report-button"
          typeCustomButton="primary"
          titleTooltipCustomButton="Detalles"
          iconCustomButton={<EyeOutlined />}
          onClickCustomButton={() => handleClickSeeMore(record)}
          styleCustomButton={{
            background: "#6F42C1",
            color: "#ffffff",
          }}
          shapeCustomButton="circle"
          sizeCustomButton={"small"}
        />
      </Space>
    ),
  },
];

export default TableColumnsSynergy;
