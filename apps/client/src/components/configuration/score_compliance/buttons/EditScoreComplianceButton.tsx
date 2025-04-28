"use client";

import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input } from "antd";

import { useUpdateScoreComplianceControlMutation } from "@/redux/apis/score_compliance_control/scoreComplianceControlApi";

const EditScoreComplianceButtonComponent: React.FC<{
  dataRecord: ScoreComplianceControl;
  onRefetchRegister: () => void;
}> = ({ dataRecord, onRefetchRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [percentageLocalState, setPercentageLocalState] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [
    updateScoreComplianceControl,
    { isLoading: updateScoreComplianceControlLoading },
  ] = useUpdateScoreComplianceControlMutation();

  useEffect(() => {
    if (isModalOpen) {
      setNameLocalState(dataRecord.sco_name);
      setPercentageLocalState(dataRecord.sco_percentage);
    }
  }, [isModalOpen, dataRecord]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataPercentage: number;
    },
    currentData: {
      dataName: string;
      dataPercentage: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataPercentage !== currentData.dataPercentage
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: dataRecord.sco_name,
      dataPercentage: dataRecord.sco_percentage,
    };

    const currentData = {
      dataName: nameLocalState,
      dataPercentage: percentageLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateScoreComplianceControl({
        id: dataRecord.id,
        updateScoreComplianceControl: {
          sco_name: nameLocalState,
          sco_percentage: percentageLocalState,
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
        key={"custom-modal-edit-score-compliance"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-score-compliance-form"
              name="edit-score-compliance-form"
              className="edit-score-compliance-form"
              initialValues={{
                "name-score-compliance": dataRecord.sco_name,
                "percentage-score-compliance": dataRecord.sco_percentage,
              }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="name-score-compliance"
                style={{
                  marginBottom: "16px",
                }}
                rules={[
                  {
                    required: true,
                    message: "El nombre es obligatorio.",
                  },
                  // {
                  //   pattern: /^[$a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/,
                  //   message:
                  //     "El nombre no puede tener numeros ni caracteres especiales.",
                  // },
                ]}
              >
                <Input
                  id="input-name-score-compliance"
                  name="input-name-score-compliance"
                  className="input-name-score-compliance"
                  onChange={(e) => setNameLocalState(e.target.value)}
                  placeholder="Escribe..."
                  value={nameLocalState}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Porcentaje:"
                name="percentage-score-compliance"
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
                  classNameCustomButton="edit-score-compliance-button"
                  idCustomButton="edit-score-compliance-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateScoreComplianceControlLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateScoreComplianceControlLoading
                      ? false
                      : true
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

export default EditScoreComplianceButtonComponent;
