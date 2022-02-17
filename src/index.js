import React from "react";
import ReactDOM from "react-dom";
import Home from "./views/home/Home";
import Chart from "./components/Chart";
import { ws, create_candle_data } from "./utils/utils";
import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
  componentDidMount() {
    ws.onmessage = (msg) => {
      let data = JSON.parse(msg.data);

      if (data.msg_type === "candles") {
        let data_candles = data.candles;
        data_candles.map((e, i) => {
          e.date = new Date(e.epoch * 1000);
          e.volume = 0;
        });
        data = data_candles;
        // console.log(data);
        this.setState({ data });
      }

      // get tick stream
      if (data.msg_type === "tick") {
        // set stream id
        this.setState({ stream_id: data.subscription.id });

        let data_tick = data.tick;
        // convert epoch to date
        data_tick.date = new Date(data_tick.epoch * 1000);

        // convert ticks to candle
        let single_candle = create_candle_data(data_tick);

        // if candle object is not empty, update state data of candles
        if (Object.keys(single_candle).length !== 0) {
          console.log("index ", single_candle);

          // combine candles if previous candle has the same minute with the new candle
          if (
            this.state.data[this.state.data.length - 1].date.getMinutes() ===
            single_candle.date.getMinutes()
          ) {
            console.log("same second");
            this.state.data[this.state.data.length - 1].close =
              single_candle.close;
            this.state.data[this.state.data.length - 1].high = Math.max(
              this.state.data[this.state.data.length - 1].high,
              single_candle.high
            );
            this.state.data[this.state.data.length - 1].low = Math.min(
              this.state.data[this.state.data.length - 1].low,
              single_candle.low
            );
          } else {
            console.log(
              "diff ",
              this.state.data[this.state.data.length - 1].date,
              single_candle.date
            );
            this.state.data.push(single_candle);
          }

          console.log(this.state.data.length);
        }
      }
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

      ws.send(
        JSON.stringify({
          ticks: "R_50",
          subscribe: 1,
        })
      );
    };

    // to close tick stream
    const closeStream = () => {
      console.log("closing");
      ws.send(
        JSON.stringify({
          forget: this.state.stream_id,
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
