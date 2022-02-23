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
  chartIndicators,
} from "./../utils/utils";

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: candleInterval.one_minute,
      chart: charts.candle_stick,
      indicators: [],
    };
  }
  // accepts props: symbol
  componentDidMount() {
    ws.onmessage = (msg) => {
      let data = JSON.parse(msg.data);
      // process candle data
      if (data.msg_type === "candles") {
        let data_candles = data.candles;
        data_candles.map((e) => {
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

        if (this.state.interval === "one_tick") {
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
        // console.log(this.state.data[this.state.data.length - 1]);
      }
    };

    // get historical data and subscribe tick stream
    ws.onopen = function () {
      getHistoricalData(
        this.props.symbol,
        "candles",
        candleInterval.one_minute
      );
      subscribeTickStream(this.props.symbol);
    }.bind(this);
  }

  // change candle group interval
  changeCandleInterval = (e) => {
    // get selected interval option
    let interval = e.target.value;

    // change interval state
    if (interval === candleInterval.one_minute)
      this.setState({ interval: candleInterval.one_minute });
    else this.setState({ interval: interval });

    // call historical data on interval
    if (interval === "one_tick")
      getHistoricalData(this.props.symbol, "ticks", 60);
    else getHistoricalData(this.props.symbol, "candles", interval);
  };

  // change chart on display
  changeChart = (e) => {
    this.setState({ chart: e.target.value });
    if (e.target.value === charts.candle_stick) {
      if (this.state.interval === "one_tick") {
        this.setState({ interval: candleInterval.one_minute });
        getHistoricalData(
          this.props.symbol,
          "candles",
          candleInterval.one_minute
        );
      }
    }
  };

  // enable and disable chart indicators
  enableDisableIndicator = (indicator) => {
    if (this.state.indicators.includes(indicator)) {
      let newIndicators = this.state.indicators.filter((i) => i !== indicator);
      this.setState({ indicators: newIndicators });
    } else {
      this.state.indicators.push(indicator);
    }
  };

  render() {
    const enabledIndicatorStyle = {
      backgroundColor: "#90EE90",
    };

    const disabledIndicatorStyle = {
      backgroundColor: "#f8f8f8",
    };

    if (!this.state.data) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {this.state.chart === charts.candle_stick && (
          <CandleStickChart
            type="hybrid"
            data={this.state.data}
            indicators={this.state.indicators}
          />
        )}
        {this.state.chart === charts.line_graph && (
          <LineGraphChart
            type="hybrid"
            data={this.state.data}
            indicators={this.state.indicators}
          />
        )}
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
          <div>
            {/* indicator options */}
            <button
              onClick={() =>
                this.enableDisableIndicator(chartIndicators.simple_moving_avg)
              }
              style={
                this.state.indicators.includes(
                  chartIndicators.simple_moving_avg
                )
                  ? enabledIndicatorStyle
                  : disabledIndicatorStyle
              }
            >
              Simple Moving Average
            </button>
            <button
              onClick={() =>
                this.enableDisableIndicator(
                  chartIndicators.relative_strength_index
                )
              }
              style={
                this.state.indicators.includes(
                  chartIndicators.relative_strength_index
                )
                  ? enabledIndicatorStyle
                  : disabledIndicatorStyle
              }
            >
              Relative Strength Index
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartComponent;
