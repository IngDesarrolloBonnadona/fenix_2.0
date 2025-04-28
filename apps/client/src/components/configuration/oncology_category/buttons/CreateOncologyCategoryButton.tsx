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
  useCreateOncologyCategoryMutation,
  useGetAllOncologyCategoriesQuery,
} from "@/redux/apis/oncology_category/oncologyCategoryApi";

interface ButtonProps {
  onNewRegister: () => void;
}

const CreateOncologyCategoryButtonComponent: React.FC<ButtonProps> = ({
  onNewRegister,
}) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [options, setOptions] = useState<any[]>([]);

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [
    createOncologyCategory,
    { isLoading: createdOncologyCategoryDataLoading },
  ] = useCreateOncologyCategoryMutation({
    fixedCacheKey: "createOncologyCategory",
  });

  const {
    data: allOncologyCategoriesData,
    isFetching: allOncologyCategoriesFetching,
    isLoading: allOncologyCategoriesLoading,
    error: allOncologyCategoriesError,
  } = useGetAllOncologyCategoriesQuery(null);

  const handleClickClean = () => {
    form.resetFields();
    setNameLocalState("");
    setDescriptionLocalState("");
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions =
        allOncologyCategoriesData
          ?.filter((types) =>
            types.onc_c_name.toUpperCase().includes(value.toUpperCase())
          )
          .map((type) => ({
            value: type.onc_c_name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createOncologyCategory({
        onc_c_name: nameLocalState,
        onc_c_description: descriptionLocalState,
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
        setIsModalOpenLocalState(false);
        onNewRegister();
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
        onClickCustomButton={() => setIsModalOpenLocalState(true)}
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
        key={"custom-modal-create-oncology-category"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="create-oncology-category-form"
              name="create-oncology-category-form"
              className="create-oncology-category-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="oncology-category-name"
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
                  id="name-oncology-category"
                  options={options}
                  style={{ width: "100%", textAlign: "start" }}
                  onSearch={handleSearch}
                  placeholder="Escribe..."
                  value={nameLocalState}
                  onChange={(value) => setNameLocalState(value.toUpperCase())}
                  filterOption={false}
                >
                  <Input
                    id="input-name-oncology-category"
                    type="text"
                    autoComplete="off"
                  />
                </AutoComplete>
              </Form.Item>

              <Form.Item
                label="Descripción:"
                name="oncology-category-description"
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
                  id="text-area-description-oncology-category"
                  name="text-area-description-oncology-category"
                  className="text-area-description-oncology-category"
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
                  classNameCustomButton="clean-oncology-category-button"
                  idCustomButton="clean-oncology-category-button"
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
                  classNameCustomButton="create-oncology-category-button"
                  idCustomButton="create-oncology-category-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdOncologyCategoryDataLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    !createdOncologyCategoryDataLoading ? false : true
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

export default CreateOncologyCategoryButtonComponent;
