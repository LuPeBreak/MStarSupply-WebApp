import { styled } from "../../styles";

export const HeaderContainer = styled("header", {
  backgroundColor: "$gray900",
  padding: "$10 0 $30",
});

export const HeaderContent = styled("div", {
  width: "100%",
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "0 $6",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
