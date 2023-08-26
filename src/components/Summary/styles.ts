import { styled } from "../../styles";

export const SummaryContainer = styled("section", {
  width: "100%",
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "0 $6",

  display: "grid",
  "grid-template-columns": "repeat(3, 1fr)",
  gap: "$8",

  marginTop: "-$20",
});

export const SummaryCard = styled("div", {
  borderRadius: 6,
  padding: "$8",

  header: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    color: "$gray300",
  },

  strong: {
    display: "block",
    marginTop: "1rem",
    fontSize: "2rem",
  },

  variants: {
    variant: {
      default: {
        backgroundColor: "$gray600",
      },
      green: {
        backgroundColor: "$green700",
      },
    },
  },

  defaultVariants: {
    variant: "default",
  },
});
