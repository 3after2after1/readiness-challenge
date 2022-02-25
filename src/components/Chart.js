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
  candleIntervals,
  processHistoricalOHLC,
  processHistoricalTicks,
} from "./../utils/utils";
import {
  getCryptoHistoricalData,
  cryptoIntervals,
  ws_cc,
  closeCryptoStream,
  createCryptoSubs,
  subscribeCryptoTickStream,
  createUpdateCryptoCandle,
} from "../utils/utils-cryptocompare";
import { last } from "react-stockcharts/lib/utils";

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: candleIntervals.one_minute,
      chart: charts.candle_stick,
      indicators: [],
    };
  }
  // accepts props: symbol
  componentDidMount() {
    if (this.props.market === "forex") {
      ws.onmessage = (msg) => {
        let data = JSON.parse(msg.data);

        // process candle data
        if (data.msg_type === "candles") {
          let data_candles = data.candles;
          let data_processed = processHistoricalOHLC(
            data_candles,
            this.props.market
          );
          this.setState({ data: data_processed });
        }

        // process historical tick data
        if (data.msg_type === "history") {
          let data_ticks = data.history;
          let processedData = processHistoricalTicks(data_ticks);
          this.setState({ data: processedData });
        }

        // get tick stream
        if (data.msg_type === "tick") {
          // set stream id
          this.setState({ stream_id: data.subscription.id });
          let data_tick = data.tick;
          let lastCandle = this.state.data[this.state.data.length - 1];
          // let lastOHLC = this.state.data[this.state.data.length - 1];

          // convert epoch to date
          data_tick.date = new Date(data_tick.epoch * 1000);
          data_tick.price = data_tick.quote;

          // check if new tick belongs to the same time group of last OHLC

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
              parseInt(this.state.interval.seconds)
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
          candleIntervals.one_minute.seconds
        );
        subscribeTickStream(this.props.symbol);
      }.bind(this);
    } else {
      // process crypto data
      console.log("process crypto");

      // get historical data
      getCryptoHistoricalData("BTC", cryptoIntervals.one_minute).then(
        (data) => {
          let processedData = processHistoricalOHLC(data, this.props.market);
          this.setState({ data: processedData });

          ws.onopen = function () {
            console.log(createCryptoSubs("BTC"));

            subscribeCryptoTickStream(createCryptoSubs("BTC"));
          };
        }
      );

      ws_cc.onmessage = (msg) => {
        this.setState({ stream_id: createCryptoSubs("BTC") });
        let data = JSON.parse(msg.data);

        if (data.TYPE === "5") {
          console.log("new tick: ", data);
          let lastCandle = this.state.data[this.state.data.length - 1];

          // response must contain date and price
          if (data.LASTUPDATE && data.PRICE) {
            data.DATE = new Date(data.LASTUPDATE * 1000);

            // create new candle
            let newCandle = null;

            if (this.state.interval === "one_tick") {
              newCandle = {
                date: data.DATE,
                open: data.PRICE,
                close: data.PRICE,
                high: data.PRICE,
                low: data.PRICE,
                volume: data.LASTVOLUME,
              };
            } else {
              newCandle = createUpdateCryptoCandle(
                lastCandle,
                data,
                parseInt(this.state.interval.seconds)
              );
            }

            console.log("newCandle ", newCandle);
            if (newCandle) this.state.data.push(newCandle);
          }
        }
      };
    }
  }

  componentWillUnmount = () => {
    if (this.props.market === "forex") {
      closeStream(this.state.stream_id);
    } else {
      closeCryptoStream([this.state.subs]);
    }
  };

  // change candle group interval
  changeCandleInterval = (e) => {
    // get selected interval option
    let interval = e.target.value;

    // change interval state
    if (interval === candleIntervals.one_minute)
      this.setState({ interval: candleIntervals.one_minute });
    else this.setState({ interval: interval });

    // call historical data on interval
    if (this.props.market === "forex") {
      if (interval === "one_tick")
        getHistoricalData(this.props.symbol, "ticks", 60);
      else getHistoricalData(this.props.symbol, "candles", interval.seconds);
    } else {
      getCryptoHistoricalData("BTC", interval).then((data) => {
        console.log("data in", data);
        this.setState({ data });
      });
    }
  };

  // change chart on display
  changeChart = (e) => {
    this.setState({ chart: e.target.value });
    if (e.target.value === charts.candle_stick) {
      if (this.state.interval === "one_tick") {
        this.setState({ interval: candleIntervals.one_minute });
        getHistoricalData(
          this.props.symbol,
          "candles",
          candleIntervals.one_minute.seconds
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
          <button
            onClick={() => {
              this.state.market === "forex"
                ? closeStream(this.state.stream_id)
                : closeCryptoStream([this.state.stream_id]);

              console.log("stream_id ", this.state.stream_id);
            }}
          >
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
              {Object.keys(candleIntervals).map((interval) => {
                return (
                  <option key={interval} value={candleIntervals[interval]}>
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
