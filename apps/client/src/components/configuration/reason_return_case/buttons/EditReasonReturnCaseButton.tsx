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
  useGetReasonReturnCaseByIdQuery,
  useUpdateReasonReturnCaseMutation,
} from "@/redux/apis/reason_return_case/reasonReturnCaseApi";
import { useGetAllRolesQuery } from "@/redux/apis/role/roleApi";

const EditReasonReturnCaseButtonComponent: React.FC<{
  dataRecord: ReasonReturnCase;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [roleIdLocalState, setRoleIdLocalState] = useState(0);

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [
    updateReasonReturnCase,
    { isLoading: updateReasonReturnCaseDataLoading },
  ] = useUpdateReasonReturnCaseMutation();

  const {
    data: ReasonReturnCaseData,
    isFetching: ReasonReturnCaseDataFetching,
    isLoading: ReasonReturnCaseDataLoading,
    error: ReasonReturnCaseDataError,
    refetch: ReasonReturnCaseDataRefetch,
  } = useGetReasonReturnCaseByIdQuery(dataRecord.id);

  const {
    data: allRolesData,
    isFetching: allRolesDataFetching,
    isLoading: allRolesDataLoading,
    error: allRolesDataError,
    refetch: allRolesDataRefetch,
  } = useGetAllRolesQuery(null);

  useEffect(() => {
    if (isModalOpenLocalState && ReasonReturnCaseData) {
      setNameLocalState(ReasonReturnCaseData.rec_r_cause);
      setDescriptionLocalState(ReasonReturnCaseData.rec_r_description);
      setRoleIdLocalState(ReasonReturnCaseData.rec_r_role_id_fk);
    }
  }, [isModalOpenLocalState, ReasonReturnCaseData]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataDescription: string;
      dataRoleId: number;
    },
    currentData: {
      dataName: string;
      dataDescription: string;
      dataRoleId: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription ||
      initialData.dataRoleId !== currentData.dataRoleId
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: ReasonReturnCaseData?.rec_r_cause || "",
      dataDescription: ReasonReturnCaseData?.rec_r_description || "",
      dataRoleId: ReasonReturnCaseData?.rec_r_role_id_fk || 0,
    };

    const currentData = {
      dataName: nameLocalState,
      dataDescription: descriptionLocalState,
      dataRoleId: roleIdLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateReasonReturnCase({
        id: dataRecord.id,
        updateReasonReturnCase: {
          rec_r_cause: nameLocalState,
          rec_r_description: descriptionLocalState,
          rec_r_role_id_fk: roleIdLocalState,
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
        ReasonReturnCaseDataRefetch();
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
        key={"custom-modal-edit-reason-return-case"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-reason-return-case-form"
              name="edit-reason-return-case-form"
              className="edit-reason-return-case-form"
              initialValues={{
                "name-reason-return-case": ReasonReturnCaseData?.rec_r_cause,
                "description-reason-return-case":
                  ReasonReturnCaseData?.rec_r_description,
                "role-id": ReasonReturnCaseData?.rec_r_role_id_fk,
              }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Rol:"
                name="role-id"
                rules={[
                  {
                    required: true,
                    message: "¡Por favor seleccione una opción!",
                  },
                ]}
              >
                <Select
                  id="select-role-id"
                  className="select-role-id"
                  showSearch
                  placeholder={"Seleccione una opción"}
                  onChange={(value) => setRoleIdLocalState(value)}
                  value={roleIdLocalState}
                  loading={allRolesDataLoading || allRolesDataFetching}
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
                >
                  {allRolesData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.role_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Nombre:"
                name="name-reason-return-case"
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
                  id="input-name-reason-return-case"
                  name="input-name-reason-return-case"
                  className="input-name-reason-return-case"
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
                id="description-reason-return-case"
                name="description-reason-return-case"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="textarea-description-reason-return-case"
                  name="textarea-description-reason-return-case"
                  className="textarea-description-reason-return-case"
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
                  classNameCustomButton="edit-reason-return-case-button"
                  idCustomButton="edit-reason-return-case-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateReasonReturnCaseDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateReasonReturnCaseDataLoading
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

export default EditReasonReturnCaseButtonComponent;
