import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Prueba from "./Prueba.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Prueba />
  </StrictMode>
);
