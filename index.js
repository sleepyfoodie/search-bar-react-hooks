import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { StateProvider } from "./store.js";

const app = (
  <App />
);

ReactDOM.render(app, document.getElementById("root"));
