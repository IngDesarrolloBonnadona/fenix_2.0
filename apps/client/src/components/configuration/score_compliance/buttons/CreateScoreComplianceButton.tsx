"use client";

import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import {
  PlusOutlined,
  ClearOutlined,
  SaveOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { AutoComplete, Form, Input } from "antd";

import {
  useCreateScoreComplianceControlMutation,
  useGetAllScoreComplianceControlQuery,
} from "@/redux/apis/score_compliance_control/scoreComplianceControlApi";

const CreateScoreComplianceButtonComponent: React.FC<{
  onNewRegister: () => void;
}> = ({ onNewRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [percentageLocalState, setPercentageLocalState] = useState(0);
  const [options, setOptions] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [
    createScoreComplianceControl,
    { isLoading: createdScoreComplianceControlLoading },
  ] = useCreateScoreComplianceControlMutation({
    fixedCacheKey: "createScoreComplianceControl",
  });

  const {
    data: allScoreComplianceControlData,
    isFetching: allScoreComplianceControlFetching,
    isLoading: allScoreComplianceControlLoading,
    error: allScoreComplianceControlError,
  } = useGetAllScoreComplianceControlQuery(null);

  const handleClickClean = () => {
    form.resetFields();
    setNameLocalState("");
    setPercentageLocalState(0);
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions =
        allScoreComplianceControlData
          ?.filter((types) => types.sco_name.includes(value))
          .map((type) => ({
            value: type.sco_name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createScoreComplianceControl({
        sco_name: nameLocalState,
        sco_percentage: percentageLocalState,
      });

      let dataError = response.error;
      let validationData = response.data?.message;
      let responseData = response.data;

      if (dataError || !responseData) {
        const errorMessage = dataError?.data.message;
        const validationDataMessage = validationData;

        if (Array.isArray(errorMessage)) {
          dispatch(
            setShowMessage({
              type: "error",
              content: errorMessage[0],
            })
          );
        } else if (typeof errorMessage === "string") {
          dispatch(
            setShowMessage({
              type: "error",
              content: errorMessage,
            })
          );
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(
            setShowMessage({
              type: "error",
              content: validationDataMessage[0],
            })
          );
        } else if (typeof validationDataMessage === "string") {
          dispatch(
            setShowMessage({
              type: "error",
              content: validationDataMessage,
            })
          );
        }
      }

      if (responseData && !dataError) {
        dispatch(
          setShowMessage({
            type: "success",
            content: responseData.message,
          })
        );
        handleClickClean();
        setIsModalOpen(false);
        onNewRegister();
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      dispatch(
        setShowMessage({
          type: "error",
          content: "ERROR INTERNO",
        })
      );
    }
  };

  return (
    <>
      <CustomButton
        classNameCustomButton="open-modal-button"
        idCustomButton="open-modal-button"
        titleCustomButton="Nuevo"
        typeCustomButton="primary"
        htmlTypeCustomButton="button"
        iconCustomButton={<PlusOutlined />}
        onClickCustomButton={() => setIsModalOpen(true)}
        styleCustomButton={{
          marginLeft: "16px",
          background: "#f28322",
          color: "#ffffff",
          borderRadius: "16px",
        }}
        iconPositionCustomButton={"end"}
        sizeCustomButton={"small"}
      />

      <CustomModalNoContent
        key={"custom-modal-create-score-compliance"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="create-score-compliance-form"
              name="create-score-compliance-form"
              className="create-score-compliance-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="score-compliance-name"
                style={{
                  marginBottom: "16px",
                }}
                rules={[
                  {
                    required: true,
                    message: "El nombre es obligatorio.",
                  },
                ]}
              >
                <AutoComplete
                  id="name-score-compliance"
                  options={options}
                  style={{ width: "100%", textAlign: "start" }}
                  onSearch={handleSearch}
                  placeholder="Escribe..."
                  value={nameLocalState}
                  onChange={(value) => setNameLocalState(value)}
                  filterOption={false}
                >
                  <Input
                    id="input-name-score-compliance"
                    type="text"
                    autoComplete="off"
                  />
                </AutoComplete>
              </Form.Item>

              <Form.Item
                label="Porcentaje:"
                name="score-compliance-level"
                style={{
                  marginBottom: "16px",
                }}
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
                rules={[
                  {
                    required: true,
                    message: "El porcentaje es obligatorio.",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message:
                      "El porcentaje no puede tener letras ni caracteres especiales.",
                  },
                ]}
              >
                <Input
                  id="input-level-score-compliance"
                  name="input-level-score-compliance"
                  className="input-level-score-compliance"
                  onChange={(e) =>
                    setPercentageLocalState(Number(e.target.value))
                  }
                  placeholder="Escribe..."
                  value={percentageLocalState}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                style={{
                  textAlign: "center",
                  marginTop: "16px",
                  marginBottom: 0,
                }}
              >
                <CustomButton
                  classNameCustomButton="clean-score-compliance-button"
                  idCustomButton="clean-score-compliance-button"
                  titleCustomButton="Limpiar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="button"
                  iconCustomButton={<ClearOutlined />}
                  onClickCustomButton={handleClickClean}
                  styleCustomButton={{
                    color: "#ffffff",
                    background: "#DC1600",
                    marginRight: "16px",
                    borderRadius: "16px",
                  }}
                  iconPositionCustomButton={"end"}
                  sizeCustomButton={"small"}
                />
                <CustomButton
                  classNameCustomButton="create-score-compliance-button"
                  idCustomButton="create-score-compliance-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdScoreComplianceControlLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    !createdScoreComplianceControlLoading ? false : true
                  }
                  onClickCustomButton={() => ({})}
                  styleCustomButton={{
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                  iconPositionCustomButton={"end"}
                  sizeCustomButton={"small"}
                />
              </Form.Item>
            </Form>
          </>
        }
      />
    </>
  );
};

export default CreateScoreComplianceButtonComponent;
