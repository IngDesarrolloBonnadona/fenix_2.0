import { createSlice } from "@reduxjs/toolkit";

const initialState: Priority = {
  id: 0,
  prior_severityclasif_id_fk: 0,
  prior_name: "",
  prior_description: "",
  prior_responsetime: 0,
  prior_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const prioritySlice = createSlice({
  name: "Priority",
  initialState,
  reducers: {
    setIdPriority: (state, action) => {
      state.id = action.payload;
    },
    setSeverityClasificationIdFk: (state, action) => {
      state.prior_severityclasif_id_fk = action.payload;
    },
    setNamePriority: (state, action) => {
      state.prior_name = action.payload;
    },
    setDescriptionPriority: (state, action) => {
      state.prior_description = action.payload;
    },
    setStatusPriority: (state, action) => {
      state.prior_status = action.payload;
    },
    setCreateDatePriority: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDatePriority: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDatePriority: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesPriority: (state) => {
      state.id = 0;
      state.prior_severityclasif_id_fk = 0;
      state.prior_name = "";
      state.prior_description = "";
      state.prior_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdPriority,
  setSeverityClasificationIdFk,
  setNamePriority,
  setDescriptionPriority,
  setStatusPriority,
  setCreateDatePriority,
  setUpdateDatePriority,
  setDeleteDatePriority,
  setDefaultValuesPriority,
} = prioritySlice.actions;

export default prioritySlice.reducer;
