import { createSlice } from "@reduxjs/toolkit";

const initialState: ObservationCancellationCase = {
  id: 0,
  cac_o_reasoncancellation_id_fk: 0,
  cac_o_validatedcase_id_fk: "",
  cac_o_user_id: "",
  cac_o_observation: "",
  cac_o_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const observationCancellationCaseSlice = createSlice({
  name: "observationCancellationCase",
  initialState,
  reducers: {
    setIdObservationCancellationCase: (state, action) => {
      state.id = action.payload;
    },
    setReasonIdObservationCancellationCase: (state, action) => {
      state.cac_o_reasoncancellation_id_fk = action.payload;
    },
    setValidatedReportIdObservationCancellationCase: (state, action) => {
      state.cac_o_validatedcase_id_fk = action.payload;
    },
    setUserIdObservationCancellationCase: (state, action) => {
      state.cac_o_user_id = action.payload;
    },
    setObservationCancellationCase: (state, action) => {
      state.cac_o_observation = action.payload;
    },
    setStatusObservationCancellationCase: (state, action) => {
      state.cac_o_status = action.payload;
    },
    setCreateDateObservationCancellationCase: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateObservationCancellationCase: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateObservationCancellationCase: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesObservationCancellationCase: (state) => {
      state.id = 0;
      state.cac_o_reasoncancellation_id_fk = 0;
      state.cac_o_validatedcase_id_fk = "";
      state.cac_o_user_id = "";
      state.cac_o_observation = "";
      state.cac_o_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdObservationCancellationCase,
  setReasonIdObservationCancellationCase,
  setValidatedReportIdObservationCancellationCase,
  setUserIdObservationCancellationCase,
  setObservationCancellationCase,
  setStatusObservationCancellationCase,
  setCreateDateObservationCancellationCase,
  setUpdateDateObservationCancellationCase,
  setDeleteDateObservationCancellationCase,
  setDefaultValuesObservationCancellationCase,
} = observationCancellationCaseSlice.actions;

export default observationCancellationCaseSlice.reducer;
