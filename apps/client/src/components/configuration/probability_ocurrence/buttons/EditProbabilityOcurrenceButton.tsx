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

import { useUpdateProbabilityOcurrenceMutation } from "@/redux/apis/probability_ocurrence/probabilityOcurrenceApi";

const EditProbabilityOcurrenceButtonComponent: React.FC<{
  dataRecord: ProbabilityOcurrence;
  onRefetchRegister: () => void;
}> = ({ dataRecord, onRefetchRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [levelLocalState, setLevelLocalState] = useState(0);

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [
    updateProbabilityOcurrence,
    { isLoading: updateProbabilityOcurrenceLoading },
  ] = useUpdateProbabilityOcurrenceMutation();

  useEffect(() => {
    if (isModalOpenLocalState) {
      setNameLocalState(dataRecord.prob_o_name);
      setDescriptionLocalState(dataRecord.prob_o_description);
      setLevelLocalState(dataRecord.prob_o_level);
    }
  }, [isModalOpenLocalState, dataRecord]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataDescription: string;
      dataLevel: number;
    },
    currentData: {
      dataName: string;
      dataDescription: string;
      dataLevel: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription ||
      initialData.dataLevel !== currentData.dataLevel
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: dataRecord.prob_o_name,
      dataDescription: dataRecord.prob_o_description,
      dataLevel: dataRecord.prob_o_level,
    };

    const currentData = {
      dataName: nameLocalState,
      dataDescription: descriptionLocalState,
      dataLevel: levelLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateProbabilityOcurrence({
        id: dataRecord.id,
        updateProbabilityOcurrence: {
          prob_o_name: nameLocalState,
          prob_o_description: descriptionLocalState,
          prob_o_level: levelLocalState,
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
        setIsModalOpenLocalState(false);
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
        onClickCustomButton={() => setIsModalOpenLocalState(true)}
        titleTooltipCustomButton="Ver"
        shapeCustomButton="circle"
        sizeCustomButton={"small"}
      />

      <CustomModalNoContent
        key={"custom-modal-edit-probability-ocurrence"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-probability-ocurrence-form"
              name="edit-probability-ocurrence-form"
              className="edit-probability-ocurrence-form"
              initialValues={{
                "name-probability-ocurrence": dataRecord.prob_o_name,
                "description-probability-ocurrence":
                  dataRecord.prob_o_description,
                "level-probability-ocurrence": dataRecord.prob_o_level,
              }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="name-probability-ocurrence"
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
                  id="input-name-probability-ocurrence"
                  name="input-name-probability-ocurrence"
                  className="input-name-probability-ocurrence"
                  onChange={(e) =>
                    setNameLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={nameLocalState}
                  style={{ width: "100%", textTransform: "uppercase" }}
                />
              </Form.Item>

              <Form.Item
                label="Descripción:"
                name="description-probability-ocurrence"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="text-area-description-probability-ocurrence"
                  name="text-area-description-probability-ocurrence"
                  className="text-area-description-probability-ocurrence"
                  onChange={(e) =>
                    setDescriptionLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={descriptionLocalState || ""}
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
                  classNameCustomButton="edit-probability-ocurrence-button"
                  idCustomButton="edit-probability-ocurrence-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateProbabilityOcurrenceLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateProbabilityOcurrenceLoading
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

export default EditProbabilityOcurrenceButtonComponent;
