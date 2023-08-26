import { styled } from "../../styles";

export const NewTransactionButton = styled("button", {
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
});
