import { styled } from "../../styles";

export const DashboardContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  "& > div": {
    "& > button": {
      height: "50px",
      border: 0,
      background: "$green500",
      color: "$white",
      fontWeight: "$bold",
      padding: "0 $5",
      borderRadius: 6,
      cursor: "pointer",

      "&:hover": {
        background: "$green700",
        transition: "background-color 0.2s",
      },
    },

    "input, select": {
      borderRadius: 6,
      border: 0,
      background: "$gray900",
      color: "$gray300",

      padding: "$4",

      "&::placeholder": {
        color: "$gray500",
      },
    },
  },
});

export const GraphicsContainer = styled("div", {});
