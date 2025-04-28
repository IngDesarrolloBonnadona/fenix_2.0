import { createSlice } from "@reduxjs/toolkit";

const initialState: InfluencingFactor = {
  id: 0,
  inf_f_name: "",
  inf_f_description: "",
  inf_f_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const InfluencingFactorSlice = createSlice({
  name: "InfluencyFactor",
  initialState,
  reducers: {
    setIdInfluencingFactor: (state, action) => {
      state.id = action.payload;
    },
    setNameInfluencingFactor: (state, action) => {
      state.inf_f_name = action.payload;
    },
    setDescriptionInfluencingFactor: (state, action) => {
      state.inf_f_description = action.payload;
    },
    setStatusInfluencingFactor: (state, action) => {
      state.inf_f_status = action.payload;
    },
    setCreateDateInfluencingFactor: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateInfluencingFactor: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateInfluencingFactor: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesInfluencingFactor: (state) => {
      state.id = 0;
      state.inf_f_name = "";
      state.inf_f_description = "";
      state.inf_f_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdInfluencingFactor,
  setNameInfluencingFactor,
  setDescriptionInfluencingFactor,
  setStatusInfluencingFactor,
  setCreateDateInfluencingFactor,
  setUpdateDateInfluencingFactor,
  setDeleteDateInfluencingFactor,
  setDefaultValuesInfluencingFactor,
} = InfluencingFactorSlice.actions;

export default InfluencingFactorSlice.reducer;
