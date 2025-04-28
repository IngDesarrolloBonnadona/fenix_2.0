import { createSlice } from "@reduxjs/toolkit";

const initialState: SubOrigin = {
  id: 0,
  sub_o_origin_id_fk: 0,
  sub_o_name: "",
  sub_o_description: "",
  sub_o_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const subOriginSlice = createSlice({
  name: "subOrigin",
  initialState,
  reducers: {
    setIdSubOrigin: (state, action) => {
      state.id = action.payload;
    },
    setOriginIdFk: (state, action) => {
      state.sub_o_origin_id_fk = action.payload;
    },
    setNameSubOrigin: (state, action) => {
      state.sub_o_name = action.payload;
    },
    setDescriptionSubOrigin: (state, action) => {
      state.sub_o_description = action.payload;
    },
    setStatusSubOrigin: (state, action) => {
      state.sub_o_status = action.payload;
    },
    setCreateDateSubOrigin: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateSubOrigin: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateSubOrigin: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesSubOrigin: (state) => {
      state.id = 0;
      state.sub_o_origin_id_fk = 0;
      state.sub_o_name = "";
      state.sub_o_description = "";
      state.sub_o_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdSubOrigin,
  setOriginIdFk,
  setNameSubOrigin,
  setDescriptionSubOrigin,
  setStatusSubOrigin,
  setCreateDateSubOrigin,
  setUpdateDateSubOrigin,
  setDeleteDateSubOrigin,
  setDefaultValuesSubOrigin,
} = subOriginSlice.actions;

export default subOriginSlice.reducer;
