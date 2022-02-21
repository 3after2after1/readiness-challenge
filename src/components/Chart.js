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

        let newCandle = null;
        if (!this.state.interval) {
          newCandle = this.createCandle(
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
          newCandle = this.createCandle(
            lastCandle,
            data_tick,
            parseInt(this.state.interval)
          );
        }

        if (newCandle) this.state.data.push(newCandle);
        console.log(this.state.data[this.state.data.length - 1]);
      }
    };

    ws.onopen = function () {
      getHistoricalData("R_50", "candles", candleInterval.one_minute);
      subscribeTickStream("R_50");
    };
  }

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

  // create candle data group
  createCandle = (previousCandle, newTick, interval) => {
    let previousCandleTime = null;
    let newTickTimeGroup = null;
    let newCandle = null;

    // get time group from candle or tick datetime
    switch (interval) {
      case candleInterval.one_minute:
        previousCandleTime = previousCandle.date.getMinutes();
        newTickTimeGroup = newTick.date.getMinutes();
        break;
      case candleInterval.two_minute:
        previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 2);
        newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 2);
        break;
      case candleInterval.three_minute:
        previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 3);
        newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 3);
        break;
      case candleInterval.five_minute:
        previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 5);
        newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 5);
        break;
      case candleInterval.ten_minute:
        previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 10);
        newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 10);
        break;
      case candleInterval.fifteen_minute:
        previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 15);
        newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 15);
        break;
      case candleInterval.thirty_minute:
        previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 30);
        newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 30);
        break;
      case candleInterval.one_hour:
        previousCandleTime = previousCandle.date.getHours();
        newTickTimeGroup = newTick.date.getHours();
        break;
      case candleInterval.four_hour:
        previousCandleTime = Math.trunc(previousCandle.date.getHours() / 4);
        newTickTimeGroup = Math.trunc(newTick.date.getHours() / 4);
        break;
      case candleInterval.eight_hour:
        previousCandleTime = Math.trunc(previousCandle.date.getHours() / 8);
        newTickTimeGroup = Math.trunc(newTick.date.getHours() / 8);
        break;
      case candleInterval.one_day:
        previousCandleTime = previousCandle.date.getDate();
        newTickTimeGroup = newTick.date.getDate();
        break;
      default:
        console.log("error in interval");
    }

    // compare time
    if (previousCandleTime === newTickTimeGroup) {
      previousCandle.close = newTick.quote;
      previousCandle.high = Math.max(previousCandle.high, newTick.quote);
      previousCandle.low = Math.min(previousCandle.low, newTick.quote);
    } else {
      newCandle = {
        date: new Date(newTick.date.setSeconds(0, 0)),
        open: newTick.quote,
        close: newTick.quote,
        high: newTick.quote,
        low: newTick.quote,
        volume: 0,
      };
    }

    return newCandle;
  };

  // change chart on display
  changeChart = (e) => {
    if (e.target.value === charts.candle_stick) {
      this.setState({ chart: null, interval: 60 });
      getHistoricalData("R_50", "candles", candleInterval.one_minute);
    } else {
      this.setState({ chart: e.target.value });
    }
  };

  // get historical ticks
  getHistoricalTicks = () => {
    getHistoricalData("R_50", "ticks", 60);
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
