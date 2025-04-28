import { createSlice } from "@reduxjs/toolkit";

const initialState: Role = {
  id: 0,
  role_name: "",
  role_description: "",
  role_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setIdRole: (state, action) => {
      state.id = action.payload;
    },
    setNameRole: (state, action) => {
      state.role_name = action.payload;
    },
    setDescriptionRole: (state, action) => {
      state.role_description = action.payload;
    },
    setStatusRole: (state, action) => {
      state.role_status = action.payload;
    },
    setCreateDateRole: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateRole: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateRole: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesRole: (state) => {
      state.id = 0;
      state.role_name = "";
      state.role_description = "";
      state.role_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdRole,
  setNameRole,
  setDescriptionRole,
  setStatusRole,
  setCreateDateRole,
  setUpdateDateRole,
  setDeleteDateRole,
  setDefaultValuesRole,
} = roleSlice.actions;

export default roleSlice.reducer;
