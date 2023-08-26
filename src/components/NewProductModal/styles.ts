import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "../../styles";

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.75)",
});

export const Content = styled(Dialog.Content, {
  minWidth: "32rem",
  borderRadius: 6,
  padding: "$10 $12",
  backgroundColor: "$gray800",

  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  form: {
    marginTop: "$8",

    display: "flex",
    flexDirection: "column",
    gap: "$4",

    "input, select, textarea": {
      borderRadius: 6,
      border: 0,
      background: "$gray900",
      color: "$gray300",

      padding: "$4",

      "&::placeholder": {
        color: "$gray500",
      },
    },

    textarea: {
      resize: "vertical",
    },

    'button[type="submit"]': {
      height: 58,
      border: 0,
      background: "$green500",
      color: "$white",
      fontWeight: "$bold",
      padding: "0 $5",
      borderRadius: 6,
      marginTop: "$6",

      cursor: "pointer",

      "&:disabled": {
        opacity: 0.6,
        cursor: "not-allowed",
      },

      "&:not(:disabled):hover": {
        background: "$green700",
        transition: "background-color 0.2s",
      },
    },
  },
});

export const CloseButton = styled(Dialog.Close, {
  position: "absolute",
  backgroundColor: "transparent",
  border: 0,
  top: "$6",
  right: "$6",
  lineHeight: 0,
  cursor: "pointer",
  color: "$gray500",
});
