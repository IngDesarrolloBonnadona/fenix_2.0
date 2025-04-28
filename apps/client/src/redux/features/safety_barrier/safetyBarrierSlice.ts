import { createSlice } from "@reduxjs/toolkit";

const initialState: SafetyBarrier = {
  id: 0,
  saf_b_name: "",
  saf_b_description: "",
  saf_b_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const safetyBarrierSlice = createSlice({
  name: "safetyBarrier",
  initialState,
  reducers: {
    setIdSafetyBarrier: (state, action) => {
      state.id = action.payload;
    },
    setNameSafetyBarrier: (state, action) => {
      state.saf_b_name = action.payload;
    },
    setDescriptionSafetyBarrier: (state, action) => {
      state.saf_b_description = action.payload;
    },
    setStatusSafetyBarrier: (state, action) => {
      state.saf_b_status = action.payload;
    },
    setCreateDateSafetyBarrier: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateSafetyBarrier: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateSafetyBarrier: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesSafetyBarrier: (state) => {
      state.id = 0;
      state.saf_b_name = "";
      state.saf_b_description = "";
      state.saf_b_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdSafetyBarrier,
  setNameSafetyBarrier,
  setDescriptionSafetyBarrier,
  setStatusSafetyBarrier,
  setCreateDateSafetyBarrier,
  setUpdateDateSafetyBarrier,
  setDeleteDateSafetyBarrier,
  setDefaultValuesSafetyBarrier,
} = safetyBarrierSlice.actions;

export default safetyBarrierSlice.reducer;
