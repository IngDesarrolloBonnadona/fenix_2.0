import { createSlice } from "@reduxjs/toolkit";

const initialState: DeviceType = {
  id: 0,
  dev_t_name: "",
  dev_t_description: "",
  dev_t_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const deviceTypeSlice = createSlice({
  name: "deviceType",
  initialState,
  reducers: {
    setIdDeviceType: (state, action) => {
      state.id = action.payload;
    },
    setNameDeviceType: (state, action) => {
      state.dev_t_name = action.payload;
    },
    setDescriptionDeviceType: (state, action) => {
      state.dev_t_description = action.payload;
    },
    setStatusDeviceType: (state, action) => {
      state.dev_t_status = action.payload;
    },
    setCreateDateDeviceType: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateDeviceType: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateDeviceType: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesDeviceType: (state) => {
      state.id = 0;
      state.dev_t_name = "";
      state.dev_t_description = "";
      state.dev_t_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdDeviceType,
  setNameDeviceType,
  setDescriptionDeviceType,
  setStatusDeviceType,
  setCreateDateDeviceType,
  setUpdateDateDeviceType,
  setDeleteDateDeviceType,
  setDefaultValuesDeviceType,
} = deviceTypeSlice.actions;

export default deviceTypeSlice.reducer;
