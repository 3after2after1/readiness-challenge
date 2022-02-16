import React from "react";
import ReactDOM from "react-dom";
import Home from "./views/home/Home";
import Chart from "./components/Chart";
import { ws } from "./utils/utils";
import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
  componentDidMount() {
    // getData().then((data) => {
    //   this.setState({ data });
    //   console.log(data);
    // });
    ws.onmessage = (msg) => {
      let data = JSON.parse(msg.data);
      let data_candles = data.candles;
      data_candles.map((e, i) => {
        e.date = new Date(e.epoch * 1000);
        e.volume = 0;
      });
      data = data_candles;
      console.log(data);
      this.setState({ data });
    };

    ws.onopen = function () {
      ws.send(
        JSON.stringify({
          ticks_history: "R_50",
          adjust_start_time: 1,
          count: 100,
          end: "latest",
          start: 1,
          style: "candles",
        })
      );
    };
  }

  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <TypeChooser>
        {(type) => (
          <Chart
            style={{ passive: false }}
            type={type}
            data={this.state.data}
          />
        )}
      </TypeChooser>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ChartComponent />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
