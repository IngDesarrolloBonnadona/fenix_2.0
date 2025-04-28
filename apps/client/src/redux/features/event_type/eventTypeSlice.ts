import { createSlice } from "@reduxjs/toolkit";

const initialState: EventType = {
  id: 0,
  eve_t_casetype_id_fk: 0,
  eve_t_name: "",
  eve_t_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const eventTypeSlice = createSlice({
  name: "eventType",
  initialState,
  reducers: {
    setIdEventType: (state, action) => {
      state.id = action.payload;
    },
    setCaseTypeIdFk: (state, action) => {
      state.eve_t_casetype_id_fk = action.payload;
    },
    setNameEventType: (state, action) => {
      state.eve_t_name = action.payload;
    },
    setStatusEventType: (state, action) => {
      state.eve_t_status = action.payload;
    },
    setCreateDateEventType: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateEventType: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateEventType: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesEventType: (state) => {
      state.id = 0;
      state.eve_t_casetype_id_fk = 0;
      state.eve_t_name = "";
      state.eve_t_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdEventType,
  setCaseTypeIdFk,
  setNameEventType,
  setStatusEventType,
  setCreateDateEventType,
  setUpdateDateEventType,
  setDeleteDateEventType,
  setDefaultValuesEventType,
} = eventTypeSlice.actions;

export default eventTypeSlice.reducer;
