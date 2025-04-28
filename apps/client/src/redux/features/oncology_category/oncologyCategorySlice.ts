import { createSlice } from "@reduxjs/toolkit";

const initialState: OncologyCategory = {
  id: 0,
  onc_c_name: "",
  onc_c_description: "",
  onc_c_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const oncologyCategorySlice = createSlice({
  name: "oncologyCategory",
  initialState,
  reducers: {
    setIdOncologyCategory: (state, action) => {
      state.id = action.payload;
    },
    setNameOncologyCategory: (state, action) => {
      state.onc_c_name = action.payload;
    },
    setDescriptionOncologyCategory: (state, action) => {
      state.onc_c_description = action.payload;
    },
    setStatusOncologyCategory: (state, action) => {
      state.onc_c_status = action.payload;
    },
    setCreateDateOncologyCategory: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateOncologyCategory: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateOncologyCategory: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesOncologyCategory: (state) => {
      state.id = 0;
      state.onc_c_name = "";
      state.onc_c_description = "";
      state.onc_c_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdOncologyCategory,
  setNameOncologyCategory,
  setDescriptionOncologyCategory,
  setStatusOncologyCategory,
  setCreateDateOncologyCategory,
  setUpdateDateOncologyCategory,
  setDeleteDateOncologyCategory,
  setDefaultValuesOncologyCategory,
} = oncologyCategorySlice.actions;

export default oncologyCategorySlice.reducer;
