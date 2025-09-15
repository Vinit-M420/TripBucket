import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // or your global styles



document.title = "TripBucket"; // set page title
const link =
  document.querySelector("link[rel~='icon']") || document.createElement("link");
link.setAttribute("rel", "icon");
link.setAttribute("href", "favicon.png"); // path from public/
document.head.appendChild(link);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);