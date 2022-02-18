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

        // get last candle
        let lastCandle = this.state.data[this.state.data.length - 1];

        // check if the datetime (minute) of last candle and new tick is the same
        if (lastCandle.date.getMinutes() === data_tick.date.getMinutes()) {
          lastCandle.close = data_tick.quote;
          lastCandle.high = Math.max(lastCandle.high, data_tick.quote);
          lastCandle.low = Math.min(lastCandle.low, data_tick.quote);
        } else {
          let newCandle = {
            date: new Date(data_tick.date.setSeconds(0, 0)),
            open: data_tick.quote,
            close: data_tick.quote,
            high: data_tick.quote,
            low: data_tick.quote,
            volume: 0,
          };

          this.state.data.push(newCandle);
        }

        console.log(this.state.data[this.state.data.length - 1]);
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
