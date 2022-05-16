import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "bulma/css/bulma.css";
import axios from "axios";

axios.defaults.withCredentials = true;

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
