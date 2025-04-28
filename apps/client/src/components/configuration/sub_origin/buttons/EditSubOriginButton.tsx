import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useGetAllOriginsQuery } from "@/redux/apis/origin/originApi";
import {
  useGetSubOriginByIdQuery,
  useUpdateSubOriginMutation,
} from "@/redux/apis/sub_origin/subOriginApi";

const EditSubOriginButtonComponent: React.FC<{
  dataRecord: SubOrigin;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [originIdLocalState, setOriginIdLocalState] = useState(0);

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [updateSubOrigin, { isLoading: updateSubOriginDataLoading }] =
    useUpdateSubOriginMutation();

  const {
    data: subOriginData,
    isFetching: subOriginDataFetching,
    isLoading: subOriginDataLoading,
    error: subOriginDataError,
    refetch: subOriginDataRefetch,
  } = useGetSubOriginByIdQuery(dataRecord.id);

  const {
    data: allOriginsData,
    isFetching: allOriginsDataFetching,
    isLoading: allOriginsDataLoading,
    error: allOriginsDataError,
    refetch: allOriginsDataRefetch,
  } = useGetAllOriginsQuery(null);

  useEffect(() => {
    if (isModalOpenLocalState && subOriginData) {
      setNameLocalState(subOriginData.sub_o_name);
      setDescriptionLocalState(subOriginData.sub_o_description);
      setOriginIdLocalState(subOriginData.sub_o_origin_id_fk);
    }
  }, [isModalOpenLocalState, subOriginData]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataDescription: string;
      dataOriginId: number;
    },
    currentData: {
      dataName: string;
      dataDescription: string;
      dataOriginId: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription ||
      initialData.dataOriginId !== currentData.dataOriginId
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: subOriginData?.sub_o_name || "",
      dataDescription: subOriginData?.sub_o_description || "",
      dataOriginId: subOriginData?.sub_o_origin_id_fk || 0,
    };

    const currentData = {
      dataName: nameLocalState,
      dataDescription: descriptionLocalState,
      dataOriginId: originIdLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateSubOrigin({
        id: dataRecord.id,
        updateSubOrigin: {
          sub_o_name: nameLocalState,
          sub_o_description: descriptionLocalState,
          sub_o_origin_id_fk: originIdLocalState,
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
        subOriginDataRefetch();
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
        key={"custom-modal-edit-sub-origin"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-sub-origin-form"
              name="edit-sub-origin-form"
              className="edit-sub-origin-form"
              initialValues={{
                "origin-id": subOriginData?.sub_o_origin_id_fk,
                "name-sub-origin": subOriginData?.sub_o_name,
                "description-sub-origin": subOriginData?.sub_o_description,
              }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Origen:"
                name="origin-id"
                rules={[
                  {
                    required: true,
                    message: "¡Por favor seleccione una opción!",
                  },
                ]}
                style={{
                  marginBottom: "16px",
                }}
              >
                <Select
                  id="select-origin-id"
                  className="select-origin-id"
                  showSearch
                  placeholder={"Seleccione origen"}
                  onChange={(value) => setOriginIdLocalState(value)}
                  value={originIdLocalState}
                  loading={allOriginsDataLoading || allOriginsDataFetching}
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
                  {allOriginsData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.orig_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Nombre:"
                name="name-sub-origin"
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
                  id="input-name-sub-origin"
                  name="input-name-sub-origin"
                  className="input-name-sub-origin"
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
                name="description-sub-origin"
                style={{
                  marginBottom: "16px",
                }}
              >
                <TextArea
                  id="textarea-description-sub-origin"
                  name="textarea-description-sub-origin"
                  className="textarea-description-sub-origin"
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
                  classNameCustomButton="edit-sub-origin-button"
                  idCustomButton="edit-sub-origin-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateSubOriginDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateSubOriginDataLoading ? false : true
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

export default EditSubOriginButtonComponent;
