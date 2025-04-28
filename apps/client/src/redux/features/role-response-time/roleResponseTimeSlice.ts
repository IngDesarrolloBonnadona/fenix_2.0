import { createSlice } from "@reduxjs/toolkit";

const initialState: RoleResponseTime = {
  id: 0,
  rest_r_severityclasif_id_fk: 0,
  rest_r_role_id_fk: 0,
  rest_r_description: "",
  rest_r_responsetime: 0,
  rest_r_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const roleResponseTimeSlice = createSlice({
  name: "roleResponseTime",
  initialState,
  reducers: {
    setIdRoleResponseTime: (state, action) => {
      state.id = action.payload;
    },
    setSeverityclasifIdFk: (state, action) => {
      state.rest_r_severityclasif_id_fk = action.payload;
    },
    setRoleIdFk: (state, action) => {
      state.rest_r_role_id_fk = action.payload;
    },
    setDescriptionRoleResponseTime: (state, action) => {
      state.rest_r_description = action.payload;
    },
    setResponseTimeRole: (state, action) => {
      state.rest_r_responsetime = action.payload;
    },
    setStatusRoleResponseTime: (state, action) => {
      state.rest_r_status = action.payload;
    },
    setCreateDateRoleResponseTime: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateRoleResponseTime: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateRoleResponseTime: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesRoleResponseTime: (state) => {
      state.id = 0;
      state.rest_r_severityclasif_id_fk = 0;
      state.rest_r_role_id_fk = 0;
      state.rest_r_description = "";
      state.rest_r_responsetime = 0;
      state.rest_r_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdRoleResponseTime,
  setSeverityclasifIdFk,
  setRoleIdFk,
  setDescriptionRoleResponseTime,
  setResponseTimeRole,
  setStatusRoleResponseTime,
  setCreateDateRoleResponseTime,
  setUpdateDateRoleResponseTime,
  setDeleteDateRoleResponseTime,
  setDefaultValuesRoleResponseTime,
} = roleResponseTimeSlice.actions;

export default roleResponseTimeSlice.reducer;
