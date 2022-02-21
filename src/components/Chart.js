import React from "react";
import CandleStickChart from "./CandleStickChart";
import LineGraphChart from "./LineGraphChart";
import {
  ws,
  getHistoricalData,
  closeStream,
  subscribeTickStream,
  candleInterval,
  charts,
} from "./../utils/utils";
import { TypeChooser } from "react-stockcharts/lib/helper";
// import CandleStickStockScaleChart from "./CandleStickChart";
// import LineAndScatterChart from "./LineGraphChart";

class ChartComponent extends React.Component {
  componentDidMount() {
    console.log("hello there ", this.state);
    ws.onmessage = (msg) => {
      let data = JSON.parse(msg.data);

      // process candle data
      if (data.msg_type === "candles") {
        console.log("response historical data received");
        let data_candles = data.candles;
        data_candles.map((e, i) => {
          e.date = new Date(e.epoch * 1000);
          e.volume = 0;
        });
        data = data_candles;
        console.log("setting state.data");
        console.log("new data ", data);
        // data.pop();
        console.log("popped data ", data);
        this.setState({ data });
        console.log("complete setting state.data");
      }

      // get tick stream
      if (data.msg_type === "tick") {
        // set stream id
        this.setState({ stream_id: data.subscription.id });
        let data_tick = data.tick;
        // get last candle
        let lastCandle = this.state.data[this.state.data.length - 1];

        // convert epoch to date
        data_tick.date = new Date(data_tick.epoch * 1000);

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
      getHistoricalData("R_50", "candles", candleInterval.one_minute);
      subscribeTickStream("R_50");
    };
  }

  changeCandleInterval(e) {
    // get selected interval option
    let interval = e.target.value;
    console.log(interval);

    // call historical data on interval
    getHistoricalData("R_50", "candles", interval);
  }

  changeChart = (e) => {
    console.log(e.target.value);
    if (e.target.value === charts.candle_stick) this.setState({ chart: null });
    else this.setState({ chart: e.target.value });

    console.log("statess ", this.state);
  };

  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <TypeChooser>
          {(type) => {
            let chart = null;
            console.log("chart ", this.state.chart);
            if (!this.state.chart) {
              chart = (
                <CandleStickChart
                  style={{ passive: false }}
                  type={type}
                  data={this.state.data}
                />
              );
            } else if (this.state.chart === charts.line_graph) {
              chart = (
                <LineGraphChart
                  style={{ passive: false }}
                  type={type}
                  data={this.state.data}
                />
              );
            }
            return chart;
          }}
        </TypeChooser>
        <div>
          <button onClick={() => closeStream(this.state.stream_id)}>
            end connection
          </button>
          <div>
            <p>Change chart:</p>
            <select onChange={this.changeChart}>
              {Object.keys(charts).map((chart) => {
                return (
                  <option key={chart} value={charts[chart]}>
                    {chart}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <p>Change candle interval:</p>
            <select onChange={this.changeCandleInterval}>
              {this.state.chart === charts.line_graph && (
                <option key={"one_tick"} value="one_tick">
                  one_tick
                </option>
              )}
              {Object.keys(candleInterval).map((interval) => {
                return (
                  <option key={interval} value={candleInterval[interval]}>
                    {interval}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartComponent;
