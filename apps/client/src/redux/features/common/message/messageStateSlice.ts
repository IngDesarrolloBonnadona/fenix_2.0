import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MessageState = {
  type: null,
  content: "",
  isVisible: false,
};

export const messageStateSlice = createSlice({
  name: "messageState",
  initialState,
  reducers: {
    setShowMessage: (
      state,
      action: PayloadAction<{
        type: "success" | "error" | "info" | "warning";
        content: string;
      }>
    ) => {
      state.type = action.payload.type;
      state.content = action.payload.content;
      state.isVisible = true;
    },
    setHideMessage: (state) => {
      state.isVisible = false;
      state.type = null;
      state.content = "";
    },
  },
});

export const { setShowMessage, setHideMessage } = messageStateSlice.actions;

export default messageStateSlice.reducer;
