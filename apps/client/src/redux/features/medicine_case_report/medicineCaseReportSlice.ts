import { createSlice } from "@reduxjs/toolkit";

const initialState: MedicineCaseReport = {
  id: 0,
  med_case_id_fk: "",
  med_code: "",
  med_name: "",
  med_description: "",
  med_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  listMedicines: [],
};

export const medicineCaseReportSlice = createSlice({
  name: "medicineCaseReport",
  initialState,
  reducers: {
    setIdMedicineCaseReport: (state, action) => {
      state.id = action.payload;
    },
    setCaseIdFk: (state, action) => {
      state.med_case_id_fk = action.payload;
    },
    setCodeMedicineCaseReport: (state, action) => {
      state.med_code = action.payload;
    },
    setNameMedicineCaseReport: (state, action) => {
      state.med_name = action.payload;
    },
    setDescriptionMedicineCaseReport: (state, action) => {
      state.med_description = action.payload;
    },
    setStatusMedicineCaseReport: (state, action) => {
      state.med_status = action.payload;
    },
    setCreateDateMedicineCaseReport: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateMedicineCaseReport: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateMedicineCaseReport: (state, action) => {
      state.deletedAt = action.payload;
    },
    setListMedicinesCaseReport: (state, action) => {
      state.listMedicines = action.payload;
    },
    setDefaultValuesMedicineCaseReport: (state) => {
      state.id = 0;
      state.med_case_id_fk = "";
      state.med_code = "";
      state.med_name = "";
      state.med_description = "";
      state.med_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
      state.listMedicines = [];
    },
  },
});

export const {
  setIdMedicineCaseReport,
  setCaseIdFk,
  setCodeMedicineCaseReport,
  setNameMedicineCaseReport,
  setDescriptionMedicineCaseReport,
  setStatusMedicineCaseReport,
  setCreateDateMedicineCaseReport,
  setUpdateDateMedicineCaseReport,
  setDeleteDateMedicineCaseReport,
  setListMedicinesCaseReport,
  setDefaultValuesMedicineCaseReport,
} = medicineCaseReportSlice.actions;

export default medicineCaseReportSlice.reducer;
