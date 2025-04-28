import { createSlice } from "@reduxjs/toolkit";

const initialState: CompressionConceptReport = {
  id: 0,
  comp_c_user_id: "",
  comp_c_casetype_id_fk: 0,
  comp_c_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const compressionConceptReportSlice = createSlice({
  name: "compressionConceptReport",
  initialState,
  reducers: {
    setIdCompressionConceptReport: (state, action) => {
      state.id = action.payload;
    },
    setUserIdCompressionConceptReport: (state, action) => {
      state.comp_c_user_id = action.payload;
    },
    setCaseTypeIdFk: (state, action) => {
      state.comp_c_casetype_id_fk = action.payload;
    },
    setStatusCompressionConceptReport: (state, action) => {
      state.comp_c_status = action.payload;
    },
    setCreateDateCompressionConceptReport: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateDCompressionConceptReport: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateCompressionConceptReport: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesCompressionConceptReport: (state) => {
      state.id = 0;
      state.comp_c_user_id = "";
      state.comp_c_casetype_id_fk = 0;
      state.comp_c_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdCompressionConceptReport,
  setUserIdCompressionConceptReport,
  setCaseTypeIdFk,
  setCreateDateCompressionConceptReport,
  setUpdateDateDCompressionConceptReport,
  setDeleteDateCompressionConceptReport,
  setDefaultValuesCompressionConceptReport,
} = compressionConceptReportSlice.actions;

export default compressionConceptReportSlice.reducer;
