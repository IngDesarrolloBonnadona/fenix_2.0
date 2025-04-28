import { createSlice } from "@reduxjs/toolkit";

const initialState: ObservationReturnCase = {
  id: 0,
  rec_o_reasonreturn_id_fk: 0,
  rec_o_validatedcase_id_fk: "",
  rec_o_user_id: "",
  rec_o_observation: "",
  rec_o_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const observationReturnCaseSlice = createSlice({
  name: "observationReturnCase",
  initialState,
  reducers: {
    setIdObservationReturnCase: (state, action) => {
      state.id = action.payload;
    },
    setReasonIdObservationReturnCase: (state, action) => {
      state.rec_o_reasonreturn_id_fk = action.payload;
    },
    setValidatedReportIdObservationReturnCase: (state, action) => {
      state.rec_o_validatedcase_id_fk = action.payload;
    },
    setUserIdObservationReturnCase: (state, action) => {
      state.rec_o_user_id = action.payload;
    },
    setObservationReturnCase: (state, action) => {
      state.rec_o_observation = action.payload;
    },
    setStatusObservationReturnCase: (state, action) => {
      state.rec_o_status = action.payload;
    },
    setCreateDateObservationReturnCase: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateObservationReturnCase: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateObservationReturnCase: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesObservationReturnCase: (state) => {
      state.id = 0;
      state.rec_o_reasonreturn_id_fk = 0;
      state.rec_o_validatedcase_id_fk = "";
      state.rec_o_user_id = "";
      state.rec_o_observation = "";
      state.rec_o_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
    setIdObservationReturnCase,
    setReasonIdObservationReturnCase,
    setValidatedReportIdObservationReturnCase: setValidatedCaseIdFk,
    setUserIdObservationReturnCase,
    setObservationReturnCase,
    setStatusObservationReturnCase,
    setCreateDateObservationReturnCase,
    setUpdateDateObservationReturnCase,
    setDeleteDateObservationReturnCase,
    setDefaultValuesObservationReturnCase,
} = observationReturnCaseSlice.actions;

export default observationReturnCaseSlice.reducer;
