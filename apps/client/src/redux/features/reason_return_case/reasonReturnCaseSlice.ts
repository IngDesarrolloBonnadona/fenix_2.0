import { createSlice } from "@reduxjs/toolkit";

const initialState: ReasonReturnCase = {
  id: 0,
  rec_r_role_id_fk: 0,
  rec_r_cause: "",
  rec_r_description: "",
  rec_r_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const reasonReturnCaseSlice = createSlice({
  name: "reasonReturnCase",
  initialState,
  reducers: {
    setIdReasonReturnCase: (state, action) => {
      state.id = action.payload;
    },
    setRoleIdReasonReturnCase: (state, action) => {
      state.rec_r_role_id_fk = action.payload;
    },
    setCauseReasonReturnCase: (state, action) => {
      state.rec_r_cause = action.payload;
    },
    setDescriptionReasonReturnCase: (state, action) => {
      state.rec_r_description = action.payload;
    },
    setStatusReasonReturnCase: (state, action) => {
      state.rec_r_status = action.payload;
    },
    setCreateDateReasonReturnCase: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateReasonReturnCase: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateReasonReturnCase: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesReasonReturnCase: (state) => {
      state.id = 0;
      state.rec_r_role_id_fk = 0;
      state.rec_r_cause = "";
      state.rec_r_description = "";
      state.rec_r_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdReasonReturnCase,
  setRoleIdReasonReturnCase,
  setCauseReasonReturnCase,
  setDescriptionReasonReturnCase,
  setStatusReasonReturnCase,
  setCreateDateReasonReturnCase,
  setUpdateDateReasonReturnCase,
  setDeleteDateReasonReturnCase,
  setDefaultValuesReasonReturnCase,
} = reasonReturnCaseSlice.actions;

export default reasonReturnCaseSlice.reducer;
