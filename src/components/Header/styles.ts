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

  img: {
    marginLeft: "-$8",
  },

  nav: {
    display: "flex",
    gap: "$4",

    a: {
      textDecoration: "none",
      fontSize: "$xl",
      color: "$gray300",
      Cursor: "pointer",

      "&:hover": {
        color: "$green300",
        transition: "color 0.2s",
      },
    },
  },
});
