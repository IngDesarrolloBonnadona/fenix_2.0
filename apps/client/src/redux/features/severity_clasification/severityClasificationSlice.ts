import { createSlice } from "@reduxjs/toolkit";

const initialState: SeverityClasification = {
  id: 0,
  sev_c_name: "",
  sev_c_description: "",
  sev_c_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const severityClasificationSlice = createSlice({
  name: "severityClasification",
  initialState,
  reducers: {
    setIdSeverityClasification: (state, action) => {
      state.id = action.payload;
    },
    setNameSeverityClasification: (state, action) => {
      state.sev_c_name = action.payload;
    },
    setDescriptionSeverityClasification: (state, action) => {
      state.sev_c_description = action.payload;
    },
    setStatusSeverityClasification: (state, action) => {
      state.sev_c_status = action.payload;
    },
    setCreateDateSeverityClasification: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateSeverityClasification: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateSeverityClasification: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesSeverityClasification: (state) => {
      state.id = 0;
      state.sev_c_name = "";
      state.sev_c_description = "";
      state.sev_c_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdSeverityClasification,
  setNameSeverityClasification,
  setDescriptionSeverityClasification,
  setStatusSeverityClasification,
  setCreateDateSeverityClasification,
  setUpdateDateSeverityClasification,
  setDeleteDateSeverityClasification,
  setDefaultValuesSeverityClasification,
} = severityClasificationSlice.actions;

export default severityClasificationSlice.reducer;
