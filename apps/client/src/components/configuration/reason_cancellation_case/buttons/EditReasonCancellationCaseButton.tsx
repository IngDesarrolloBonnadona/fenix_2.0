"use client";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import {
  useGetReasonCancellationCaseByIdQuery,
  useUpdateReasonCancellationCaseMutation,
} from "@/redux/apis/reason_cancellation_case/reasonCancellationCaseApi";

const EditReasonCancellationCaseButton: React.FC<{
  dataRecord: ReasonCancellationCase;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [
    updateReasonCancellationCase,
    { isLoading: updateReasonCancellationCaseDataLoading },
  ] = useUpdateReasonCancellationCaseMutation();

  const {
    data: ReasonCancellationCaseData,
    isFetching: ReasonCancellationCaseDataFetching,
    isLoading: ReasonCancellationCaseDataLoading,
    error: ReasonCancellationCaseDataError,
    refetch: ReasonCancellationCaseDataRefetch,
  } = useGetReasonCancellationCaseByIdQuery(dataRecord.id);

  useEffect(() => {
    if (isModalOpenLocalState && ReasonCancellationCaseData) {
      setNameLocalState(ReasonCancellationCaseData.cac_r_cause);
    }
  }, [isModalOpenLocalState, ReasonCancellationCaseData]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
    },
    currentData: {
      dataName: string;
    }
  ): boolean => {
    return initialData.dataName !== currentData.dataName;
  };

  const hasChanges = () => {
    const initialData = {
      dataName: ReasonCancellationCaseData?.cac_r_cause || "",
    };

    const currentData = {
      dataName: nameLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateReasonCancellationCase({
        id: dataRecord.id,
        updateReasonCancellationCase: {
          cac_r_cause: nameLocalState,
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
        ReasonCancellationCaseDataRefetch();
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
        key={"custom-modal-edit-reason-cancellation-case"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-reason-cancellation-case-form"
              name="edit-reason-cancellation-case-form"
              className="edit-reason-cancellation-case-form"
              initialValues={{
                "name-reason-cancellation-case":
                  ReasonCancellationCaseData?.cac_r_cause,
              }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="name-reason-cancellation-case"
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
                  id="input-name-reason-cancellation-case"
                  name="input-name-reason-cancellation-case"
                  className="input-name-reason-cancellation-case"
                  onChange={(e) =>
                    setNameLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={nameLocalState}
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
                  classNameCustomButton="edit-reason-cancellation-case-button"
                  idCustomButton="edit-reason-cancellation-case-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateReasonCancellationCaseDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateReasonCancellationCaseDataLoading
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

export default EditReasonCancellationCaseButton;
