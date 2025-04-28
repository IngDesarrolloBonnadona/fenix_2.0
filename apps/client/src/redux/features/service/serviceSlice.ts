import { createSlice } from "@reduxjs/toolkit";

const initialState: Service = {
  id: 0,
  serv_unit_id_fk: 0,
  serv_name: "",
  serv_description: "",
  serv_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setIdService: (state, action) => {
      state.id = action.payload;
    },
    setUnitIdFk: (state, action) => {
        state.serv_unit_id_fk = action.payload;
      },
    setNameService: (state, action) => {
      state.serv_name = action.payload;
    },
    setDescriptionService: (state, action) => {
      state.serv_description = action.payload;
    },
    setStatusService: (state, action) => {
      state.serv_status = action.payload;
    },
    setCreateDateService: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateService: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateService: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesService: (state) => {
      state.id = 0;
      state.serv_unit_id_fk = 0;
      state.serv_name = "";
      state.serv_description = "";
      state.serv_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdService,
  setUnitIdFk,
  setNameService,
  setDescriptionService,
  setStatusService,
  setCreateDateService,
  setUpdateDateService,
  setDeleteDateService,
  setDefaultValuesService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
