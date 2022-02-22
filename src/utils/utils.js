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

export const charts = {
  candle_stick: "candle_stick",
  line_graph: "line_graph",
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
