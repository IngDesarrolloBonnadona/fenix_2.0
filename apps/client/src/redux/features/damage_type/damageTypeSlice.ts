import { createSlice } from "@reduxjs/toolkit";

const initialState: DamageType = {
  id: 0,
  dam_t_name: "",
  dam_t_description: "",
  dam_t_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const damageTypeSlice = createSlice({
  name: "damageType",
  initialState,
  reducers: {
    setIdDamageType: (state, action) => {
      state.id = action.payload;
    },
    setNameDamageType: (state, action) => {
      state.dam_t_name = action.payload;
    },
    setDescriptionDamageType: (state, action) => {
      state.dam_t_description = action.payload;
    },
    setStatusDamageType: (state, action) => {
      state.dam_t_status = action.payload;
    },
    setCreateDateDamageType: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateDamageType: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateDamageType: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesDamageType: (state) => {
      state.id = 0;
      state.dam_t_name = "";
      state.dam_t_description = "";
      state.dam_t_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdDamageType,
  setNameDamageType,
  setDescriptionDamageType,
  setStatusDamageType,
  setCreateDateDamageType,
  setUpdateDateDamageType,
  setDeleteDateDamageType,
  setDefaultValuesDamageType,
} = damageTypeSlice.actions;

export default damageTypeSlice.reducer;
