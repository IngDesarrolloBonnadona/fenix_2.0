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

import { useUpdateDeviceTypeMutation } from "@/redux/apis/device_type/deviceTypeApi";

const EditDeviceTypeButtonComponent: React.FC<{
  dataRecord: DeviceType;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [updateDeviceType, { isLoading: updateDeviceTypeDataLoading }] =
    useUpdateDeviceTypeMutation();

  useEffect(() => {
    if (isModalOpen) {
      setNameLocalState(dataRecord.dev_t_name);
      setDescriptionLocalState(dataRecord.dev_t_description);
    }
  }, [isModalOpen, dataRecord]);

  const areDataDifferent = (
    initialData: { dataName: string; dataDescription: string },
    currentData: { dataName: string; dataDescription: string }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: dataRecord.dev_t_name,
      dataDescription: dataRecord.dev_t_description,
    };

    const currentData = {
      dataName: nameLocalState,
      dataDescription: descriptionLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateDeviceType({
        id: dataRecord.id,
        updateDeviceType: {
          dev_t_name: nameLocalState,
          dev_t_description: descriptionLocalState,
        },
      });
      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        setIsModalOpen(false);
        onRefectRegister();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
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
        onClickCustomButton={() => setIsModalOpen(true)}
        titleTooltipCustomButton="Ver"
        shapeCustomButton="circle"
        sizeCustomButton={"small"}
      />

      <CustomModalNoContent
        key={"custom-modal-edit-device-type"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-device-type-form"
              name="edit-device-type-form"
              className="edit-device-type-form"
              initialValues={{
                "name-device-type": dataRecord.dev_t_name,
                "description-device-type": dataRecord.dev_t_description,
              }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="name-device-type"
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
                  id="input-name-device-type"
                  name="input-name-device-type"
                  className="input-name-device-type"
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
                name="description-device-type"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="textarea-description-device-type"
                  name="textarea-description-device-type"
                  className="textarea-description-device-type"
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
                  classNameCustomButton="edit-device-type-button"
                  idCustomButton="edit-device-type-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateDeviceTypeDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateDeviceTypeDataLoading ? false : true
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

export default EditDeviceTypeButtonComponent;
