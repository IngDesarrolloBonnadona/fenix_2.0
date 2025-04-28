"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";

import { Card, Col, Row, Space } from "antd";
import styles from "./CaseTypeOptionComponent.module.css";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";
import { FaCirclePlus } from "react-icons/fa6";
import { LuFileQuestion } from "react-icons/lu";
import { TbMoodSad } from "react-icons/tb";

import CustomTags from "@/components/common/custom_tags/CustomTags";
import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useCreateCompressionConceptReportMutation } from "@/redux/apis/compression_concept_report/compressionConceptReportApi";

import { CaseTypeReportEnum } from "@/utils/enums/case_type_color.enum";

import {
  setIdOfCaseType,
  setIdOfCaseTypeAdverseEvent,
  setIdOfCaseTypeIncident,
  setIdOfCaseTypeIndicationsUnsafeCare,
  setIdOfCaseTypeRisk,
} from "@/redux/features/global/changeOfCaseTypeSlice";
import { useAppSelector } from "@/redux/hook";

const CaseTypeOptionComponent: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showConfirmationModalLocalState, setShowConfirmationModalLocalState] =
    useState(false);
  const [selectedCaseTypeNameLocalState, setSelectedCaseTypeNameLocalState] =
    useState<string | null>(null);
  const [selectedCaseTypeIdLocalState, setSelectedCaseTypeIdLocalState] =
    useState<number | null>(null);

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const [
    createCompressionConceptReport,
    { isLoading: createdCompressionConceptReportDataLoading },
  ] = useCreateCompressionConceptReportMutation();

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const handleContinueCaseTypeReport = async (
    isConfirmConceptCaseTypeReport: boolean
  ) => {
    if (!isConfirmConceptCaseTypeReport) {
      try {
        await createCompressionConceptReport({
          comp_c_user_id: idNumberUserSessionState,
          comp_c_casetype_id_fk: selectedCaseTypeIdLocalState,
        });
      } catch (error) {
        console.error("Error en la petición", error);
      }
    }

    if (selectedCaseTypeNameLocalState) {
      switch (selectedCaseTypeNameLocalState) {
        case CaseTypeReportEnum.ADVERSE_EVENT:
          dispatch(setIdOfCaseTypeAdverseEvent(selectedCaseTypeIdLocalState));
          router.push(`/adverse_event_report`);
          break;
        case CaseTypeReportEnum.INCIDENT:
          dispatch(setIdOfCaseTypeIncident(selectedCaseTypeIdLocalState));
          router.push(`/incident_report`);
          break;
        case CaseTypeReportEnum.RISK:
          dispatch(setIdOfCaseTypeRisk(selectedCaseTypeIdLocalState));
          router.push(`/risk_report`);
          break;
        case CaseTypeReportEnum.INDICATING_UNSAFE_CARE:
          dispatch(
            setIdOfCaseTypeIndicationsUnsafeCare(selectedCaseTypeIdLocalState)
          );
          router.push(`/indications_unsafe_care_report`);
          break;
        default:
          break;
      }
    }
    setShowConfirmationModalLocalState(false);
  };

  return (
    <div>
      <CustomTags
        labelCustom="Elige que tipo de caso deseas reportar"
        colorCustom="orange"
        stylesCustom={{
          color: "#f28322",
          padding: "3px 10px",
          borderRadius: "32px",
          fontSize: "12px",
          fontWeight: "bold",
          marginBottom: "32px",
        }}
      />
      <Row gutter={[16, 16]} style={{ justifyContent: "center" }}>
        {allCaseTypesDataLoading || allCaseTypesDataFetching ? (
          <CustomSpin />
        ) : (
          <>
            {allCaseTypesData ? (
              <>
                {Array.isArray(allCaseTypesData) &&
                  allCaseTypesData?.map((caseTypeData, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={5}>
                      <Card id="case-type-options-card" className={styles.card}>
                        <div
                          id="case-type-options-card-details"
                          className={styles.cardDetails}
                        >
                          <img
                            id="case-type-options-images"
                            src={caseTypeData.cas_t_image}
                            alt={caseTypeData.cas_t_name}
                            className={styles.icon}
                          />
                          <h2
                            id="case-type-options-card-titles"
                            className={styles.textTitle}
                          >
                            {caseTypeData.cas_t_name}
                          </h2>
                          <p
                            id="case-type-options-card-body"
                            className={styles.textBody}
                          >
                            {caseTypeData.cas_t_description}
                          </p>
                        </div>
                        <CustomButton
                          classNameCustomButton={styles.cardButton}
                          idCustomButton="open-modal-confirmation-concept-report-button"
                          titleCustomButton="Crear reporte"
                          typeCustomButton="primary"
                          htmlTypeCustomButton="button"
                          iconCustomButton={<FaCirclePlus />}
                          onClickCustomButton={() => {
                            setShowConfirmationModalLocalState(true);
                            setSelectedCaseTypeIdLocalState(caseTypeData.id);
                            setSelectedCaseTypeNameLocalState(
                              caseTypeData.cas_t_name
                            );

                            // dispatch(setIdOfCaseType(caseTypeData.id));
                          }}
                          iconPositionCustomButton={"start"}
                          sizeCustomButton={"small"}
                        />
                      </Card>
                    </Col>
                  ))}
              </>
            ) : (
              <>
                <Card
                  id="case-type-empty-card"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    borderRadius: "20px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    color: "#aaa",
                  }}
                >
                  <div
                    id="case-type-empty-card-details"
                    className={styles.cardDetails}
                  >
                    <TbMoodSad className={styles.icon} />
                    <h2
                      id="case-type-empty-card-titles"
                      className={styles.textTitle}
                    >
                      No hay nada para mostrar...
                    </h2>
                    <p
                      id="case-type-empty-card-body"
                      className={styles.textTitle}
                    >
                      Por favor recarga la pagina
                    </p>
                  </div>
                </Card>
              </>
            )}
          </>
        )}
      </Row>

      <CustomModalNoContent
        key={"custom-modal-confirm-concept-type-report"}
        widthCustomModalNoContent="30%"
        openCustomModalState={showConfirmationModalLocalState}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setShowConfirmationModalLocalState(false)
        }
        contentCustomModal={
          <div
            className="content-modal-confirm-concept-type-report"
            style={{
              display: "flex",
              flexFlow: "column wrap",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              marginBlock: "9px",
              marginInline: "3px",
            }}
          >
            <Space
              direction="vertical"
              size="small"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ marginBlock: 2 }}>
                <LuFileQuestion color="#015E90" size={77} />
              </div>

              <h2
                className="title-modal-confirm-concept-type-report"
                style={{ ...titleStyleCss, textAlign: "center" }}
              >
                Confirmación
              </h2>

              <h4
                className="subtitle-modal-confirm-concept-type-report"
                style={{ ...subtitleStyleCss }}
              >
                ¿Te quedó claro con el concepto de este tipo de reporte?
              </h4>
              <h4
                className="subtitle-modal-case-type-name"
                style={{ ...subtitleStyleCss, color: "#015E90" }}
              >
                {selectedCaseTypeNameLocalState}
              </h4>

              <Space
                direction="horizontal"
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  marginTop: 13,
                }}
              >
                <CustomButton
                  classNameCustomButton="negation-button-custom-modal"
                  idCustomButton="negation-button-custom-modal"
                  titleCustomButton="No"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="button"
                  onClickCustomButton={() =>
                    handleContinueCaseTypeReport(false)
                  }
                  sizeCustomButton={"small"}
                  styleCustomButton={{
                    backgroundColor: "#6C757D",
                    color: "#f2f2f2",
                    borderRadius: "16px",
                    padding: "3px 17px",
                  }}
                  disabledCustomButton={
                    createdCompressionConceptReportDataLoading
                  }
                />
                <CustomButton
                  classNameCustomButton="confirm-button-custom-modal"
                  idCustomButton="confirm-button-custom-modal"
                  titleCustomButton="Si, continuar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="button"
                  onClickCustomButton={() => handleContinueCaseTypeReport(true)}
                  sizeCustomButton={"small"}
                  styleCustomButton={{
                    backgroundColor: "#f28322",
                    color: "#f2f2f2",
                    borderRadius: "16px",
                    padding: "3px 17px",
                  }}
                  disabledCustomButton={
                    createdCompressionConceptReportDataLoading
                  }
                />
              </Space>
            </Space>
          </div>
        }
      />
    </div>
  );
};

export default CaseTypeOptionComponent;
