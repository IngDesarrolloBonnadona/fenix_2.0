"use client";

import React from "react";
import { Col, Form, Row, Select, Switch } from "antd";
import CustomDatePicker from "@/components/common/custom_date_picker/CustomDatePicker";
import { FaCheck } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";

const ContentGenerateControlEvaluationFormData: React.FC<{
  unitIdLocalStateFormData: number;
  seeGeneralInstitutionalFormData: boolean;
  onChangeInitialDateFormData: (
    date: any,
    dateString: string | string[]
  ) => void;
  onChangeEndDateFormData: (date: any, dateString: string | string[]) => void;
  setUnitIdLocalStateFormData: (value: number) => void;
  setSeeGeneralInstitutionalFormData: (value: boolean) => void;
  allUnitsDataFormData: Unit[] | undefined;
  allUnitsLoadingFormData: boolean;
  allUnitsFetchingFormData: boolean;
}> = ({
  unitIdLocalStateFormData,
  seeGeneralInstitutionalFormData,
  onChangeInitialDateFormData,
  onChangeEndDateFormData,
  setUnitIdLocalStateFormData,
  setSeeGeneralInstitutionalFormData,
  allUnitsDataFormData,
  allUnitsLoadingFormData,
  allUnitsFetchingFormData,
}) => {
  return (
    <div className="content-generate-summary-form-data">
      <Form
        id="generate-summary-form"
        name="generate-summary-form"
        className="generate-summary-form"
        layout="vertical"
        initialValues={{ remember: false }}
        autoComplete="off"
        // onFinish={handleClickSubmit}
      >
        <Row gutter={24}>
          <Col span={5}>
            <Form.Item
              label="Fecha inicial"
              id="initial-date"
              className="initial-date"
              name="initial-date"
              style={{
                width: "100%",
                marginBottom: 0,
              }}
            >
              <CustomDatePicker
                onChangeDateCustomDatePicker={onChangeInitialDateFormData}
              />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item
              label="Fecha final"
              id="end-date"
              className="end-date"
              name="end-date"
              style={{
                width: "100%",
                marginBottom: 0,
              }}
            >
              <CustomDatePicker
                onChangeDateCustomDatePicker={onChangeEndDateFormData}
              />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item
              label="Ver institucional general:"
              id="see-general-institutional"
              className="see-general-institutional"
              name="see-general-institutional"
              style={{
                marginBottom: 0,
              }}
            >
              <Switch
                checked={seeGeneralInstitutionalFormData}
                onChange={(checked) =>
                  setSeeGeneralInstitutionalFormData(checked)
                }
                checkedChildren={<FaCheck />}
                unCheckedChildren={<TfiClose />}
              />
            </Form.Item>
          </Col>

          {!seeGeneralInstitutionalFormData && (
            <Col span={9}>
              <Form.Item
                label="Unidad:"
                id="unit-id"
                className="unit-id"
                name="unit-id"
                style={{
                  marginBottom: 0,
                }}
              >
                <Select
                  placeholder={"Seleccione una opción"}
                  onChange={setUnitIdLocalStateFormData}
                  value={unitIdLocalStateFormData}
                  loading={allUnitsLoadingFormData || allUnitsFetchingFormData}
                  showSearch
                  allowClear
                  filterOption={(input, option) => {
                    return (
                      (option?.children &&
                        option.children
                          .toString()
                          .toUpperCase()
                          .includes(input.toUpperCase())) ||
                      false
                    );
                  }}
                  style={{ width: "100%" }}
                  size="small"
                >
                  {allUnitsDataFormData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.unit_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default ContentGenerateControlEvaluationFormData;
