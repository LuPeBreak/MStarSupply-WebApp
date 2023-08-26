import { styled } from "../../styles";

export const Table = styled("table", {
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
