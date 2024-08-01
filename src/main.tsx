import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Theme } from "react-daisyui";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme dataTheme="dark">
      <App />
    </Theme>
  </React.StrictMode>,
);
