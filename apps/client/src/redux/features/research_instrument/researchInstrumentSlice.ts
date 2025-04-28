import { createSlice } from "@reduxjs/toolkit";

const initialState: ResearchInstrument = {
  id: 0,
  inst_r_name: "",
  inst_r_description: "",
  inst_r_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const researchInstrumentSlice = createSlice({
  name: "researchInstrument",
  initialState,
  reducers: {
    setIdResearchInstrument: (state, action) => {
      state.id = action.payload;
    },
    setNameResearchInstrument: (state, action) => {
      state.inst_r_name = action.payload;
    },
    setDescriptionResearchInstrument: (state, action) => {
      state.inst_r_description = action.payload;
    },
    setStatusResearchInstrument: (state, action) => {
      state.inst_r_status = action.payload;
    },
    setCreateDateResearchInstrument: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateResearchInstrument: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateResearchInstrument: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesResearchInstrument: (state) => {
      state.id = 0;
      state.inst_r_name = "";
      state.inst_r_description = "";
      state.inst_r_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdResearchInstrument,
  setNameResearchInstrument,
  setDescriptionResearchInstrument,
  setStatusResearchInstrument,
  setCreateDateResearchInstrument,
  setUpdateDateResearchInstrument,
  setDeleteDateResearchInstrument,
  setDefaultValuesResearchInstrument,
} = researchInstrumentSlice.actions;

export default researchInstrumentSlice.reducer;
