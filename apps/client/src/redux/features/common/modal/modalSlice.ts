import { ItemKeys } from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPageLoading: false,
  modalIsOpen: false,
  successfullMessage: "",
  selectedKey: ItemKeys.ITEM_DASHBOARD_KEY,
  selectedOpenKeys: [""],
  collapseIsOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsPageLoading: (state, action) => {
      state.isPageLoading = action.payload;
    },
    setmodalIsOpen: (state, action) => {
      state.modalIsOpen = action.payload;
    },
    setSuccessFullMessage: (state, action) => {
      state.successfullMessage = action.payload;
    },
    setSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    setSelectedOpenKeys: (state, action) => {
      state.selectedOpenKeys = action.payload;
    },
    setShowMenu: (state, action) => {
      state.collapseIsOpen = action.payload;
    },
    setResetModal: (state) => {
      state.selectedOpenKeys = [""];
      state.selectedKey = ItemKeys.ITEM_DASHBOARD_KEY;
      state.isPageLoading = false;
      state.modalIsOpen = false;
      state.successfullMessage = "";
    },
  },
});

export const {
  setIsPageLoading,
  setmodalIsOpen,
  setSuccessFullMessage,
  setSelectedKey,
  setSelectedOpenKeys,
  setResetModal,
  setShowMenu,
} = modalSlice.actions;

export default modalSlice.reducer;
