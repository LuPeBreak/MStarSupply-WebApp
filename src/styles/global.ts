import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  "*:focus": {
    outline: 0,
    borderRadius: 2,
    boxShadow: "0 0 0 2px $colors$green500",
  },
  body: {
    backgroundColor: "$gray800",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },
  "body, input, textarea, button": {
    font: "400 1rem Roboto, sans-serif",
  },
});
