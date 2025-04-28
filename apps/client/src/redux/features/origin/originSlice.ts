import { createSlice } from "@reduxjs/toolkit";

const initialState: Origin = {
  id: 0,
  orig_name: "",
  orig_description: "",
  orig_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const originSlice = createSlice({
  name: "origin",
  initialState,
  reducers: {
    setIdOrigin: (state, action) => {
      state.id = action.payload;
    },
    setNameOrigin: (state, action) => {
      state.orig_name = action.payload;
    },
    setDescriptionOrigin: (state, action) => {
      state.orig_description = action.payload;
    },
    setStatusOrigin: (state, action) => {
      state.orig_status = action.payload;
    },
    setCreateDateOrigin: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateOrigin: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateOrigin: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesOrigin: (state) => {
      state.id = 0;
      state.orig_name = "";
      state.orig_description = "";
      state.orig_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdOrigin,
  setNameOrigin,
  setDescriptionOrigin,
  setStatusOrigin,
  setCreateDateOrigin,
  setUpdateDateOrigin,
  setDeleteDateOrigin,
  setDefaultValuesOrigin,
} = originSlice.actions;

export default originSlice.reducer;
