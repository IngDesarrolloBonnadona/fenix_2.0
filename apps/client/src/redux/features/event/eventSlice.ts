import { createSlice } from "@reduxjs/toolkit";

const initialState: Events = {
  id: 0,
  eve_eventtype_id_fk: 0,
  eve_unit_id_fk: 0,
  eve_materialized_adverse_event_id: 0,
  eve_materialized_incident_id: 0,
  eve_risk_type_id: 0,
  eve_name: "",
  eve_characterizationcase_id_fk: 0,
  eve_oncologycategory_id_fk: 0,
  eve_deviceassociated: false,
  eve_medicineassociated: false,
  eve_stay: false,
  eve_mentalhealth: false,
  eve_publichealth: false,
  eve_oncologicalpathology: false,
  eve_medicines: false,
  eve_devices: false,
  eve_chemotherapy: false,
  eve_cerebral: false,
  eve_respiratory: false,
  eve_cardiovascular: false,
  eve_prostate: false,
  eve_renal: false,
  eve_gastrointestinal: false,
  eve_metabolic: false,
  eve_immunological: false,
  eve_nutritional: false,
  eve_transfusional: false,
  eve_changesparaclinical: false,
  eve_surgery: false,
  eve_procedures: false,
  eve_infectious: false,
  eve_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setIdEvent: (state, action) => {
      state.id = action.payload;
    },
    setEventTypeIdFk: (state, action) => {
      state.eve_eventtype_id_fk = action.payload;
    },
    setUnitIdFk: (state, action) => {
      state.eve_unit_id_fk = action.payload;
    },
    setMaterializedAdverseEventIdFk: (state, action) => {
      state.eve_materialized_adverse_event_id = action.payload;
    },
    setMaterializedIncidentIdFk: (state, action) => {
      state.eve_materialized_incident_id = action.payload;
    },
    setRiskTypeIdFk: (state, action) => {
      state.eve_risk_type_id = action.payload;
    },
    setNameEvent: (state, action) => {
      state.eve_name = action.payload;
    },
    setAssociatedMedicineEvent: (state, action) => {
      state.eve_medicineassociated = action.payload;
    },
    setAssociatedDeviceEvent: (state, action) => {
      state.eve_deviceassociated = action.payload;
    },
    setStatusEvent: (state, action) => {
      state.eve_status = action.payload;
    },
    setCreateDateEvent: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateEvent: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateEvent: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesEvent: (state) => {
      state.id = 0;
      state.eve_eventtype_id_fk = 0;
      state.eve_unit_id_fk = 0;
      state.eve_materialized_adverse_event_id = 0;
      state.eve_materialized_incident_id = 0;
      state.eve_risk_type_id = 0;
      state.eve_name = "";
      state.eve_deviceassociated = false;
      state.eve_medicineassociated = false;
      state.eve_stay = false;
      state.eve_mentalhealth = false;
      state.eve_publichealth = false;
      state.eve_oncologicalpathology = false;
      state.eve_medicines = false;
      state.eve_devices = false;
      state.eve_chemotherapy = false;
      state.eve_cerebral = false;
      state.eve_respiratory = false;
      state.eve_cardiovascular = false;
      state.eve_prostate = false;
      state.eve_renal = false;
      state.eve_gastrointestinal = false;
      state.eve_metabolic = false;
      state.eve_immunological = false;
      state.eve_nutritional = false;
      state.eve_transfusional = false;
      state.eve_changesparaclinical = false;
      state.eve_surgery = false;
      state.eve_procedures = false;
      state.eve_infectious = false;
      state.eve_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdEvent,
  setEventTypeIdFk,
  setUnitIdFk,
  setMaterializedAdverseEventIdFk,
  setMaterializedIncidentIdFk,
  setRiskTypeIdFk,
  setNameEvent,
  setAssociatedDeviceEvent,
  setAssociatedMedicineEvent,
  setStatusEvent,
  setCreateDateEvent,
  setUpdateDateEvent,
  setDeleteDateEvent,
  setDefaultValuesEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
