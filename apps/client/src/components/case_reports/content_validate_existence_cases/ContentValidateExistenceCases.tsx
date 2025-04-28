"use client";

import React, { useState } from "react";

import { Card, Divider, Space } from "antd";

import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";

import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { GrSelect } from "react-icons/gr";

import CustomButton from "../../common/custom_button/CustomButton";

const ContentValidateExistenceCases: React.FC<{
  findSimilarReportData: CaseReportValidate[];
  onConfirm: () => void;
  onCancel?: () => void;
}> = ({ findSimilarReportData, onConfirm, onCancel }) => {
  const [selectedCardValidateStockCase, setSelectedCardValidateStockCase] =
    useState<CaseReportValidate | null>(null);

  return (
    <div
      className="content-modal-validate-existence-cases"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "500px",
      }}
    >
      {/* Icono y Título */}
      <Space
        size="small"
        style={{ textAlign: "left", marginBottom: "15px", width: "100%" }}
      >
        <HiOutlineDocumentMagnifyingGlass color="#015E90" size={25} />
        <h2
          className="title-modal-validate-existence-cases"
          style={{ ...titleStyleCss, textAlign: "left", fontSize: "300" }}
        >
          Validar existencias
        </h2>
      </Space>

      {/* Sección dividida en dos columnas */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "25%",
            padding: "5px",
          }}
        >
          {/* Lista de Cards */}
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              width: "100%",
              // padding: "1px",
              border: "1px #ddd",
            }}
          >
            {Array.isArray(findSimilarReportData) &&
              findSimilarReportData?.map((item: CaseReportValidate) => (
                <Card
                  key={item.id}
                  style={{
                    marginBottom: "5px",
                    width: "100%",
                    textAlign: "left",
                    borderRadius: "16px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedCardValidateStockCase?.id === item.id
                        ? "#94f798"
                        : "#ddd",
                  }}
                  onClick={() => setSelectedCardValidateStockCase(item)}
                >
                  <p>
                    <strong>Fecha ocurrencia:</strong>
                    <span>
                      {""} {item.val_cr_dateofcase}
                    </span>
                  </p>
                  <p>
                    <strong>Número del caso:</strong> {"#"}
                    <span>{item.val_cr_filingnumber}</span>
                  </p>
                  {item.val_cr_documentpatient && (
                    <p>
                      <strong>Cédula del paciente:</strong>{" "}
                      <span>{item.val_cr_documentpatient}</span>
                    </p>
                  )}
                  <p>
                    <strong>Suceso:</strong> <span>{item.event?.eve_name}</span>
                  </p>
                </Card>
              ))}
          </div>
        </div>

        {/* Divider vertical */}
        <Divider type="vertical" style={{ height: "100%" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            padding: "15px",
            border: "1px #ddd",
            textAlign: "left",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {/* Si hay un card seleccionado, mostrar los detalles */}
          {selectedCardValidateStockCase ? (
            <div>
              {selectedCardValidateStockCase.val_cr_associatedpatient && (
                <>
                  <h3 style={{ textAlign: "center" }}>
                    <strong>Datos del paciente</strong>
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "3px",
                    }}
                  >
                    <p>
                      <strong>Tipo de documento:</strong>{" "}
                      <span>
                        {selectedCardValidateStockCase.val_cr_doctypepatient}
                      </span>
                    </p>
                    <p>
                      <strong>Número de documento:</strong>{" "}
                      <span>
                        {selectedCardValidateStockCase.val_cr_documentpatient}
                      </span>
                    </p>
                  </div>
                  <div style={{ marginTop: "3px" }}>
                    <p>
                      <strong>Nombres:</strong>{" "}
                      <span>
                        {selectedCardValidateStockCase.val_cr_firstnamepatient}{" "}
                      </span>
                      <span>
                        {selectedCardValidateStockCase.val_cr_secondnamepatient}{" "}
                      </span>
                      <span>
                        {
                          selectedCardValidateStockCase.val_cr_firstlastnamepatient
                        }{" "}
                      </span>
                      <span>
                        {
                          selectedCardValidateStockCase.val_cr_secondlastnamepatient
                        }{" "}
                      </span>
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "3px",
                    }}
                  >
                    <p>
                      <strong>Edad:</strong>{" "}
                      <span>
                        {selectedCardValidateStockCase.val_cr_agepatient}
                      </span>
                    </p>
                    <p>
                      <strong>Genero:</strong>{" "}
                      <span>
                        {selectedCardValidateStockCase.val_cr_genderpatient}
                      </span>
                    </p>
                    <p>
                      <strong>EPS:</strong>{" "}
                      <span>
                        {selectedCardValidateStockCase.val_cr_epspatient}
                      </span>
                    </p>
                  </div>
                </>
              )}
              <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                Detalles del caso {"#"}
                <span>{selectedCardValidateStockCase.val_cr_filingnumber}</span>
              </h3>
              <p style={{ marginTop: "5px" }}>
                <strong>Fecha ocurrencia:</strong>{" "}
                <span>{selectedCardValidateStockCase.val_cr_dateofcase}</span>
              </p>
              <p style={{ marginTop: "5px" }}>
                <strong>Servicio que reporta:</strong>{" "}
                <span>
                  {selectedCardValidateStockCase.reportingService?.serv_name}
                </span>
              </p>
              <p style={{ marginTop: "5px" }}>
                <strong>Suceso:</strong>{" "}
                <span>{selectedCardValidateStockCase.event?.eve_name}</span>
              </p>
              {selectedCardValidateStockCase.val_cr_descriptionothers && (
                <p style={{ marginTop: "5px" }}>
                  <strong>Descripción otros:</strong>{" "}
                  <span>
                    {selectedCardValidateStockCase.val_cr_descriptionothers}
                  </span>
                </p>
              )}
              <p style={{ marginTop: "5px" }}>
                <strong>Estrategia:</strong>{" "}
                <span>
                  {selectedCardValidateStockCase.eventType?.eve_t_name}
                </span>
              </p>
              <p style={{ marginTop: "5px" }}>
                <strong>Descripción del caso:</strong>{" "}
                <span style={{ display: "block" }}>
                  {selectedCardValidateStockCase.val_cr_description}
                </span>
              </p>
              {selectedCardValidateStockCase.val_cr_inmediateaction && (
                <p style={{ marginTop: "5px" }}>
                  <strong>Acciones inmediatas:</strong>{" "}
                  <span style={{ display: "block" }}>
                    {selectedCardValidateStockCase.val_cr_inmediateaction}
                  </span>
                </p>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                color: "#aaa",
              }}
            >
              <GrSelect size={30} />
              <p>Seleccione un caso para ver los detalles</p>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: "auto" }}>
        {/* Pregunta para enviar el caso */}
        {/* <h4
          className="subtitle-modal-validate-existence-cases"
          style={{ ...subtitleStyleCss, marginBottom: "16px" }}
        >
          ¿Deseas continuar con el caso?
        </h4> */}

        {/* Botones de confirmación */}
        <Space
          direction="horizontal"
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {/* <CustomButton
            classNameCustomButton="negation-button-custom-modal"
            idCustomButton="negation-button-custom-modal"
            titleCustomButton="No"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            onClickCustomButton={onCancel}
            sizeCustomButton={"small"}
            styleCustomButton={{
              backgroundColor: "#6C757D",
              color: "#f2f2f2",
              borderRadius: "16px",
              padding: "3px 17px",
            }}
          /> */}
          <CustomButton
            classNameCustomButton="confirm-button-custom-modal"
            idCustomButton="confirm-button-custom-modal"
            titleCustomButton="Continuar"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            onClickCustomButton={onConfirm}
            sizeCustomButton={"small"}
            styleCustomButton={{
              backgroundColor: "#f28322",
              color: "#f2f2f2",
              borderRadius: "16px",
              padding: "3px 17px",
            }}
          />
        </Space>
      </div>
    </div>
  );
};

export default ContentValidateExistenceCases;
