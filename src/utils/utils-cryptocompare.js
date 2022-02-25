import { candleIntervals } from "./utils";

// crypto-compare site api key
export const CC_API_KEY =
  "ff5a594decd73691c1c1603361f178507b88ff9c63e849d4f4db59eb0614092c";

export const ws_cc = new WebSocket(
  "wss://streamer.cryptocompare.com/v2?api_key=" + CC_API_KEY
);

export const cryptoIntervals = {
  one_minute: { unit: "minute", value: 1 },
  two_minute: { unit: "minute", value: 2 },
  three_minute: { unit: "minute", value: 3 },
  five_minute: { unit: "minute", value: 5 },
  ten_minute: { unit: "minute", value: 10 },
  fifteen_minute: { unit: "minute", value: 15 },
  thirty_minute: { unit: "minute", value: 30 },
  one_hour: { unit: "hour", value: 1 },
  four_hour: { unit: "hour", value: 4 },
  eight_hour: { unit: "hour", value: 8 },
  one_day: { unit: "day", value: 1 },
};

export const convertDataObject = (candles) => {
  candles.forEach((candle, index) => {
    candles[index].date = new Date(candle.time * 1000);
    candles[index].volume = candle.volumeto;
  });

  return candles;
};

export function getCryptoHistoricalData(
  symbol,
  interval,
  limit = 200,
  lastDate = null,
  toSymbol = "USD"
) {
  let toTs = lastDate ? `&toTs=${lastDate}` : "";
  let url =
    `https://min-api.cryptocompare.com/data/v2/histo${interval.unit}?fsym=${symbol}&tsym=${toSymbol}&limit=${limit}&aggregate=${interval.value}&e=CCCAGG` +
    toTs +
    `&api_key=` +
    CC_API_KEY;

  const promiseHistorical = fetch(url)
    .then((response) => response.json())
    // .then((data) => convertDataObject(data.Data.Data));
    .then((data) => data.Data.Data);

  return promiseHistorical;
}

export const closeCryptoStream = (subs) => {
  ws_cc.send(
    JSON.stringify({
      action: "SubRemove",
      subs: subs,
    })
  );
};

export const createCryptoSubs = (symbol) => {
  return `5~CCCAGG~${symbol}~USD`;
};

export const subscribeCryptoTickStream = (subs) => {
  ws_cc.send(
    JSON.stringify({
      action: "SubAdd",
      subs: [subs],
    })
  );
};

export const createUpdateCryptoCandle = (previousCandle, newTick, interval) => {
  let previousCandleTime = null;
  let newTickTimeGroup = null;
  let newCandle = null;
  console.log("in interval ", interval);
  // get time group from candle or tick datetime
  switch (interval) {
    case candleIntervals.one_minute.seconds:
      previousCandleTime = previousCandle.date.getMinutes();
      newTickTimeGroup = newTick.DATE.getMinutes();
      break;
    case candleIntervals.two_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 2);
      newTickTimeGroup = Math.trunc(newTick.DATE.getMinutes() / 2);
      break;
    case candleIntervals.three_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 3);
      newTickTimeGroup = Math.trunc(newTick.DATE.getMinutes() / 3);
      break;
    case candleIntervals.five_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 5);
      newTickTimeGroup = Math.trunc(newTick.DATE.getMinutes() / 5);
      break;
    case candleIntervals.ten_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 10);
      newTickTimeGroup = Math.trunc(newTick.DATE.getMinutes() / 10);
      break;
    case candleIntervals.fifteen_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 15);
      newTickTimeGroup = Math.trunc(newTick.DATE.getMinutes() / 15);
      break;
    case candleIntervals.thirty_minute.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getMinutes() / 30);
      newTickTimeGroup = Math.trunc(newTick.DATE.getMinutes() / 30);
      break;
    case candleIntervals.one_hour.seconds:
      previousCandleTime = previousCandle.date.getHours();
      newTickTimeGroup = newTick.DATE.getHours();
      break;
    case candleIntervals.four_hour.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getHours() / 4);
      newTickTimeGroup = Math.trunc(newTick.DATE.getHours() / 4);
      break;
    case candleIntervals.eight_hour.seconds:
      previousCandleTime = Math.trunc(previousCandle.date.getHours() / 8);
      newTickTimeGroup = Math.trunc(newTick.DATE.getHours() / 8);
      break;
    case candleIntervals.one_day.seconds:
      previousCandleTime = previousCandle.date.getDate();
      newTickTimeGroup = newTick.DATE.getDate();
      break;
    default:
      console.log("error in interval");
  }

  // compare time
  console.log(previousCandleTime, newTickTimeGroup);
  if (previousCandleTime === newTickTimeGroup) {
    console.log("same time group");
    previousCandle.close = newTick.PRICE;
    previousCandle.high = Math.max(previousCandle.high, newTick.PRICE);
    previousCandle.low = Math.min(previousCandle.low, newTick.PRICE);
  } else {
    newCandle = {
      date: new Date(newTick.DATE.setSeconds(0, 0)),
      open: newTick.PRICE,
      close: newTick.PRICE,
      high: newTick.PRICE,
      low: newTick.PRICE,
      volume: newTick.LASTVOLUME,
    };
  }

  return newCandle;
};
