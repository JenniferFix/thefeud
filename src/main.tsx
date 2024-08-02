import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Theme } from "react-daisyui";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Theme dataTheme="aqua">
        <App />
      </Theme>
    </RecoilRoot>
  </React.StrictMode>
);
