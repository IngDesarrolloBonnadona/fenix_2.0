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

import { useUpdateMovementReportMutation } from "@/redux/apis/movement_report/movementReportApi";

const EditMovementReportButtonComponent: React.FC<{
  dataRecord: MovementReport;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [timeLocalState, setTimeLocalState] = useState("");

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [updateMovementReport, { isLoading: updateMovementReportDataLoading }] =
    useUpdateMovementReportMutation();

  useEffect(() => {
    if (isModalOpenLocalState) {
      setNameLocalState(dataRecord.mov_r_name);
      setDescriptionLocalState(dataRecord.mov_r_description);
      setTimeLocalState(dataRecord.mov_r_time.toString());
    }
  }, [isModalOpenLocalState, dataRecord]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataDescription: string;
      dataTime: string;
    },
    currentData: { dataName: string; dataDescription: string; dataTime: string }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription ||
      initialData.dataTime !== currentData.dataTime
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: dataRecord.mov_r_name,
      dataDescription: dataRecord.mov_r_description,
      dataTime: dataRecord.mov_r_time.toString(),
    };

    const currentData = {
      dataName: nameLocalState,
      dataDescription: descriptionLocalState,
      dataTime: timeLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateMovementReport({
        id: dataRecord.id,
        updateMovementReport: {
          mov_r_name: nameLocalState,
          mov_r_description: descriptionLocalState,
          mov_r_time: Number(timeLocalState),
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
        onRefectRegister();
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
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
        key={"custom-modal-edit-movement-report"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-movement-report-form"
              name="edit-movement-report-form"
              className="edit-movement-report-form"
              initialValues={{
                "name-movement-report": dataRecord.mov_r_name,
                "time-movement-meport": dataRecord.mov_r_time,
                "description-movement-report": dataRecord.mov_r_description,
              }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="name-movement-report"
                style={{ marginBottom: "16px" }}
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
                  id="input-name-movement-report"
                  name="input-name-movement-report"
                  className="input-name-movement-report"
                  onChange={(e) =>
                    setNameLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={nameLocalState}
                  style={{ width: "100%", textTransform: "uppercase" }}
                />
              </Form.Item>

              <Form.Item
                label="Tiempo:"
                name="time-movement-meport"
                style={{ marginBottom: "16px" }}
                rules={[
                  {
                    required: true,
                    message: "El tiempo es obligatorio.",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "El tiempo solo debe tener numeros.",
                  },
                ]}
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
              >
                <Input
                  id="input-time-movement-meport"
                  name="input-time-movement-meport"
                  className="input-time-movement-meport"
                  onChange={(e) => setTimeLocalState(e.target.value)}
                  placeholder="1234..."
                  value={timeLocalState}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Descripción:"
                name="description-movement-report"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="textarea-description-movement-report"
                  name="textarea-description-movement-report"
                  className="textarea-description-movement-report"
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
                  classNameCustomButton="edit-movement-report-button"
                  idCustomButton="edit-movement-report-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateMovementReportDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateMovementReportDataLoading
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

export default EditMovementReportButtonComponent;
