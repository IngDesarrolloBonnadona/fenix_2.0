import { createSlice } from "@reduxjs/toolkit";

const initialState: FailedMeasure = {
  id: 0,
  meas_f_name: "",
  meas_f_description: "",
  meas_f_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const failedMeasureSlice = createSlice({
  name: "failedMeasure",
  initialState,
  reducers: {
    setIdFailedMeasure: (state, action) => {
      state.id = action.payload;
    },
    setNameFailedMeasure: (state, action) => {
      state.meas_f_name = action.payload;
    },
    setDescriptionFailedMeasure: (state, action) => {
      state.meas_f_description = action.payload;
    },
    setStatusFailedMeasure: (state, action) => {
      state.meas_f_status = action.payload;
    },
    setCreateDateFailedMeasure: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateFailedMeasure: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateFailedMeasure: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesFailedMeasure: (state) => {
      state.id = 0;
      state.meas_f_name = "";
      state.meas_f_description = "";
      state.meas_f_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdFailedMeasure,
  setNameFailedMeasure,
  setDescriptionFailedMeasure,
  setStatusFailedMeasure,
  setCreateDateFailedMeasure,
  setUpdateDateFailedMeasure,
  setDeleteDateFailedMeasure,
  setDefaultValuesFailedMeasure,
} = failedMeasureSlice.actions;

export default failedMeasureSlice.reducer;
