import { createSlice } from "@reduxjs/toolkit";

const initialState: Unit = {
  id: 0,
  unit_name: "",
  unit_description: "",
  unit_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    setIdUnit: (state, action) => {
      state.id = action.payload;
    },
    setNameUnit: (state, action) => {
      state.unit_name = action.payload;
    },
    setDescriptionUnit: (state, action) => {
      state.unit_description = action.payload;
    },
    setStatusUnit: (state, action) => {
      state.unit_status = action.payload;
    },
    setCreateDateUnit: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateUnit: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateUnit: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesUnit: (state) => {
      state.id = 0;
      state.unit_name = "";
      state.unit_description = "";
      state.unit_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdUnit,
  setNameUnit,
  setDescriptionUnit,
  setStatusUnit,
  setCreateDateUnit,
  setUpdateDateUnit,
  setDeleteDateUnit,
  setDefaultValuesUnit,
} = unitSlice.actions;

export default unitSlice.reducer;
