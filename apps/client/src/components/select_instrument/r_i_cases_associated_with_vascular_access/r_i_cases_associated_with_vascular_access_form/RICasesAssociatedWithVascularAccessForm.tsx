"use client";

import React from "react";
import { titleStyleCss } from "@/theme/text_styles";

import {
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { MdOutlineDescription } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { LoadingOutlined } from "@ant-design/icons";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomFloatButton from "@/components/common/custom_float_button/CustomFloatButton";

import { Store } from "antd/es/form/interface";

const RICasesAssociatedWithVascularAccessForm: React.FC<{
  initialValuesFormData: Store | undefined;
  deviceTypeCategoryFormData: ResearchCategory | undefined;
  damageTypeCategoryFormData: ResearchCategory | undefined;
  fluidTypeCategoryFormData: ResearchCategory | undefined;
  influencyFactorCategoryFormData: ResearchCategory | undefined;
  failedMeasureCategoryFormData: ResearchCategory | undefined;
  riskFactorCategoryFormData: ResearchCategory | undefined;
  safetyBarrierCategoryFormData: ResearchCategory | undefined;
  allResearchCategoryByInstrumentIdFetchingFormData: boolean;
  allResearchCategoryByInstrumentIdLoadingFormData: boolean;
  deviceTypeIdLocalStateFormData: number | null;
  damageTypeIdLocalStateFormData: number | null;
  fluidTypeIdLocalStateFormData: number | null;
  influencyFactorIdLocalStateFormData: number[] | [];
  failedMeasureIdLocalStateFormData: number[] | [];
  riskFactorIdLocalStateFormData: number | null;
  safetyBarrierIdLocalStateFormData: number | null;
  whasThereFailureLocalStateFormData: boolean | null;
  whasThereDamageLocalStateFormData: boolean | null;
  consideredPhlebitisGeneratingFluidLocalStateFormData: boolean | null;
  whasInfusionTimeAdequateLocalStateFormData: boolean | null;
  whasDilutionAdequateLocalStateFormData: boolean | null;
  hasCareFailuresLocalStateFormData: boolean | null;
  hasIncorrectActionsLocalStateFormData: boolean | null;
  hasUnsafeActionsLocalStateFormData: boolean | null;
  isCasePrevetableLocalStateFormData: boolean | null;
  clinicalContextOfCaseLocalStateFormData: string;
  phFluidLocalStateFormData: number | null;
  describeInfusionTimeLocalStateFormData: string;
  describeDilutionFluidLocalStateFormData: string;
  techniqueUsedVenipunctureLocalStateFormData: string;
  additionalFindingsLocalStateFormData: string;
  conclusionsLocalStateFormData: string;
  descriptionDeviceTypeOthersLocalStateFormata: string;
  descriptionDamageTypeOthersLocalStateFormata: string;
  descriptionFluidTypeOthersLocalStateFormata: string;
  descriptionFluidTypeNameLocalStateFormata: string;
  descriptionInfluencyFactorOthersLocalStateFormata: string;
  descriptionFailedMeasureOthersLocalStateFormata: string;
  descriptionRiskFactorOthersLocalStateFormata: string;
  setDescriptionDeviceTypeOthersLocalStateFormData: (e: any) => void;
  setDescriptionDamageTypeOthersLocalStateFormData: (e: any) => void;
  setDescriptionFluidTypeOthersLocalStateFormData: (e: any) => void;
  setDescriptionFluidTypeNameLocalStateFormData: (e: any) => void;
  setDescriptionInfluencyFactorOthersLocalStateFormData: (e: any) => void;
  setDescriptionFailedMeasureOthersLocalStateFormData: (e: any) => void;
  setDescriptionRiskFactorOthersLocalStateFormData: (e: any) => void;
  setWhasThereFailureLocalStateFormData: (e: any) => void;
  setWhasThereDamageLocalStateFormData: (e: any) => void;
  setConsideredPhlebitisGeneratingFluidLocalStateFormData: (e: any) => void;
  setWhasInfusionTimeAdequateLocalStateFormData: (e: any) => void;
  setWhasDilutionAdequateLocalStateFormData: (e: any) => void;
  setHasCareFailuresLocalStateFormData: (e: any) => void;
  setHasIncorrectActionsLocalStateFormData: (e: any) => void;
  setHasUnsafeActionsLocalStateFormData: (e: any) => void;
  setIsCasePrevetableLocalStateFormData: (e: any) => void;
  setClinicalContextOfCaseLocalStateFormData: (e: any) => void;
  setPhFluidLocalStateFormData: (e: any) => void;
  setDescribeInfusionTimeLocalStateFormData: (e: any) => void;
  setDescribeDilutionFluidLocalStateFormData: (e: any) => void;
  setTechniqueUsedVenipunctureLocalStateFormData: (e: any) => void;
  setAdditionalFindingsLocalStateFormData: (e: any) => void;
  setConclusionsLocalStateFormData: (e: any) => void;
  showDescriptionDeviceTypeOthersLocalStateFormData: boolean;
  showDescriptionDamageTypeOthersLocalStateFormData: boolean;
  showDescriptionFluidTypeOthersLocalStateFormData: boolean;
  showDescriptionFluidTypeNameLocalStateFormData: boolean;
  showDescriptionInfluencyFactorOthersLocalStateFormData: boolean;
  showDescriptionFailedMeasureOthersLocalStateFormData: boolean;
  showDescriptionRiskFactorOthersLocalStateFormData: boolean;
  isSubmitingSaveDataFormData: boolean;
  handleChangeDeviceTypeFormData: (e: any) => void;
  handleChangeDamageTypeFormData: (e: any) => void;
  handleChangeFluidTypeFormData: (e: any) => void;
  handleChangeInfluencyFactorFormData: (e: any) => void;
  handleChangeFailedMeasureFormData: (e: any) => void;
  handleChangeRiskFactorFormData: (e: any) => void;
  handleChangeSafetyBarrierFormData: (e: any) => void;
  handleConfirmSaveDataformData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
}> = ({
  initialValuesFormData,
  deviceTypeCategoryFormData,
  damageTypeCategoryFormData,
  fluidTypeCategoryFormData,
  influencyFactorCategoryFormData,
  failedMeasureCategoryFormData,
  riskFactorCategoryFormData,
  safetyBarrierCategoryFormData,
  allResearchCategoryByInstrumentIdFetchingFormData,
  allResearchCategoryByInstrumentIdLoadingFormData,
  deviceTypeIdLocalStateFormData,
  damageTypeIdLocalStateFormData,
  fluidTypeIdLocalStateFormData,
  influencyFactorIdLocalStateFormData,
  failedMeasureIdLocalStateFormData,
  riskFactorIdLocalStateFormData,
  safetyBarrierIdLocalStateFormData,
  whasThereFailureLocalStateFormData,
  whasThereDamageLocalStateFormData,
  consideredPhlebitisGeneratingFluidLocalStateFormData,
  whasInfusionTimeAdequateLocalStateFormData,
  whasDilutionAdequateLocalStateFormData,
  hasCareFailuresLocalStateFormData,
  hasIncorrectActionsLocalStateFormData,
  hasUnsafeActionsLocalStateFormData,
  isCasePrevetableLocalStateFormData,
  clinicalContextOfCaseLocalStateFormData,
  phFluidLocalStateFormData,
  describeInfusionTimeLocalStateFormData,
  describeDilutionFluidLocalStateFormData,
  techniqueUsedVenipunctureLocalStateFormData,
  additionalFindingsLocalStateFormData,
  conclusionsLocalStateFormData,
  descriptionDeviceTypeOthersLocalStateFormata,
  descriptionDamageTypeOthersLocalStateFormata,
  descriptionFluidTypeOthersLocalStateFormata,
  descriptionFluidTypeNameLocalStateFormata,
  descriptionInfluencyFactorOthersLocalStateFormata,
  descriptionFailedMeasureOthersLocalStateFormata,
  descriptionRiskFactorOthersLocalStateFormata,
  setDescriptionDeviceTypeOthersLocalStateFormData,
  setDescriptionDamageTypeOthersLocalStateFormData,
  setDescriptionFluidTypeOthersLocalStateFormData,
  setDescriptionFluidTypeNameLocalStateFormData,
  setDescriptionInfluencyFactorOthersLocalStateFormData,
  setDescriptionFailedMeasureOthersLocalStateFormData,
  setDescriptionRiskFactorOthersLocalStateFormData,
  setWhasThereFailureLocalStateFormData,
  setWhasThereDamageLocalStateFormData,
  setConsideredPhlebitisGeneratingFluidLocalStateFormData,
  setWhasInfusionTimeAdequateLocalStateFormData,
  setWhasDilutionAdequateLocalStateFormData,
  setHasCareFailuresLocalStateFormData,
  setHasIncorrectActionsLocalStateFormData,
  setHasUnsafeActionsLocalStateFormData,
  setIsCasePrevetableLocalStateFormData,
  setClinicalContextOfCaseLocalStateFormData,
  setPhFluidLocalStateFormData,
  setDescribeInfusionTimeLocalStateFormData,
  setDescribeDilutionFluidLocalStateFormData,
  setTechniqueUsedVenipunctureLocalStateFormData,
  setAdditionalFindingsLocalStateFormData,
  setConclusionsLocalStateFormData,
  showDescriptionDeviceTypeOthersLocalStateFormData,
  showDescriptionDamageTypeOthersLocalStateFormData,
  showDescriptionFluidTypeOthersLocalStateFormData,
  showDescriptionFluidTypeNameLocalStateFormData,
  showDescriptionInfluencyFactorOthersLocalStateFormData,
  showDescriptionFailedMeasureOthersLocalStateFormData,
  showDescriptionRiskFactorOthersLocalStateFormData,
  isSubmitingSaveDataFormData,
  handleChangeDeviceTypeFormData,
  handleChangeDamageTypeFormData,
  handleChangeFluidTypeFormData,
  handleChangeInfluencyFactorFormData,
  handleChangeFailedMeasureFormData,
  handleChangeRiskFactorFormData,
  handleChangeSafetyBarrierFormData,
  handleConfirmSaveDataformData,
}) => {
  const { Title } = Typography;

  return (
    <>
      {allResearchCategoryByInstrumentIdLoadingFormData ||
      allResearchCategoryByInstrumentIdFetchingFormData ? (
        <CustomSpin />
      ) : (
        <Form
          id="research-instrument-associated-with-vascular-access-form"
          name="research-instrument-associated-with-vascular-access-form"
          className="research-instrument-associated-with-vascular-access-form"
          onFinish={handleConfirmSaveDataformData}
          initialValues={initialValuesFormData}
          autoComplete="false"
          layout="vertical"
          style={{
            width: "100%",
            // paddingBlock: "13px",
            // paddingInline: "22px",
          }}
        >
          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Title
              level={5}
              style={{
                ...titleStyleCss,
                color: "#f28322",
                // marginTop: "10px",
              }}
            >
              Caso presentado
            </Title>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  id="whas-there-a-failure-radio"
                  className="whas-there-a-failure-radio"
                  name="whas-there-a-failure-radio"
                  label="Hubo falla"
                  style={{ marginBottom: 0 }}
                >
                  <Space>
                    <Radio.Group
                      onChange={setWhasThereFailureLocalStateFormData}
                      value={whasThereFailureLocalStateFormData}
                    >
                      <Radio value={true}>Si</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Space>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  id="damage-radio"
                  className="damage-radio"
                  name="damage-radio"
                  label="Daño"
                  style={{ marginBottom: 0 }}
                >
                  <Space>
                    <Radio.Group
                      onChange={setWhasThereDamageLocalStateFormData}
                      value={whasThereDamageLocalStateFormData}
                    >
                      <Radio value={true}>Si</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Row gutter={24}>
              <Col span={24}>
                <div className="clinical-context-of-case-title">
                  <Title
                    level={5}
                    style={{
                      ...titleStyleCss,
                      color: "#f28322",
                      marginBottom: "10px",
                      // marginTop: "10px",
                    }}
                  >
                    Realice un breve contexto clínico el caso a analizar y
                    finalice con la descripción del reporte
                  </Title>
                </div>

                <Form.Item
                  id="clinical-context-of-case"
                  className="clinical-context-of-case"
                  name="clinical-context-of-case"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                  normalize={(value) => {
                    if (!value) return "";

                    const filteredValue = value
                      .toUpperCase()
                      .replace(/[^A-ZÁÉÍÓÚÑ0-9\s]/g, "");

                    return filteredValue;
                  }}
                >
                  <TextArea
                    rows={4}
                    id="clinical-context-text-area"
                    value={clinicalContextOfCaseLocalStateFormData}
                    onChange={setClinicalContextOfCaseLocalStateFormData}
                    placeholder="Escribe..."
                    autoComplete="off"
                    maxLength={200}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Row gutter={24}>
              <Col span={12}>
                <Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#f28322",
                    marginBottom: "10px",
                    // marginTop: "10px",
                  }}
                >
                  Tipo de dispositivo
                </Title>

                <Form.Item
                  id="device-type-radio"
                  className="device-type-radio"
                  name="device-type-radio"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group
                    style={{ width: "100%" }}
                    onChange={handleChangeDeviceTypeFormData}
                    value={deviceTypeIdLocalStateFormData}
                  >
                    <Row style={{ display: "flex" }} gutter={24}>
                      {deviceTypeCategoryFormData?.optionResearchCategory.map(
                        (item) => (
                          <Col
                            key={item.id}
                            span={12}
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "start",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Radio
                              key={item.id}
                              value={item.id}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                paddingBlock: "2px",
                              }}
                            >
                              {item.cat_o_name}
                            </Radio>
                          </Col>
                        )
                      )}
                    </Row>
                  </Radio.Group>
                </Form.Item>

                {showDescriptionDeviceTypeOthersLocalStateFormData && (
                  <Form.Item
                    id="description-others-device-type"
                    className="description-others-device-type"
                    name="description-others-device-type"
                    normalize={(value) => {
                      if (!value) return "";

                      const filteredValue = value
                        .toUpperCase()
                        .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                      return filteredValue;
                    }}
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor ingresa la descripción!",
                      },
                    ]}
                    style={{ marginTop: 0, marginBottom: 0 }}
                  >
                    <Input
                      onChange={
                        setDescriptionDeviceTypeOthersLocalStateFormData
                      }
                      type="text"
                      value={descriptionDeviceTypeOthersLocalStateFormata}
                      prefix={<MdOutlineDescription />}
                      placeholder="Especifique..."
                      size="small"
                      autoComplete="off"
                    />
                  </Form.Item>
                )}
              </Col>

              <Col span={12}>
                <Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#f28322",
                    marginBottom: "10px",
                    // marginTop: "10px",
                  }}
                >
                  Tipo de daño
                </Title>

                <Form.Item
                  id="damage-type-radio"
                  className="damage-type-radio"
                  name="damage-type-radio"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group
                    style={{ width: "100%" }}
                    onChange={handleChangeDamageTypeFormData}
                    value={damageTypeIdLocalStateFormData}
                  >
                    <Row style={{ display: "flex" }} gutter={24}>
                      {damageTypeCategoryFormData?.optionResearchCategory.map(
                        (item) => (
                          <Col
                            key={item.id}
                            span={12}
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "start",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Radio
                              key={item.id}
                              value={item.id}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                paddingBlock: "2px",
                              }}
                            >
                              {item.cat_o_name}
                            </Radio>
                          </Col>
                        )
                      )}
                    </Row>
                  </Radio.Group>
                </Form.Item>

                {showDescriptionDamageTypeOthersLocalStateFormData && (
                  <Form.Item
                    id="description-others-damage-type"
                    className="description-others-damage-type"
                    name="description-others-damage-type"
                    normalize={(value) => {
                      if (!value) return "";

                      const filteredValue = value
                        .toUpperCase()
                        .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                      return filteredValue;
                    }}
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor ingresa la descripción!",
                      },
                    ]}
                    style={{ marginTop: 0, marginBottom: 0 }}
                  >
                    <Input
                      onChange={
                        setDescriptionDamageTypeOthersLocalStateFormData
                      }
                      type="text"
                      value={descriptionDamageTypeOthersLocalStateFormata}
                      prefix={<MdOutlineDescription />}
                      placeholder="Especifique..."
                      size="small"
                      autoComplete="off"
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Card>

          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Row gutter={24}>
              <Col span={24}>
                <Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#f28322",
                    marginBottom: "10px",
                    // marginTop: "10px",
                  }}
                >
                  ¿Que tipo de fluido se estaba pasando por el dispositivo?
                </Title>

                <Form.Item
                  id="fluid-type-radio"
                  className="fluid-type-radio"
                  name="fluid-type-radio"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group
                    style={{ width: "100%" }}
                    onChange={handleChangeFluidTypeFormData}
                    value={fluidTypeIdLocalStateFormData}
                  >
                    <Row style={{ display: "flex" }} gutter={24}>
                      {fluidTypeCategoryFormData?.optionResearchCategory.map(
                        (item) => (
                          <Col
                            key={item.id}
                            span={12}
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "start",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Radio
                              key={item.id}
                              value={item.id}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                paddingBlock: "2px",
                              }}
                            >
                              {item.cat_o_name}
                            </Radio>
                          </Col>
                        )
                      )}
                    </Row>
                  </Radio.Group>
                </Form.Item>

                {showDescriptionFluidTypeOthersLocalStateFormData && (
                  <Form.Item
                    id="description-others-fluid-type"
                    className="description-others-fluid-type"
                    name="description-others-fluid-type"
                    normalize={(value) => {
                      if (!value) return "";

                      const filteredValue = value
                        .toUpperCase()
                        .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                      return filteredValue;
                    }}
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor ingresa la descripción!",
                      },
                    ]}
                    style={{ width: "50%", marginTop: 0, marginBottom: 0 }}
                  >
                    <Input
                      onChange={setDescriptionFluidTypeOthersLocalStateFormData}
                      type="text"
                      value={descriptionFluidTypeOthersLocalStateFormata}
                      prefix={<MdOutlineDescription />}
                      placeholder="Especifique..."
                      size="small"
                      autoComplete="off"
                    />
                  </Form.Item>
                )}

                {showDescriptionFluidTypeNameLocalStateFormData && (
                  <Form.Item
                    id="description-name-fluid-type"
                    className="description-name-fluid-type"
                    name="description-name-fluid-type"
                    normalize={(value) => {
                      if (!value) return "";

                      const filteredValue = value
                        .toUpperCase()
                        .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                      return filteredValue;
                    }}
                    rules={[
                      {
                        required: true,
                        message:
                          "¡Por favor especifique el nombre del líquido!",
                      },
                    ]}
                    style={{ width: "50%", marginTop: 0, marginBottom: 0 }}
                  >
                    <Input
                      onChange={setDescriptionFluidTypeNameLocalStateFormData}
                      type="text"
                      value={descriptionFluidTypeNameLocalStateFormata}
                      prefix={<MdOutlineDescription />}
                      placeholder="Especifique el nombre del líquido"
                      size="small"
                      autoComplete="off"
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>

            <Row gutter={24} style={{ marginTop: "10px" }}>
              <Col span={8}>
                <Form.Item
                  id="considered-phlebitis-generating-fluid-radio"
                  className="considered-phlebitis-generating-fluid-radio"
                  name="considered-phlebitis-generating-fluid-radio"
                  label="¿Se considera fluido generador de flebitis?"
                >
                  <Space>
                    <Radio.Group
                      onChange={
                        setConsideredPhlebitisGeneratingFluidLocalStateFormData
                      }
                      value={
                        consideredPhlebitisGeneratingFluidLocalStateFormData
                      }
                    >
                      <Radio value={true}>Si</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Space>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  id="ph-of-fluid"
                  className="ph-of-fluid"
                  name="ph-of-fluid"
                  normalize={(value) => {
                    if (!value || typeof value !== "string") return "";

                    return value
                      .replace(/[^0-9.]/g, "")
                      .replace(/^(\d*\.)(.*)\./, "$1$2");
                  }}
                  label="PH del fluido"
                >
                  <Input
                    onChange={setPhFluidLocalStateFormData}
                    value={phFluidLocalStateFormData ?? ""}
                    prefix={<MdOutlineDescription />}
                    placeholder="Escribe..."
                    size="small"
                    autoComplete="off"
                    min={0}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  id="whas-the-infusion-time-adequate-radio"
                  className="whas-the-infusion-time-adequate-radio"
                  name="whas-the-infusion-time-adequate-radio"
                  label="¿El tiempo de infusion fue adecuado?"
                >
                  <Space>
                    <Radio.Group
                      onChange={setWhasInfusionTimeAdequateLocalStateFormData}
                      value={whasInfusionTimeAdequateLocalStateFormData}
                    >
                      <Radio value={true}>Si</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Space>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  id="describe-infusion-time"
                  className="describe-infusion-time"
                  name="describe-infusion-time"
                  normalize={(value) => {
                    if (!value) return "";

                    const filteredValue = value
                      .toUpperCase()
                      .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                    return filteredValue;
                  }}
                  label="Describa el tiempo de infusión"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    onChange={setDescribeInfusionTimeLocalStateFormData}
                    value={describeInfusionTimeLocalStateFormData}
                    prefix={<MdOutlineDescription />}
                    placeholder="Escribe..."
                    size="small"
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  id="whas-the-dilution-adequate-radio"
                  className="whas-the-dilution-adequate-radio"
                  name="whas-the-dilution-adequate-radio"
                  label="¿La dilución fue la adecuada?"
                  style={{ marginBottom: 0 }}
                >
                  <Space>
                    <Radio.Group
                      onChange={setWhasDilutionAdequateLocalStateFormData}
                      value={whasDilutionAdequateLocalStateFormData}
                    >
                      <Radio value={true}>Si</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Space>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  id="describe-dilution-fluid"
                  className="describe-dilution-fluid"
                  name="describe-dilution-fluid"
                  normalize={(value) => {
                    if (!value) return "";

                    const filteredValue = value
                      .toUpperCase()
                      .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                    return filteredValue;
                  }}
                  label="Describa la dilución del fluido"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    onChange={setDescribeDilutionFluidLocalStateFormData}
                    value={describeDilutionFluidLocalStateFormData}
                    prefix={<MdOutlineDescription />}
                    placeholder="Escribe..."
                    size="small"
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Row gutter={24}>
              <Col span={24}>
                <Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#f28322",
                    marginBottom: "10px",
                    // marginTop: "10px",
                  }}
                >
                  Selecciona una o varias opciones de lo que influyó en la
                  presentación del caso
                </Title>

                <Form.Item
                  id="influency-factor-checkbox"
                  className="influency-factor-checkbox"
                  name="influency-factor-checkbox"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox.Group
                    style={{ width: "100%" }}
                    onChange={handleChangeInfluencyFactorFormData}
                    value={influencyFactorIdLocalStateFormData}
                  >
                    <Row style={{ display: "flex" }} gutter={24}>
                      {influencyFactorCategoryFormData?.optionResearchCategory.map(
                        (item) => (
                          <Col
                            key={item.id}
                            span={12}
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "start",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Checkbox
                              key={item.id}
                              value={item.id}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                paddingBlock: "2px",
                              }}
                            >
                              {item.cat_o_name}
                            </Checkbox>
                          </Col>
                        )
                      )}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>

                {showDescriptionInfluencyFactorOthersLocalStateFormData && (
                  <Form.Item
                    id="description-others-influency-factor"
                    className="description-influency-factor"
                    name="description-others-influency-factor"
                    normalize={(value) => {
                      if (!value) return "";

                      const filteredValue = value
                        .toUpperCase()
                        .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                      return filteredValue;
                    }}
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor ingresa la descripción!",
                      },
                    ]}
                    style={{ width: "50%", marginTop: 0, marginBottom: 0 }}
                  >
                    <Input
                      onChange={
                        setDescriptionInfluencyFactorOthersLocalStateFormData
                      }
                      type="text"
                      value={descriptionInfluencyFactorOthersLocalStateFormata}
                      prefix={<MdOutlineDescription />}
                      placeholder="Especifique..."
                      size="small"
                      autoComplete="off"
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Card>

          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Row gutter={24}>
              <Col span={24}>
                <Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#f28322",
                    marginBottom: "10px",
                    // marginTop: "10px",
                  }}
                >
                  ¿Qué medidas físicas y tecnológicas fallaron? Señale varias o
                  una
                </Title>

                <Form.Item
                  id="failed-measures-checkbox"
                  className="failed-measures-checkbox"
                  name="failed-measures-checkbox"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox.Group
                    style={{ width: "100%" }}
                    onChange={handleChangeFailedMeasureFormData}
                    value={failedMeasureIdLocalStateFormData}
                  >
                    <Row style={{ display: "flex" }} gutter={24}>
                      {failedMeasureCategoryFormData?.optionResearchCategory.map(
                        (item) => (
                          <Col
                            key={item.id}
                            span={12}
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "start",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Checkbox
                              key={item.id}
                              value={item.id}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                paddingBlock: "2px",
                              }}
                            >
                              {item.cat_o_name}
                            </Checkbox>
                          </Col>
                        )
                      )}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>

                {showDescriptionFailedMeasureOthersLocalStateFormData && (
                  <Form.Item
                    id="description-others-failed-measures"
                    className="description-failed-measures"
                    name="description-others-failed-measures"
                    normalize={(value) => {
                      if (!value) return "";

                      const filteredValue = value
                        .toUpperCase()
                        .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                      return filteredValue;
                    }}
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor ingresa la descripción!",
                      },
                    ]}
                    style={{ width: "50%", marginTop: 0, marginBottom: 0 }}
                  >
                    <Input
                      onChange={
                        setDescriptionFailedMeasureOthersLocalStateFormData
                      }
                      type="text"
                      value={descriptionFailedMeasureOthersLocalStateFormata}
                      prefix={<MdOutlineDescription />}
                      placeholder="Especifique..."
                      size="small"
                      autoComplete="off"
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Card>

          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Row gutter={24}>
              <Col span={24}>
                <Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#f28322",
                    marginBottom: "10px",
                    // marginTop: "10px",
                  }}
                >
                  ¿Que factores de riesgo tenía el paciente y la familia?
                </Title>

                <Form.Item
                  id="risk-factor-radio"
                  className="risk-factor-radio"
                  name="risk-factor-radio"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group
                    style={{ width: "100%" }}
                    onChange={handleChangeRiskFactorFormData}
                    value={riskFactorIdLocalStateFormData}
                  >
                    <Row style={{ display: "flex" }} gutter={24}>
                      {riskFactorCategoryFormData?.optionResearchCategory.map(
                        (item) => (
                          <Col
                            key={item.id}
                            span={12}
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "start",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Radio
                              key={item.id}
                              value={item.id}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                paddingBlock: "2px",
                              }}
                            >
                              {item.cat_o_name}
                            </Radio>
                          </Col>
                        )
                      )}
                    </Row>
                  </Radio.Group>
                </Form.Item>

                {showDescriptionRiskFactorOthersLocalStateFormData && (
                  <Form.Item
                    id="description-others-risk-factor"
                    className="description-others-risk-factor"
                    name="description-others-risk-factor"
                    normalize={(value) => {
                      if (!value) return "";

                      const filteredValue = value
                        .toUpperCase()
                        .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                      return filteredValue;
                    }}
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor ingresa la descripción!",
                      },
                    ]}
                    style={{ width: "50%", marginTop: 0, marginBottom: 0 }}
                  >
                    <Input
                      onChange={
                        setDescriptionRiskFactorOthersLocalStateFormData
                      }
                      type="text"
                      value={descriptionRiskFactorOthersLocalStateFormata}
                      prefix={<MdOutlineDescription />}
                      placeholder="Especifique..."
                      size="small"
                      autoComplete="off"
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Card>

          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Row gutter={24}>
              <Col span={24}>
                <Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#f28322",
                    marginBottom: "10px",
                    // marginTop: "10px",
                  }}
                >
                  Describa la técnica utilizada en la venopunción
                </Title>

                <Form.Item
                  id="technique-used-venipuncture"
                  className="technique-used-venipuncture"
                  name="technique-used-venipuncture"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                  normalize={(value) => {
                    if (!value) return "";

                    const filteredValue = value
                      .toUpperCase()
                      .replace(/[^A-ZÁÉÍÓÚÑ0-9\s]/g, "");

                    return filteredValue;
                  }}
                >
                  <TextArea
                    rows={4}
                    id="technique-used-venipuncture-text-area"
                    value={techniqueUsedVenipunctureLocalStateFormData}
                    onChange={setTechniqueUsedVenipunctureLocalStateFormData}
                    placeholder="Escribe..."
                    autoComplete="off"
                    maxLength={200}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Row gutter={24}>
              <Col span={24}>
                <Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#f28322",
                    marginBottom: "10px",
                    // marginTop: "10px",
                  }}
                >
                  Describa otros hallazgos evidenciados durante la investigación
                  y entrevista con el personal que no están asociados a lo
                  anterior (factores del recurso humano, ambiente de trabajo,
                  comunicación, guías, protocolos, formación del personal)
                </Title>

                <Form.Item
                  id="additional_findings"
                  className="additional_findings"
                  name="additional_findings"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                  normalize={(value) => {
                    if (!value) return "";

                    const filteredValue = value
                      .toUpperCase()
                      .replace(/[^A-ZÁÉÍÓÚÑ0-9\s]/g, "");

                    return filteredValue;
                  }}
                >
                  <TextArea
                    rows={4}
                    id="additional_findings-text-area"
                    value={additionalFindingsLocalStateFormData}
                    onChange={setAdditionalFindingsLocalStateFormData}
                    placeholder="Escribe..."
                    autoComplete="off"
                    maxLength={200}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Title
              level={5}
              style={{
                ...titleStyleCss,
                color: "#f28322",
                marginBottom: "10px",
                // marginTop: "10px",
              }}
            >
              Valore la posibilidad de prevención del caso analizado
            </Title>

            <Row gutter={24}>
              <Col span={10}>
                <Form.Item
                  id="whas-there-a-failure-radio"
                  className="whas-there-a-failure-radio"
                  name="whas-there-a-failure-radio"
                  label="¿Cree usted que en la atención que se realizó hubo fallas?"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Space>
                    <Radio.Group
                      onChange={setHasCareFailuresLocalStateFormData}
                      value={hasCareFailuresLocalStateFormData}
                    >
                      <Radio value={true}>Si</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Space>
                </Form.Item>
              </Col>

              <Col span={14}>
                <Form.Item
                  id="damage-radio"
                  className="damage-radio"
                  name="damage-radio"
                  label="¿Durante el desenlace del caso se presentaron acciones inseguras?"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Space>
                    <Radio.Group
                      onChange={setHasIncorrectActionsLocalStateFormData}
                      value={hasIncorrectActionsLocalStateFormData}
                    >
                      <Radio value={true}>Si</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Space>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={10}>
                <Form.Item
                  id="whas-there-a-failure-radio"
                  className="whas-there-a-failure-radio"
                  name="whas-there-a-failure-radio"
                  label="¿Hubo actuaciones incorrectas que de no haber sucedido se hubiese evitado el E.A?"
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    marginBottom: 0,
                  }}
                >
                  <Space>
                    <Radio.Group
                      onChange={setHasUnsafeActionsLocalStateFormData}
                      value={hasUnsafeActionsLocalStateFormData}
                    >
                      <Radio value={true}>Si</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Space>
                </Form.Item>
              </Col>

              <Col span={14}>
                <Form.Item
                  id="damage-radio"
                  className="damage-radio"
                  name="damage-radio"
                  label="¿Considera usted que las barreras de seguridad establecidas en la institución para evitar fallos de este tipo son de nivel?"
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    marginBottom: 0,
                  }}
                >
                  <Space>
                    <Radio.Group
                      style={{ width: "100%" }}
                      onChange={handleChangeSafetyBarrierFormData}
                      value={safetyBarrierIdLocalStateFormData}
                    >
                      {safetyBarrierCategoryFormData?.optionResearchCategory.map(
                        (item) => (
                          <Radio key={item.id} value={item.id}>
                            {item.cat_o_name}
                          </Radio>
                        )
                      )}
                    </Radio.Group>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Row gutter={24}>
              <Col span={24}>
                <Title
                  level={5}
                  style={{
                    ...titleStyleCss,
                    color: "#f28322",
                    marginBottom: "10px",
                    // marginTop: "10px",
                  }}
                >
                  Conclusiones
                </Title>

                <Form.Item
                  id="conclusions"
                  className="conclusions"
                  name="conclusions"
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                  normalize={(value) => {
                    if (!value) return "";

                    const filteredValue = value
                      .toUpperCase()
                      .replace(/[^A-ZÁÉÍÓÚÑ0-9\s]/g, "");

                    return filteredValue;
                  }}
                >
                  <TextArea
                    rows={4}
                    id="conclusions-text-area"
                    value={conclusionsLocalStateFormData}
                    onChange={setConclusionsLocalStateFormData}
                    placeholder="Escribe..."
                    autoComplete="off"
                    maxLength={200}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              marginTop: "10px",
            }}
            bordered={false}
            size="small"
          >
            <Title
              level={5}
              style={{
                ...titleStyleCss,
                color: "#f28322",
                // marginTop: "10px",
              }}
            >
              ¿El caso es prevenible?
            </Title>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  id="is-case-prevetable-radio"
                  className="is-case-prevetable-radio"
                  name="is-case-prevetable-radio"
                  style={{ marginBottom: 0 }}
                >
                  <Space>
                    <Radio.Group
                      onChange={setIsCasePrevetableLocalStateFormData}
                      value={isCasePrevetableLocalStateFormData}
                    >
                      <Radio value={true}>Si</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Form.Item>
            <CustomFloatButton
              classNameCustomButton="sumbit-cases-associated-vascular-access-float-button"
              descriptionCustomFloatButton="Guardar"
              iconCustomButton={
                !isSubmitingSaveDataFormData ? (
                  <IoIosSave />
                ) : (
                  <LoadingOutlined />
                )
              }
              shapeCustomButton="square"
              htmlTypeCustomButton="submit"
              typeCustomButton="primary"
              onClickCustomButton={() => ({})}
            />
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default RICasesAssociatedWithVascularAccessForm;
