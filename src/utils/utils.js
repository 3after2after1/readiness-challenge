const app_id = 1089;
var arrTicks = [];

export const ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
);

export const create_candle_data = (tick) => {
  let single_candle = {};

  if (arrTicks.length === 0) arrTicks.push(tick);
  else {
    if (arrTicks[0].date.getMinutes() === tick.date.getMinutes())
      arrTicks.push(tick);
    else {
      let quotes = arrTicks.map((tick) => tick.quote);

      // set candle data
      single_candle.date = new Date(arrTicks[0].date.setSeconds(0, 0));
      single_candle.open = arrTicks[0].quote;
      single_candle.close = arrTicks[arrTicks.length - 1].quote;
      single_candle.high = Math.max(...quotes);
      single_candle.low = Math.min(...quotes);
      single_candle.volume = 0;

      arrTicks = [];
    }
  }

  return single_candle;
};
