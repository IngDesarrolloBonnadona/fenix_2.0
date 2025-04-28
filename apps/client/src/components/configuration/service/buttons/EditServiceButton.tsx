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
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/redux/apis/service/serviceApi";
import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";

const EditServiceButtonComponent: React.FC<{
  dataRecord: Service;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [unitIdLocalState, setUnitIdLocalState] = useState(0);

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [updateService, { isLoading: updateServiceDataLoading }] =
    useUpdateServiceMutation();

  const {
    data: ServiceData,
    isFetching: ServiceDataFetching,
    isLoading: ServiceDataLoading,
    error: ServiceDataError,
    refetch: ServiceDataRefetch,
  } = useGetServiceByIdQuery(dataRecord.id);

  const {
    data: allUnitsData,
    isFetching: allUnitsDataFetching,
    isLoading: allUnitsDataLoading,
    error: allUnitsDataError,
    refetch: allUnitsDataRefetch,
  } = useGetAllUnitsQuery(null);

  useEffect(() => {
    if (isModalOpenLocalState && ServiceData) {
      setNameLocalState(ServiceData.serv_name);
      setDescriptionLocalState(ServiceData.serv_description);
      setUnitIdLocalState(ServiceData.serv_unit_id_fk);
    }
  }, [isModalOpenLocalState, ServiceData]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataDescription: string;
      dataUnitId: number;
    },
    currentData: {
      dataName: string;
      dataDescription: string;
      dataUnitId: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription ||
      initialData.dataUnitId !== currentData.dataUnitId
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: ServiceData?.serv_name || "",
      dataDescription: ServiceData?.serv_description || "",
      dataUnitId: ServiceData?.serv_unit_id_fk || 0,
    };

    const currentData = {
      dataName: nameLocalState,
      dataDescription: descriptionLocalState,
      dataUnitId: unitIdLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateService({
        id: dataRecord.id,
        updateService: {
          serv_name: nameLocalState,
          serv_description: descriptionLocalState,
          serv_unit_id_fk: unitIdLocalState,
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
        ServiceDataRefetch();
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
        key={"custom-modal-edit-service"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpenLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpenLocalState(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-service-form"
              name="edit-service-form"
              className="edit-service-form"
              initialValues={{
                "name-service": dataRecord.serv_name,
                "description-service": dataRecord.serv_description,
                "unit-service-id": dataRecord.serv_unit_id_fk,
              }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Unidad:"
                name="unit-service-id"
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
                  id="select-unit-id"
                  className="select-unit-id"
                  showSearch
                  placeholder={"Seleccione una opción"}
                  onChange={(value) => setUnitIdLocalState(value)}
                  value={unitIdLocalState}
                  loading={allUnitsDataLoading || allUnitsDataFetching}
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
                  {allUnitsData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.unit_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Nombre:"
                id="name-service"
                className="name-service"
                name="name-service"
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
                  id="input-name-service"
                  name="input-name-service"
                  className="input-name-service"
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
                id="description-service"
                className="description-service"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="textarea-description-service"
                  name="textarea-description-service"
                  className="textarea-description-service"
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
                  classNameCustomButton="edit-service-button"
                  idCustomButton="edit-service-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateServiceDataLoading ? <BiEdit /> : <LoadingOutlined />
                  }
                  disabledCustomButton={
                    hasChanges() && !updateServiceDataLoading ? false : true
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

export default EditServiceButtonComponent;
