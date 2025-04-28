"use client";

import React, { useEffect } from "react";
import { message as messageAntd } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setHideMessage } from "@/redux/features/common/message/messageStateSlice";

const CustomMessageState: React.FC = () => {
  const dispatch = useDispatch();
  const { type, content, isVisible } = useSelector(
    (state: RootState) => state.messageState
  );

  useEffect(() => {
    if (isVisible && content) {
      const template = messageAntd.open({
        type: type || "success",
        content,
        duration: 3,
        style: { fontSize: 14, marginTop: "2vh" },
        onClose: () => dispatch(setHideMessage()),
      });

      return () => {
        template();
      };
    }
  }, [content, type, isVisible, dispatch]);

  return null;
};

export default CustomMessageState;
