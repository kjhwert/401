import { worker } from "@/mocks/node";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

worker.start().then(() => {
  const rootEl = document.getElementById("root");
  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
});
