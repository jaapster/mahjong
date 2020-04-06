import * as React from "react";
import * as ReactDOM from "react-dom";
import Banner from "./components/Banner/Banner";
import "./styles/global.scss";

ReactDOM.render(
  <div>
    <Banner name="Max" />
  </div>,
  document.getElementById("app"),
);