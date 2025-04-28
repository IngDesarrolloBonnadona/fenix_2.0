import { createSlice } from "@reduxjs/toolkit";

const initialState: CharacterizationCase = {
  id: 0,
  cha_c_name: "",
  cha_c_description: "",
  cha_c_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const characterizationCaseSlice = createSlice({
  name: "characterizationCase",
  initialState,
  reducers: {
    setIdCharacterizationCase: (state, action) => {
      state.id = action.payload;
    },
    setNameCharacterizationCase: (state, action) => {
      state.cha_c_name = action.payload;
    },
    setDescriptionCharacterizationCase: (state, action) => {
      state.cha_c_description = action.payload;
    },
    setStatusCharacterizationCase: (state, action) => {
      state.cha_c_status = action.payload;
    },
    setCreateDateCharacterizationCase: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateCharacterizationCase: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateCharacterizationCase: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesCharacterizationCase: (state) => {
      state.id = 0;
      state.cha_c_name = "";
      state.cha_c_description = "";
      state.cha_c_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdCharacterizationCase,
  setNameCharacterizationCase,
  setDescriptionCharacterizationCase,
  setStatusCharacterizationCase,
  setCreateDateCharacterizationCase,
  setUpdateDateCharacterizationCase,
  setDeleteDateCharacterizationCase,
  setDefaultValuesCharacterizationCase,
} = characterizationCaseSlice.actions;

export default characterizationCaseSlice.reducer;
