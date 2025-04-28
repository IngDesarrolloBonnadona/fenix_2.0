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
import TextArea from "antd/es/input/TextArea";
import {
  useCreateImpactMutation,
  useGetAllImpactsQuery,
} from "@/redux/apis/impact/impactApi";

const CreateImpactButtonComponent: React.FC<{
  onNewRegister: () => void;
}> = ({ onNewRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [levelLocalState, setLevelLocalState] = useState(0);
  const [healthImpactLocalState, setHealhtImpactLocalState] = useState("");
  const [businessImpactLocalState, setBusinessImpactLocalState] = useState("");
  const [options, setOptions] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [createImpact, { isLoading: createdImpactLoading }] =
    useCreateImpactMutation({
      fixedCacheKey: "createImpact",
    });

  const {
    data: allImpactsData,
    isFetching: allImpactsFetching,
    isLoading: allImpactsLoading,
    error: allImpactsError,
  } = useGetAllImpactsQuery(null);

  const handleClickClean = () => {
    form.resetFields();
    setNameLocalState("");
    setHealhtImpactLocalState("");
    setBusinessImpactLocalState("");
    setLevelLocalState(0);
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions =
        allImpactsData
          ?.filter((types) =>
            types.imp_name.toUpperCase().includes(value.toUpperCase())
          )
          .map((type) => ({
            value: type.imp_name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createImpact({
        imp_name: nameLocalState,
        imp_level: levelLocalState,
        imp_health_impact: healthImpactLocalState,
        imp_business_impact: businessImpactLocalState,
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
      {" "}
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
        key={"custom-modal-create-impact"}
        widthCustomModalNoContent={"40%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="create-impact-form"
              name="create-impact-form"
              className="create-impact-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nivel:"
                name="impact-level"
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
                    message: "El nivel es obligatorio.",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message:
                      "El nivel no puede tener letras ni caracteres especiales.",
                  },
                ]}
              >
                <Input
                  id="input-level-impact"
                  name="input-level-impact"
                  className="input-level-impact"
                  onChange={(e) => setLevelLocalState(Number(e.target.value))}
                  placeholder="Escribe..."
                  value={levelLocalState}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Nombre:"
                name="impact-name"
                style={{
                  marginBottom: "16px",
                }}
                rules={[
                  {
                    required: true,
                    message: "El nombre es obligatorio.",
                  },
                  {
                    pattern: /^[A-ZÁÉÍÓÚÑ\s]*$/,
                    message:
                      "El nombre solo puede contener letras mayúsculas con tildes y espacios",
                  },
                ]}
                normalize={(value) => {
                  if (!value) return "";

                  const filteredValue = value
                    .toUpperCase()
                    .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                  return filteredValue;
                }}
              >
                <AutoComplete
                  id="name-impact"
                  options={options}
                  style={{ width: "100%", textAlign: "start" }}
                  onSearch={handleSearch}
                  placeholder="Escribe..."
                  value={nameLocalState}
                  onChange={(value) => setNameLocalState(value.toUpperCase())}
                  filterOption={false}
                >
                  <Input
                    id="input-name-impact"
                    type="text"
                    autoComplete="off"
                  />
                </AutoComplete>
              </Form.Item>

              <Form.Item
                label="Criterio evaluativo en salud:"
                name="impact-health-evaluation-criteria"
                style={{ marginBottom: "16px" }}
                normalize={(value) => {
                  if (!value) return "";

                  const filteredValue = value
                    .toUpperCase()
                    .replace(/[^A-ZÁÉÍÓÚÑ0-9<>=%:;()/.,\s]/g, "");

                  return filteredValue;
                }}
              >
                <TextArea
                  id="text-area-health-evaluation-criteria-impact"
                  name="text-area-health-evaluation-criteria-impact"
                  className="text-area-health-evaluation-criteria-impact"
                  onChange={(e) =>
                    setHealhtImpactLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={healthImpactLocalState}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Criterio evaluativo en subsistema de riesgo operacional, en salud financiero y general:"
                name="impact-businnes-evaluation-criteria"
                style={{ marginBottom: "16px" }}
                normalize={(value) => {
                  if (!value) return "";

                  const filteredValue = value
                    .toUpperCase()
                    .replace(/[^A-ZÁÉÍÓÚÑ0-9<>=%:;()/.,\s]/g, "");

                  return filteredValue;
                }}
              >
                <TextArea
                  id="text-area-businnes-evaluation-criteria-impact"
                  name="text-area-businnes-evaluation-criteria-impact"
                  className="text-area-businnes-evaluation-criteria-impact"
                  onChange={(e) =>
                    setBusinessImpactLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={businessImpactLocalState}
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
                  classNameCustomButton="clean-impact-button"
                  idCustomButton="clean-impact-button"
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
                  classNameCustomButton="create-impact-button"
                  idCustomButton="create-impact-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdImpactLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={!createdImpactLoading ? false : true}
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

export default CreateImpactButtonComponent;
