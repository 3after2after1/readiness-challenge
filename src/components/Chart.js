import React from "react";
import CandleStickChart from "./CandleStickChart";
import {
  ws,
  getHistoricalData,
  closeStream,
  subscribeTickStream,
  candleInterval,
} from "./../utils/utils";
import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
  componentDidMount() {
    ws.onmessage = (msg) => {
      let data = JSON.parse(msg.data);

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
        // set candle interval
        let candle_interval = candleInterval.one_minute;

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
    console.log(this.state.data.length);
  }

  changeChartInterval(e) {
    this.setState({ interval: e.target.value });
    console.log(this.state.interval);
  }

  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <TypeChooser>
          {(type) => (
            <CandleStickChart
              style={{ passive: false }}
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser>
        <button onClick={() => closeStream(this.state.stream_id)}>Close</button>
        <button
          onClick={() => this.changeCandleInterval(candleInterval.one_hour)}
        >
          trial btn
        </button>
        <select
          // value={this.state.interval}
          onChange={this.changeCandleInterval}
        >
          <option value={candleInterval.one_minute}>1 minute</option>
          <option value={candleInterval.one_hour}>1 hour</option>
          <option value={candleInterval.one_day}>1 day</option>
        </select>
      </div>
    );
  }
}

export default ChartComponent;
