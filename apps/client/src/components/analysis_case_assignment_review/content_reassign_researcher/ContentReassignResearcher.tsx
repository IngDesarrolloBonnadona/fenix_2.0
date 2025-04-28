"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";

import { Card, Input, Space, Divider, Switch } from "antd";
import {
  HiMiniMagnifyingGlass,
  HiOutlineDocumentMagnifyingGlass,
} from "react-icons/hi2";
import { LoadingOutlined } from "@ant-design/icons";
import { GrSelect } from "react-icons/gr";
import { titleStyleCss } from "@/theme/text_styles";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";
import {
  setmodalIsOpen,
  setSuccessFullMessage,
} from "@/redux/features/common/modal/modalSlice";

import { useAllActiveUsersQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";
import { useReassignResearcherMutation } from "@/redux/apis/report_researcher_assignment/reportResearcherAssignmentApi";

const ContentReassignResearcher: React.FC<{
  onCloseModal: () => void;
  caseValidateId: string;
}> = ({ onCloseModal, caseValidateId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const [selectedPositionNameLocalState, setSelectedPositionNameLocalState] =
    useState("");
  const [selectedResearcherLocalState, setSelectedResearcherLocalState] =
    useState<Partial<IUserActiveBHub> | null>(null);
  const [
    selectedResearcherIdNumberLocalState,
    setSelectedResearcherIdNumberLocalState,
  ] = useState("");
  const [searchResearcherLocalState, setSearchResearcherLocalState] =
    useState("");
  const [
    justificationReassignResearcherLocalState,
    setJustificationReassignResearcherLocalState,
  ] = useState("");

  const {
    data: allActiveUsersData,
    isFetching: allActiveUsersFetching,
    isLoading: allActiveUsersLoading,
    error: allActiveUsersError,
    refetch: allActiveUsersRefetch,
  } = useAllActiveUsersQuery(null);

  const [reassignResearcher, { isLoading: reassignResearcherDataLoading }] =
    useReassignResearcherMutation();

  const filteredResearcher = Array.isArray(allActiveUsersData)
    ? allActiveUsersData?.filter((researcher: Partial<IUserActiveBHub>) => {
        const fullName =
          `${researcher.name} ${researcher.last_name}`.toLocaleUpperCase();
        const search = searchResearcherLocalState.toLocaleUpperCase();

        return (
          fullName.includes(search) ||
          researcher.name?.toLocaleUpperCase().includes(search) ||
          researcher.last_name?.toLocaleUpperCase().includes(search)
        );
      })
    : [];

  const handleClickSubmit = async () => {
    try {
      const response: any = await reassignResearcher({
        idAnalyst: idNumberUserSessionState.toString(),
        updateResearcherReassign: {
          res_validatedcase_id_fk: caseValidateId,
          res_positionname: selectedPositionNameLocalState,
          res_userresearch_id: selectedResearcherIdNumberLocalState,
          res_justifications: justificationReassignResearcherLocalState,
        },
      });

      let isError = response.error;
      let dataStatus = response.data?.status;
      let validationData = response.data?.message;

      if (isError || dataStatus !== 200) {
        const errorMessage = isError?.data.message;
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

      if (dataStatus === 200 && !isError) {
        onCloseModal();
        dispatch(setSuccessFullMessage(validationData));
        dispatch(setmodalIsOpen(true));
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al reasignar", error);
    }
  };

  return (
    <div
      className="content-reassign-researcher"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "500px",
      }}
    >
      <Space
        size="small"
        style={{ textAlign: "left", marginBottom: "15px", width: "100%" }}
      >
        <HiOutlineDocumentMagnifyingGlass color="#015E90" size={25} />
        <h2
          className="title-modal-reassign-researcher"
          style={{ ...titleStyleCss, textAlign: "left", fontSize: "300" }}
        >
          Reasignar Caso a investigador
        </h2>
      </Space>

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
            width: "45%",
            padding: "5px",
          }}
        >
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              width: "100%",
              border: "1px #ddd",
            }}
          >
            <div>
              <Input
                id="search-researcher"
                className="search-researcher"
                size="small"
                placeholder="Buscar investigador"
                value={searchResearcherLocalState}
                onChange={(e) => setSearchResearcherLocalState(e.target.value)}
                style={{ marginBottom: "10px" }}
                prefix={<HiMiniMagnifyingGlass />}
                autoComplete="off"
              />
            </div>

            {allActiveUsersLoading ? (
              <div style={{ marginTop: "10px" }}>
                <CustomSpin />
              </div>
            ) : (
              <>
                {Array.isArray(filteredResearcher) &&
                  filteredResearcher.map((item) => (
                    <Card
                      key={item.id}
                      style={{
                        marginBottom: "5px",
                        width: "100%",
                        textAlign: "left",
                        borderRadius: "16px",
                        cursor: "pointer",
                        backgroundColor:
                          selectedResearcherLocalState?.id === item.id
                            ? "#94f798"
                            : "#ddd",
                      }}
                      onClick={() => {
                        setSelectedResearcherLocalState(item);
                        setSelectedResearcherIdNumberLocalState(
                          item.id_number!.toString()
                        );
                        setSelectedPositionNameLocalState(
                          item.collaborator_position!
                        );
                      }}
                    >
                      <h2
                        className="title-modal-reassign-researcher"
                        style={{
                          ...titleStyleCss,
                          textAlign: "center",
                          fontSize: "10px",
                        }}
                      >
                        {item.name} {item.last_name}
                      </h2>
                    </Card>
                  ))}
              </>
            )}
          </div>
        </div>

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
          {selectedResearcherLocalState ? (
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                width: "100%",
                border: "1px #ddd",
              }}
            >
              <div>
                <Input.TextArea
                  id="Justification-reasign-researcher"
                  className="Justification-reasign-researcher"
                  size="small"
                  placeholder="Justificación de reasignación"
                  value={justificationReassignResearcherLocalState}
                  onChange={(e) =>
                    setJustificationReassignResearcherLocalState(
                      e.target.value.toUpperCase()
                    )
                  }
                  style={{
                    marginTop: "10px",
                    textTransform: "uppercase",
                  }}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>

              <Divider />

              <>
                <Card
                  key={selectedResearcherIdNumberLocalState}
                  style={{
                    marginBottom: "5px",
                    width: "100%",
                    textAlign: "left",
                    borderRadius: "16px",
                    cursor: "pointer",
                    backgroundColor: "#94f798",
                  }}
                  onClick={() => {}}
                >
                  <h2
                    className="title-modal-assign-researcher"
                    style={{
                      ...titleStyleCss,
                      textAlign: "center",
                      fontSize: "10px",
                    }}
                  >
                    {selectedPositionNameLocalState}
                  </h2>
                </Card>
              </>
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
              <p>Seleccione un analista para ver el cargo</p>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: "auto" }}>
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
          <CustomButton
            classNameCustomButton="cancel-button-custom-modal"
            idCustomButton="cancel-button-custom-modal"
            titleCustomButton="Cancelar"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            onClickCustomButton={onCloseModal}
            sizeCustomButton={"small"}
            styleCustomButton={{
              backgroundColor: "#6C757D",
              color: "#f2f2f2",
              borderRadius: "16px",
              padding: "3px 17px",
            }}
          />
          <CustomButton
            classNameCustomButton="confirm-button-custom-modal"
            idCustomButton="confirm-button-custom-modal"
            titleCustomButton="Resignar"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            onClickCustomButton={handleClickSubmit}
            sizeCustomButton={"small"}
            iconCustomButton={
              reassignResearcherDataLoading && <LoadingOutlined />
            }
            iconPositionCustomButton="end"
            disabledCustomButton={
              !reassignResearcherDataLoading && selectedResearcherLocalState
                ? false
                : true
            }
            styleCustomButton={{
              backgroundColor: reassignResearcherDataLoading
                ? "#6C757D"
                : "#f28322",
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

export default ContentReassignResearcher;
