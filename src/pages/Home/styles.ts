import { styled } from "../../styles";

export const TransactionsContainer = styled("main", {
  width: "100%",
  maxWidth: "1120px",
  margin: "4rem auto 0",
  padding: "0 $6",
});

export const TransactionsTable = styled("table", {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 $2",
  marginTop: "$6",
  td: {
    padding: "$5 $8",
    background: "$gray700",
    "&:first-child": {
      "border-top-left-radius": 6,
      "border-bottom-left-radius": 6,
    },
    "&:last-child": {
      "border-top-right-radius": 6,
      "border-bottom-right-radius": 6,
    },
  },
});

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
  gap:'$2'
});
