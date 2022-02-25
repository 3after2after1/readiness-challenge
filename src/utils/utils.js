const app_id = 1089;

export const ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
);

export const candleInterval = {
  one_minute: 60,
  two_minute: 120,
  three_minute: 180,
  five_minute: 300,
  ten_minute: 600,
  fifteen_minute: 900,
  thirty_minute: 1800,
  one_hour: 3600,
  four_hour: 7200,
  eight_hour: 28800,
  one_day: 86400,
};

export const candleIntervals = {
  one_second: { unit: "second", value: 1, seconds: 1 },
  one_minute: { unit: "minute", value: 1, seconds: 60 },
  two_minute: { unit: "minute", value: 2, seconds: 120 },
  three_minute: { unit: "minute", value: 3, seconds: 180 },
  five_minute: { unit: "minute", value: 5, seconds: 300 },
  ten_minute: { unit: "minute", value: 10, seconds: 600 },
  fifteen_minute: { unit: "minute", value: 15, seconds: 900 },
  thirty_minute: { unit: "minute", value: 30, seconds: 1800 },
  one_hour: { unit: "hour", value: 1, seconds: 3600 },
  four_hour: { unit: "hour", value: 4, seconds: 7200 },
  eight_hour: { unit: "hour", value: 8, seconds: 28800 },
  one_day: { unit: "day", value: 1, seconds: 86400 },
};

export const charts = {
  candle_stick: "candle_stick",
  line_graph: "line_graph",
};

export const chartIndicators = {
  simple_moving_avg: "Simple Moving Average",
  relative_strength_index: "Relative Strength Index",
};

export const markets = {
  forex: "forex",
  crypto: "crypto",
};

// convert historical ohlc data to standardized objects
export const processHistoricalOHLC = (data, market) => {
  let processedData = data.map((item) => {
    if (market === markets.forex) {
      item.date = new Date(item.epoch * 1000);
    } else if (market === markets.crypto) {
      item.date = new Date(item.time * 1000);
    }
    item.volume = 0;

    return item;
  });

  return processedData;
};

// convert historical tick data to standardized objects
export const processHistoricalTicks = (data) => {
  let processedData = [];
  for (let i = 0; i < data.prices.length; i++) {
    let price = data.prices[i];
    processedData.push({
      date: new Date(data.times[i] * 1000),
      open: price,
      close: price,
      high: price,
      low: price,
      volume: 0,
    });
  }

  return processedData;
};

// check if current tick belongs to the same time group as the last ohlc
export const isCurrentTickTimeGroupSame = (interval, lastOHLC, tick) => {
  let lastCandleTimeGroup = null;
  let tickTimeGroup = null;
};

export const closeStream = (stream_id) => {
  console.log("closing ", stream_id);
  ws.send(
    JSON.stringify({
      forget: stream_id,
    })
  );
};

export const getHistoricalData = (symbol, style, interval) => {
  ws.send(
    JSON.stringify({
      ticks_history: symbol,
      adjust_start_time: 1,
      count: 100,
      end: "latest",
      style: style,
      granularity: interval,
    })
  );
};

export const subscribeTickStream = (symbol) => {
  ws.send(
    JSON.stringify({
      ticks: symbol,
      subscribe: 1,
    })
  );
};

// create or update candle data group
export const createUpdateCandle = (previousCandle, newTick, interval) => {
  let previousCandleTime = null;
  let newTickTimeGroup = null;
  let newCandle = null;

  // get time group from candle or tick datetime
  switch (interval) {
    case candleIntervals.one_minute.seconds:
      previousCandleTime = previousCandle.date.getMinutes();
      newTickTimeGroup = newTick.date.getMinutes();
      break;
    case candleIntervals.two_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 2);
      newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 2);
      break;
    case candleIntervals.three_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 3);
      newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 3);
      break;
    case candleIntervals.five_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 5);
      newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 5);
      break;
    case candleIntervals.ten_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 10);
      newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 10);
      break;
    case candleIntervals.fifteen_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 15);
      newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 15);
      break;
    case candleIntervals.thirty_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 30);
      newTickTimeGroup = Math.trunc(newTick.date.getMinutes() / 30);
      break;
    case candleIntervals.one_hour.seconds:
      previousCandleTime = previousCandle.date.getHours();
      newTickTimeGroup = newTick.date.getHours();
      break;
    case candleIntervals.four_hour.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getHours() / 4);
      newTickTimeGroup = Math.trunc(newTick.date.getHours() / 4);
      break;
    case candleIntervals.eight_hour.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getHours() / 8);
      newTickTimeGroup = Math.trunc(newTick.date.getHours() / 8);
      break;
    case candleIntervals.one_day.seconds:
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

export const forexTry = (state, prop) => {
  console.log("received states", state);
  // process received messages
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
      // this.setState({ data });
      state.data = data;
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
      // this.setState({ data: data_ticks_parsed });
      state.data = data_ticks_parsed;
    }

    // get tick stream
    if (data.msg_type === "tick") {
      // set stream id
      // this.setState({ stream_id: data.subscription.id });
      state.stream_id = data.subscription.id;
      let data_tick = data.tick;
      // get last candle
      // let lastCandle = this.state.data[this.state.data.length - 1];
      let lastCandle = state.data[state.data.length - 1];

      // convert epoch to date
      data_tick.date = new Date(data_tick.epoch * 1000);

      // create or update candles
      let newCandle = null;

      // if (this.state.interval === "one_tick") {
      if (state.interval === "one_tick") {
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
          // parseInt(this.state.interval)
          parseInt(state.interval)
        );
      }

      // if (newCandle) this.state.data.push(newCandle);
      if (newCandle) state.data.push(newCandle);
      // console.log(this.state.data[this.state.data.length - 1]);
    }
  };

  // get historical data and subscribe tick stream
  ws.onopen = function () {
    getHistoricalData(prop.symbol, "candles", candleInterval.one_minute);
    subscribeTickStream(prop.symbol);
  }.bind(this);

  return state;
};
