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
  useCreateProtocolMutation,
  useGetAllProtocolsQuery,
} from "@/redux/apis/protocol/protocolApi";

const CreateProtocolButtonComponent: React.FC<{
  onNewRegister: () => void;
}> = ({ onNewRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [options, setOptions] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [createProtocol, { isLoading: createdProtocolDataLoading }] =
    useCreateProtocolMutation({
      fixedCacheKey: "createProtocol",
    });

  const {
    data: allProtocolsData,
    isFetching: allProtocolsFetching,
    isLoading: allProtocolsLoading,
    error: allProtocolsError,
  } = useGetAllProtocolsQuery(null);

  const handleClickClean = () => {
    form.resetFields();
    setNameLocalState("");
    setDescriptionLocalState("");
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions =
        allProtocolsData
          ?.filter((types) =>
            types.prot_name.toUpperCase().includes(value.toUpperCase())
          )
          .map((type) => ({
            value: type.prot_name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createProtocol({
        prot_name: nameLocalState,
        prot_description: descriptionLocalState,
      });

      if (response.data.status === 201) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        handleClickClean();
        setIsModalOpen(false);
        onNewRegister();
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
        key={"custom-modal-create-protocol"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="create-protocol-form"
              name="create-protocol-form"
              className="create-protocol-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="protocol-name"
                style={{
                  marginBottom: "16px",
                }}
                normalize={(value) => {
                  if (!value) return "";

                  const filteredValue = value
                    .toUpperCase()
                    .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

                  return filteredValue;
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
              >
                <AutoComplete
                  id="name-protocol"
                  options={options}
                  style={{ width: "100%", textAlign: "start" }}
                  onSearch={handleSearch}
                  placeholder="Escribe..."
                  value={nameLocalState}
                  onChange={(value) => setNameLocalState(value.toUpperCase())}
                  filterOption={false}
                >
                  <Input
                    id="input-name-protocol"
                    type="text"
                    autoComplete="off"
                  />
                </AutoComplete>
              </Form.Item>

              <Form.Item
                label="Descripción:"
                name="protocol-description"
                style={{ marginBottom: "16px" }}
                normalize={(value) => {
                  if (!value) return "";

                  const filteredValue = value
                    .toUpperCase()
                    .replace(/[^A-ZÁÉÍÓÚÑ0-9,.:;s"\s]/g, "");

                  return filteredValue;
                }}
              >
                <TextArea
                  id="textarea-description-protocol"
                  name="textarea-description-protocol"
                  className="textarea-description-protocol"
                  onChange={(e) =>
                    setDescriptionLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={descriptionLocalState}
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
                  classNameCustomButton="clean-protocol-button"
                  idCustomButton="clean-protocol-button"
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
                  classNameCustomButton="create-protocol-button"
                  idCustomButton="create-protocol-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdProtocolDataLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    !createdProtocolDataLoading ? false : true
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

export default CreateProtocolButtonComponent;
