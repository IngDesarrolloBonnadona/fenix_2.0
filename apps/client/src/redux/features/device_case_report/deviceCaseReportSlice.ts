import { createSlice } from "@reduxjs/toolkit";

const initialState: DeviceCaseReport = {
  id: 0,
  dev_case_id_fk: "",
  dev_code: "",
  dev_name: "",
  dev_description: "",
  dev_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  listDevices: [],
};

export const deviceCaseReportSlice = createSlice({
  name: "deviceCaseReport",
  initialState,
  reducers: {
    setIdDeviceCaseReport: (state, action) => {
      state.id = action.payload;
    },
    setCaseIdFk: (state, action) => {
      state.dev_case_id_fk = action.payload;
    },
    setCodeDeviceCaseReport: (state, action) => {
      state.dev_code = action.payload;
    },
    setNameDeviceCaseReport: (state, action) => {
      state.dev_name = action.payload;
    },
    setDescriptionDeviceCaseReport: (state, action) => {
      state.dev_description = action.payload;
    },
    setListDevicesCaseReport: (state, action) => {
      state.listDevices = action.payload;
    },
    setDefaultValuesDeviceCaseReport: (state) => {
      state.id = 0;
      state.dev_case_id_fk = "";
      state.dev_code = "";
      state.dev_name = "";
      state.dev_description = "";
      state.dev_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
      state.listDevices = [];
    },
  },
});

export const {
  setIdDeviceCaseReport,
  setCaseIdFk,
  setCodeDeviceCaseReport,
  setNameDeviceCaseReport,
  setDescriptionDeviceCaseReport,
  setListDevicesCaseReport,
  setDefaultValuesDeviceCaseReport,
} = deviceCaseReportSlice.actions;

export default deviceCaseReportSlice.reducer;
