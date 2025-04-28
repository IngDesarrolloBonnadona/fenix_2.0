"use client";

import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useUpdateImpactMutation } from "@/redux/apis/impact/impactApi";

const EditImpactButtonComponent: React.FC<{
  dataRecord: Impact;
  onRefetchRegister: () => void;
}> = ({ dataRecord, onRefetchRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [levelLocalState, setLevelLocalState] = useState(0);
  const [healthImpactLocalState, setHealhtImpactLocalState] = useState("");
  const [businessImpactLocalState, setBusinessImpactLocalState] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [updateImpact, { isLoading: updateImpactLoading }] =
    useUpdateImpactMutation();

  useEffect(() => {
    if (isModalOpen) {
      setNameLocalState(dataRecord.imp_name);
      setLevelLocalState(dataRecord.imp_level);
      setHealhtImpactLocalState(dataRecord.imp_health_impact);
      setBusinessImpactLocalState(dataRecord.imp_business_impact);
    }
  }, [isModalOpen, dataRecord]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataHealth: string;
      dataBusiness: string;
      dataLevel: number;
    },
    currentData: {
      dataName: string;
      dataHealth: string;
      dataBusiness: string;
      dataLevel: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataHealth !== currentData.dataHealth ||
      initialData.dataBusiness !== currentData.dataBusiness ||
      initialData.dataLevel !== currentData.dataLevel
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: dataRecord.imp_name,
      dataHealth: dataRecord.imp_health_impact,
      dataBusiness: dataRecord.imp_business_impact,
      dataLevel: dataRecord.imp_level,
    };

    const currentData = {
      dataName: nameLocalState,
      dataHealth: healthImpactLocalState,
      dataBusiness: businessImpactLocalState,
      dataLevel: levelLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateImpact({
        id: dataRecord.id,
        updateImpact: {
          imp_name: nameLocalState,
          imp_health_impact: healthImpactLocalState,
          imp_business_impact: businessImpactLocalState,
          imp_level: levelLocalState,
        },
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
        setIsModalOpen(false);
        onRefetchRegister();
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
        classNameCustomButton="open-modal-edit-button"
        idCustomButton="open-modal-edit-button"
        typeCustomButton="primary"
        htmlTypeCustomButton="button"
        iconCustomButton={<EditOutlined />}
        onClickCustomButton={() => setIsModalOpen(true)}
        titleTooltipCustomButton="Ver"
        shapeCustomButton="circle"
        sizeCustomButton={"small"}
      />

      <CustomModalNoContent
        key={"custom-modal-edit-impact"}
        widthCustomModalNoContent={"40%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-impact-form"
              name="edit-impact-form"
              className="edit-impact-form"
              initialValues={{
                "name-impact": dataRecord.imp_name,
                "health-evaluation-criteria-impact":
                  dataRecord.imp_health_impact,
                "businnes-evaluation-criteria-impact":
                  dataRecord.imp_business_impact,
              }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="name-impact"
                style={{
                  marginBottom: "16px",
                }}
                rules={[
                  {
                    required: true,
                    message: "El nombre es obligatorio.",
                  },
                  {
                    pattern: /^[$a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/,
                    message:
                      "El nombre no puede tener numeros ni caracteres especiales.",
                  },
                ]}
              >
                <Input
                  id="input-name-impact"
                  name="input-name-impact"
                  className="input-name-impact"
                  onChange={(e) =>
                    setNameLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={nameLocalState}
                  style={{ width: "100%", textTransform: "uppercase" }}
                />
              </Form.Item>

              <Form.Item
                label="Criterio evaluativo en salud:"
                name="health-evaluation-criteria-impact"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="text-area-health-evaluation-criteria-impact"
                  name="text-area-health-evaluation-criteria-impact"
                  className="text-area-health-evaluation-criteria-impact"
                  onChange={(e) =>
                    setHealhtImpactLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={healthImpactLocalState || ""}
                  style={{ width: "100%", textTransform: "uppercase" }}
                />
              </Form.Item>

              <Form.Item
                label="Criterio evaluativo en subsistema de riesgo operacional, en salud financiero y general:"
                name="businnes-evaluation-criteria-impact"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="text-area-businnes-evaluation-criteria-criteria-impact"
                  name="text-area-businnes-evaluation-criteria-impact"
                  className="text-area-businnes-evaluation-criteria-impact"
                  onChange={(e) =>
                    setBusinessImpactLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={businessImpactLocalState || ""}
                  style={{ width: "100%", textTransform: "uppercase" }}
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
                  classNameCustomButton="edit-impact-button"
                  idCustomButton="edit-impact-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateImpactLoading ? <BiEdit /> : <LoadingOutlined />
                  }
                  disabledCustomButton={
                    hasChanges() && !updateImpactLoading ? false : true
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

export default EditImpactButtonComponent;
