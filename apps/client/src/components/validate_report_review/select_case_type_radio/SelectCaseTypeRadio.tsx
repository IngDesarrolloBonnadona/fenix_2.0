import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { Col, Form, Radio, Row } from "antd";
import React from "react";

const SelectCaseTypeRadio: React.FC<{
  allCaseTypesDataLoading: boolean;
  caseTypeIdLocalState: number;
  handleChangeSelectCaseTypeRadio: (value: number) => void;
  filteredCaseTypes: CaseType[] | undefined;
}> = ({
  allCaseTypesDataLoading,
  caseTypeIdLocalState,
  handleChangeSelectCaseTypeRadio,
  filteredCaseTypes,
}) => {
  return (
    <div>
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        {/* tipos de caso */}
        <Col xs={24} sm={12} md={8} lg={15}>
          <Form.Item
            label="Clasificación de caso"
            id="case-type-id"
            className="case-type-id"
            name="case-type-id"
            style={{ width: "100%", marginBottom: 0, marginTop: 0 }}
          >
            {allCaseTypesDataLoading ? (
              <CustomSpin />
            ) : (
              <Radio.Group
                onChange={(e) =>
                  handleChangeSelectCaseTypeRadio(e.target.value)
                }
                value={caseTypeIdLocalState}
              >
                {Array.isArray(filteredCaseTypes) &&
                  filteredCaseTypes?.map((item: any) => (
                    <Radio key={item.id} value={item.id}>
                      {item.cas_t_name}
                    </Radio>
                  ))}
              </Radio.Group>
            )}
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default SelectCaseTypeRadio;
