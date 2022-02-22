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
  createUpdateCandle,
} from "./../utils/utils";
import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
  componentDidMount() {
    ws.onmessage = (msg) => {
      let data = JSON.parse(msg.data);

      // process candle data
      if (data.msg_type === "candles") {
        let data_candles = data.candles;
        data_candles.map((e, i) => {
          e.date = new Date(e.epoch * 1000);
          e.volume = 0;
        });
        data = data_candles;
        this.setState({ data });
      }

      // process historical tick data
      if (data.msg_type === "history") {
        let data_ticks = data.history;
        let data_ticks_parsed = [];
        for (let i = 0; i < data_ticks.prices.length; i++) {
          let price = data_ticks.prices[i];
          data_ticks_parsed.push({
            date: new Date(data_ticks.times[i] * 1000),
            open: price,
            close: price,
            high: price,
            low: price,
            volume: 0,
          });
        }
        this.setState({ data: data_ticks_parsed });
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

        // create or update candles
        let newCandle = null;
        if (!this.state.interval) {
          newCandle = createUpdateCandle(
            lastCandle,
            data_tick,
            candleInterval.one_minute
          );
        } else if (this.state.interval === "one_tick") {
          newCandle = {
            date: new Date(data_tick.date),
            open: data_tick.quote,
            close: data_tick.quote,
            high: data_tick.quote,
            low: data_tick.quote,
            volume: 0,
          };
        } else {
          newCandle = createUpdateCandle(
            lastCandle,
            data_tick,
            parseInt(this.state.interval)
          );
        }

        if (newCandle) this.state.data.push(newCandle);
        console.log(this.state.data[this.state.data.length - 1]);
      }
    };

    // get historical data and subscribe tick stream
    ws.onopen = function () {
      getHistoricalData("R_50", "candles", candleInterval.one_minute);
      subscribeTickStream("R_50");
    };
  }

  // change candle group interval
  changeCandleInterval = (e) => {
    // get selected interval option
    let interval = e.target.value;
    console.log(interval);

    // change interval state
    if (interval === candleInterval.one_minute)
      this.setState({ interval: null });
    else this.setState({ interval: interval });

    // call historical data on interval
    if (interval === "one_tick") getHistoricalData("R_50", "ticks", 60);
    else getHistoricalData("R_50", "candles", interval);
  };

  // change chart on display
  changeChart = (e) => {
    if (e.target.value === charts.candle_stick) {
      this.setState({ chart: null });
      if (this.state.interval === "one_tick") {
        this.setState({ interval: candleInterval.one_minute });
        getHistoricalData("R_50", "candles", candleInterval.one_minute);
      }
    } else {
      this.setState({ chart: e.target.value });
    }
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
