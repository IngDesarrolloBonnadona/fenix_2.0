import { createSlice } from "@reduxjs/toolkit";

const initialState: MovementReport = {
  id: 0,
  mov_r_name: "",
  mov_r_description: "",
  mov_r_time: 0,
  mov_r_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const MovementReportSlice = createSlice({
  name: "movementReport",
  initialState,
  reducers: {
    setIdMovementReport: (state, action) => {
      state.id = action.payload;
    },
    setNameMovementReport: (state, action) => {
      state.mov_r_name = action.payload;
    },
    setDescriptionMovementReport: (state, action) => {
      state.mov_r_description = action.payload;
    },
    setTimeMovementReport: (state, action) => {
        state.mov_r_time = action.payload;
      },
    setStatusMovementReport: (state, action) => {
      state.mov_r_status = action.payload;
    },
    setCreateDateMovementReport: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateMovementReport: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateMovementReport: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesMovementReport: (state) => {
      state.id = 0;
      state.mov_r_name = "";
      state.mov_r_description = "";
      state.mov_r_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdMovementReport,
  setNameMovementReport,
  setDescriptionMovementReport,
  setTimeMovementReport,
  setStatusMovementReport,
  setCreateDateMovementReport,
  setUpdateDateMovementReport,
  setDeleteDateMovementReport,
  setDefaultValuesMovementReport,
} = MovementReportSlice.actions;

export default MovementReportSlice.reducer;
