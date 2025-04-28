interface MessageState {
  type: "success" | "error" | "info" | "warning" | null;
  content: string;
  isVisible: boolean;
}
