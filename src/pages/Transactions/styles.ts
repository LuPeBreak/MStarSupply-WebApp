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
