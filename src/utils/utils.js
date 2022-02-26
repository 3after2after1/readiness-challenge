const app_id = 1089;

export const ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
);

export const candleIntervals = {
  one_tick: { unit: "tick", value: 1, seconds: 1 },
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
  let same = false;

  // get time group from candle or tick datetime
  switch (interval.seconds) {
    case candleIntervals.one_tick.seconds:
      lastCandleTimeGroup = lastOHLC.date.getSeconds();
      tickTimeGroup = tick.date.getSeconds();
      break;
    case candleIntervals.one_minute.seconds:
      lastCandleTimeGroup = lastOHLC.date.getMinutes();
      tickTimeGroup = tick.date.getMinutes();
      break;
    case candleIntervals.two_minute.seconds:
      lastCandleTimeGroup = Math.trunc(lastOHLC.date.getMinutes() / 2);
      tickTimeGroup = Math.trunc(tick.date.getMinutes() / 2);
      break;
    case candleIntervals.three_minute.seconds:
      lastCandleTimeGroup = Math.trunc(lastOHLC.date.getMinutes() / 3);
      tickTimeGroup = Math.trunc(tick.date.getMinutes() / 3);
      break;
    case candleIntervals.five_minute.seconds:
      lastCandleTimeGroup = Math.trunc(lastOHLC.date.getMinutes() / 5);
      tickTimeGroup = Math.trunc(tick.date.getMinutes() / 5);
      break;
    case candleIntervals.ten_minute.seconds:
      lastCandleTimeGroup = Math.trunc(lastOHLC.date.getMinutes() / 10);
      tickTimeGroup = Math.trunc(tick.date.getMinutes() / 10);
      break;
    case candleIntervals.fifteen_minute.seconds:
      lastCandleTimeGroup = Math.trunc(lastOHLC.date.getMinutes() / 15);
      tickTimeGroup = Math.trunc(tick.date.getMinutes() / 15);
      break;
    case candleIntervals.thirty_minute.seconds:
      lastCandleTimeGroup = Math.trunc(lastOHLC.date.getMinutes() / 30);
      tickTimeGroup = Math.trunc(tick.date.getMinutes() / 30);
      break;
    case candleIntervals.one_hour.seconds:
      lastCandleTimeGroup = lastOHLC.date.getHours();
      tickTimeGroup = tick.date.getHours();
      break;
    case candleIntervals.four_hour.seconds:
      lastCandleTimeGroup = Math.trunc(lastOHLC.date.getHours() / 4);
      tickTimeGroup = Math.trunc(tick.date.getHours() / 4);
      break;
    case candleIntervals.eight_hour.seconds:
      lastCandleTimeGroup = Math.trunc(lastOHLC.date.getHours() / 8);
      tickTimeGroup = Math.trunc(tick.date.getHours() / 8);
      break;
    case candleIntervals.one_day.seconds:
      lastCandleTimeGroup = lastOHLC.date.getDate();
      tickTimeGroup = tick.date.getDate();
      break;
    default:
      console.log("error in interval");
  }

  if (
    lastCandleTimeGroup &&
    tickTimeGroup &&
    lastCandleTimeGroup === tickTimeGroup
  ) {
    same = true;
  }

  return same;
};

// update last OHLC
export const updateLastOHLC = (lastOHLC, tick) => {
  lastOHLC.close = tick.price;
  lastOHLC.high = Math.max(lastOHLC.high, tick.price);
  lastOHLC.low = Math.min(lastOHLC.low, tick.price);
  lastOHLC.volume += tick.volume ? tick.volume : 0;
};

// create new OHLC
export const createOHLC = (tick) => {
  let newOHLC = {
    date: tick.date,
    volume: tick.volume ? tick.volume : 0,
  };
  newOHLC.open = newOHLC.close = newOHLC.high = newOHLC.low = tick.price;

  return newOHLC;
};

// close data stream
export const closeStream = (stream_id) => {
  console.log("closing ", typeof stream_id);
  ws.send(
    JSON.stringify({
      forget: stream_id,
    })
  );
};

// get historical data
export const getHistoricalData = (symbol, style, interval) => {
  ws.send(
    JSON.stringify({
      ticks_history: symbol,
      adjust_start_time: 1,
      count: 100,
      end: "latest",
      style: style,
      granularity: interval.seconds,
    })
  );
};

// get tick stream
export const subscribeTickStream = (symbol) => {
  ws.send(
    JSON.stringify({
      ticks: symbol,
      subscribe: 1,
    })
  );
};
