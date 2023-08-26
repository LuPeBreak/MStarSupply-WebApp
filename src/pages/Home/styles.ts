import { styled } from "../../styles";

export const PriceHighlight = styled("span", {
  variants: {
    variant: {
      income: {
        color: "$green300",
      },
      outcome: {
        color: "$red300",
      },
    },
  },
});

export const ActionsContainer = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  gap: "$2",
});
