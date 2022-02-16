import { tsvParse, csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";
// import WebSocket from "ws";

const app_id = 1089;
export const ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
);
