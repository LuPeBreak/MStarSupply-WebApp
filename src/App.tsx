import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { globalStyles } from "./styles/global";

globalStyles();

function App() {
  return (
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  );
}

export default App;
