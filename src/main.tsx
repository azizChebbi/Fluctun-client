import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./config/i18";
import AppProviders from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppProviders>
    <App />
  </AppProviders>
);
