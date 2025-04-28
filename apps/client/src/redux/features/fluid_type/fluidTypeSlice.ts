import { createSlice } from "@reduxjs/toolkit";

const initialState: FluidType = {
  id: 0,
  flu_t_name: "",
  flu_t_description: "",
  flu_t_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const fluidTypeSlice = createSlice({
  name: "fluidType",
  initialState,
  reducers: {
    setIdFluidType: (state, action) => {
      state.id = action.payload;
    },
    setNameFluidType: (state, action) => {
      state.flu_t_name = action.payload;
    },
    setDescriptionFluidType: (state, action) => {
      state.flu_t_description = action.payload;
    },
    setStatusFluidType: (state, action) => {
      state.flu_t_status = action.payload;
    },
    setCreateDateFluidType: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateFluidType: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateFluidType: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesFluidType: (state) => {
      state.id = 0;
      state.flu_t_name = "";
      state.flu_t_description = "";
      state.flu_t_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdFluidType,
  setNameFluidType,
  setDescriptionFluidType,
  setStatusFluidType,
  setCreateDateFluidType,
  setUpdateDateFluidType,
  setDeleteDateFluidType,
  setDefaultValuesFluidType,
} = fluidTypeSlice.actions;

export default fluidTypeSlice.reducer;
