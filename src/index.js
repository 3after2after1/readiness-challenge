import React from "react";
import ReactDOM from "react-dom";
import Chart from "./components/Chart";
import Details from "./views/home/Details";

ReactDOM.render(
  <React.StrictMode>
    {/* <Chart symbol="R_50" market="forex" /> */}
    {/* <Chart symbol="R_50" /> */}
    <Details />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
