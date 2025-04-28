"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";

import { Divider, Form, Typography } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import { titleStyleCss } from "@/theme/text_styles";
import { renderInstrumentComponent } from "./helpers/render_instrument/render_instrument";

import SelectingInstrumentSelect from "./selecting_instrument_select/SelectingInstrumentSelect";

import { useGetAllResearchInstrumentsQuery } from "@/redux/apis/research_instrument/researchInstrumentApi";

import {
  setDefaultValuesResearchInstrument,
  setIdResearchInstrument,
  setNameResearchInstrument,
} from "@/redux/features/research_instrument/researchInstrumentSlice";
import { setDefaultValuesVascularAccessInstrument } from "@/redux/features/vascular_access_research_instrument/vascularAccessResearchInstrumentSlice";
import { setDefaultValuesClinicalResearch } from "@/redux/features/clinical_research/clinicalResearchSlice";

const SelectInstrumentContent: React.FC = () => {
  const dispatch = useDispatch();

  const { Title } = Typography;

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );
  const researchInstrumentIdState =
    useAppSelector((state) => state.researchInstrument.id) || null;

  const researchInstrumentNameState = useAppSelector(
    (state) => state.researchInstrument.inst_r_name
  );

  const {
    data: allResearchInstrumentData,
    isFetching: allResearchInstrumentFetching,
    isLoading: allResearchInstrumentLoading,
    error: allResearchInstrumentError,
    refetch: allResearchInstrumentRefetch,
  } = useGetAllResearchInstrumentsQuery(null);

  const handleChangeSelectInstrument = (value: number) => {
    dispatch(setDefaultValuesResearchInstrument());
    dispatch(setDefaultValuesClinicalResearch());
    dispatch(setDefaultValuesVascularAccessInstrument());

    const selectedInstrument = allResearchInstrumentData?.find(
      (item: any) => item.id === value
    );
    dispatch(setIdResearchInstrument(value));
    dispatch(setNameResearchInstrument(selectedInstrument?.inst_r_name || ""));
  };

  return (
    <div className="select-instrument">
      <div className="select-instrument-title">
        <Title
          level={5}
          style={{
            ...titleStyleCss,
            color: "#f28322",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          Seleccione el instrumento
        </Title>
      </div>

      <div className="select-instrument-component-select">
        <Form
          id="select-instrument-form"
          name="select-instrument-form"
          className="select-instrument-form"
          initialValues={{
            "select-instrument-select": researchInstrumentIdState,
          }}
          autoComplete="false"
          layout="vertical"
        >
          {allResearchInstrumentLoading || allResearchInstrumentFetching ? (
            <CustomSpin />
          ) : (
            <Form.Item
              name="select-instrument-select"
              style={{ marginBottom: "13px" }}
            >
              <SelectingInstrumentSelect
                allResearchInstrumentData={allResearchInstrumentData}
                handleChangeSelectInstrument={handleChangeSelectInstrument}
                researchInstrumentIdState={researchInstrumentIdState}
              />
            </Form.Item>
          )}
        </Form>
      </div>

      <Divider style={{ marginTop: 0, marginBottom: 0 }} />

      <div className="selected-instrument-component">
        {renderInstrumentComponent(researchInstrumentNameState)}
      </div>
    </div>
  );
};

export default SelectInstrumentContent;
