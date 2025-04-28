import { createSlice } from "@reduxjs/toolkit";

const initialState: UnsafeAction = {
  id: 0,
  uns_a_name: "",
  uns_a_description: "",
  uns_a_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const unsafeActionSlice = createSlice({
  name: "unsafeAction",
  initialState,
  reducers: {
    setIdUnsafeAction: (state, action) => {
      state.id = action.payload;
    },
    setNameUnsafeAction: (state, action) => {
      state.uns_a_name = action.payload;
    },
    setDescriptionUnsafeAction: (state, action) => {
      state.uns_a_description = action.payload;
    },
    setStatusUnsafeAction: (state, action) => {
      state.uns_a_status = action.payload;
    },
    setCreateDateUnsafeAction: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateUnsafeAction: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateUnsafeAction: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesUnsafeAction: (state) => {
      state.id = 0;
      state.uns_a_name = "";
      state.uns_a_description = "";
      state.uns_a_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdUnsafeAction,
  setNameUnsafeAction,
  setDescriptionUnsafeAction,
  setStatusUnsafeAction,
  setCreateDateUnsafeAction,
  setUpdateDateUnsafeAction,
  setDeleteDateUnsafeAction,
  setDefaultValuesUnsafeAction,
} = unsafeActionSlice.actions;

export default unsafeActionSlice.reducer;
