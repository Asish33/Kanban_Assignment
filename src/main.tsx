import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/poppins/index.css"; 


createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <App />
  </StrictMode>
);
