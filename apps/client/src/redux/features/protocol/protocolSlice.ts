import { createSlice } from "@reduxjs/toolkit";

const initialState: Protocol = {
  id: 0,
  prot_name: "",
  prot_description: "",
  prot_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const protocolSlice = createSlice({
  name: "protocol",
  initialState,
  reducers: {
    setIdProtocol: (state, action) => {
      state.id = action.payload;
    },
    setNameProtocol: (state, action) => {
      state.prot_name = action.payload;
    },
    setDescriptionProtocol: (state, action) => {
      state.prot_description = action.payload;
    },
    setStatusProtocol: (state, action) => {
      state.prot_status = action.payload;
    },
    setCreateDateProtocol: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateProtocol: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateProtocol: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesProtocol: (state) => {
      state.id = 0;
      state.prot_name = "";
      state.prot_description = "";
      state.prot_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdProtocol,
  setNameProtocol,
  setDescriptionProtocol,
  setStatusProtocol,
  setCreateDateProtocol,
  setUpdateDateProtocol,
  setDeleteDateProtocol,
  setDefaultValuesProtocol,
} = protocolSlice.actions;

export default protocolSlice.reducer;
