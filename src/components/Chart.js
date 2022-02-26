import React from "react";
import CandleStickChart from "./CandleStickChart";
import LineGraphChart from "./LineGraphChart";
import {
  ws,
  getHistoricalData,
  closeStream,
  subscribeTickStream,
  charts,
  chartIndicators,
  candleIntervals,
  processHistoricalOHLC,
  processHistoricalTicks,
  isCurrentTickTimeGroupSame,
  updateLastOHLC,
  createOHLC,
  markets,
} from "./../utils/utils";
import {
  getCryptoHistoricalData,
  ws_cc,
  closeCryptoStream,
  createCryptoSubs,
  subscribeCryptoTickStream,
} from "../utils/utils-cryptocompare";

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

          // standardise tick data
          data_tick.date = new Date(data_tick.epoch * 1000);
          data_tick.price = data_tick.quote;

          // check if new tick belongs to the same time group of last OHLC
          let sameTimeGroup = isCurrentTickTimeGroupSame(
            this.state.interval,
            lastCandle,
            data_tick
          );

          // if time group of previous OHLC and current tick same, update the previous OHLC, else create new OHLC
          let newOHLC = null;
          if (sameTimeGroup) {
            updateLastOHLC(lastCandle, data_tick);
          } else {
            newOHLC = createOHLC(data_tick);
          }

          if (newOHLC) this.state.data.push(newOHLC);
        }
      };

      // get historical data and subscribe tick stream
      ws.onopen = function () {
        getHistoricalData(this.props.symbol, "candles", this.state.interval);
        subscribeTickStream(this.props.symbol);
      }.bind(this);
    } else {
      // process crypto data
      // get historical data
      getCryptoHistoricalData(this.props.symbol, this.state.interval).then(
        (data) => {
          let processedData = processHistoricalOHLC(data, this.props.market);
          this.setState({ data: processedData });

          ws_cc.onopen = function () {
            subscribeCryptoTickStream(createCryptoSubs(this.props.symbol));
          }.bind(this);
        }
      );

      ws_cc.onmessage = (msg) => {
        this.setState({ stream_id: createCryptoSubs(this.props.symbol) });
        let data = JSON.parse(msg.data);

        if (data.TYPE === "5") {
          let lastCandle = this.state.data[this.state.data.length - 1];

          // response must contain date and price
          if (data.LASTUPDATE && data.PRICE) {
            // standardise tick data
            data.date = new Date(data.LASTUPDATE * 1000);
            data.price = data.PRICE;

            // check if new tick belongs to the same time group of last OHLC
            let sameTimeGroup = isCurrentTickTimeGroupSame(
              this.state.interval,
              lastCandle,
              data
            );

            // if time group of previous OHLC and current tick same, update the previous OHLC, else create new OHLC
            let newOHLC = null;
            if (sameTimeGroup) {
              updateLastOHLC(lastCandle, data);
            } else {
              newOHLC = createOHLC(data);
            }

            if (newOHLC) this.state.data.push(newOHLC);
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

  // change ohlc chart interval
  changeOHLCInterval = (e) => {
    let interval = candleIntervals[e.target.value];
    this.setState({ interval: interval });

    if (this.props.market === "forex") {
      if (interval.seconds === candleIntervals.one_tick.seconds)
        getHistoricalData(
          this.props.symbol,
          "ticks",
          candleIntervals.one_minute
        );
      else getHistoricalData(this.props.symbol, "candles", interval);
    } else {
      getCryptoHistoricalData(this.props.symbol, interval).then((data) => {
        let processedData = processHistoricalOHLC(data, this.props.market);
        this.setState({ data: processedData });
      });
    }
  };

  // change chart on display
  changeChart = (e) => {
    this.setState({ chart: e.target.value });
    if (e.target.value === charts.candle_stick) {
      if (
        this.state.interval.seconds === candleIntervals.one_tick.seconds &&
        this.props.market === "forex"
      ) {
        this.setState({ interval: candleIntervals.one_minute });
        getHistoricalData(
          this.props.symbol,
          "candles",
          candleIntervals.one_minute
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

    // change interval options depending on market and chart type
    let intervalOptions = { ...candleIntervals };
    if (
      !(this.props.market === "forex" && this.state.chart === charts.line_graph)
    ) {
      delete intervalOptions.one_tick;
    }

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
              this.props.market === "forex"
                ? closeStream(this.state.stream_id)
                : closeCryptoStream([this.state.stream_id]);
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
            <select onChange={this.changeOHLCInterval}>
              {Object.keys(intervalOptions).map((interval) => {
                return (
                  <option key={interval} value={interval}>
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
