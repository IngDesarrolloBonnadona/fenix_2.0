import { createSlice } from "@reduxjs/toolkit";

const initialState: Log = {
  id: 0,
  log_validatedcase_id_fk: "",
  log_user_id: "",
  log_action: "",
  log_ip: "",
  log_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setIdLog: (state, action) => {
      state.id = action.payload;
    },
    setValidatedCaseIdFk: (state, action) => {
      state.log_validatedcase_id_fk = action.payload;
    },
    setUserIdLog: (state, action) => {
      state.log_user_id = action.payload;
    },
    setActionLog: (state, action) => {
      state.log_action = action.payload;
    },
    setIpLog: (state, action) => {
      state.log_ip = action.payload;
    },
    setStatusLog: (state, action) => {
      state.log_status = action.payload;
    },
    setCreateDateLog: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateLog: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateLog: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesLog: (state) => {
      state.id = 0;
      state.log_validatedcase_id_fk = "";
      state.log_user_id = "";
      state.log_action = "";
      state.log_ip = "";
      state.log_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdLog,
  setValidatedCaseIdFk,
  setUserIdLog,
  setActionLog,
  setIpLog,
  setStatusLog,
  setCreateDateLog,
  setUpdateDateLog,
  setDeleteDateLog,
  setDefaultValuesLog,
} = logSlice.actions;

export default logSlice.reducer;
