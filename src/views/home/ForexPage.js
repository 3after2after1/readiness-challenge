import "../../App.css";
import { useEffect, useState } from "react";
import protobuf from "protobufjs";
import StaticChart from "../../components/StaticChart";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const { Buffer } = require("buffer/");
const data = require("../../majorPair.json");
const mapper = require("../../symbolMapper.json");
// console.log(Object.keys(data));

const formatPrice = (price, num) => {
  return `${price.toFixed(num)}`;
};

const formatPercentageChange = (change) => {
  // console.log(typeof change);
  // console.log(change);
  return `${change > 0 ? "+ " : " "}${change.toFixed(5)} %`;
};

const emoji = {
  "": "",
  up: "🚀",
  down: "🔻",
};

const dropdown = {
  "1d": "15m",
  "5d": "90m",
  "1mo": "1d",
};
const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingBottom: "50px",
  },
});
// let params = "EURUSD=X,CAD=X,GBPUSD=X,EURCAD=X";

function ForexPage() {
  const [stonks, setStonks] = useState([]);
  const [range, setRange] = useState("1d");
  const classes = useStyles();

  let navigate = useNavigate();
  useEffect(() => {
    const ws = new WebSocket("wss://streamer.finance.yahoo.com");
    protobuf.load("./YPricingData.proto", (error, root) => {
      if (error) {
        console.log("error");
      }

      const Yaticker = root.lookupType("yaticker");

      ws.onopen = function open() {
        console.log("connected");
        ws.send(
          JSON.stringify({
            subscribe: Object.keys(data),
          })
        );
      };

      ws.onclose = function close() {
        console.log("disconnected");
      };

      ws.onmessage = function incoming(message) {
        const next = Yaticker.decode(new Buffer(message.data, "base64"));
        // console.log("component rendered ");
        setStonks((current) => {
          let stonk = current.find((stonk) => stonk.id === next.id);
          if (stonk) {
            return current.map((stonk) => {
              if (stonk.id === next.id) {
                return {
                  ...next,
                  direction:
                    stonk.change > 0
                      ? "up"
                      : stonk.change < 0
                      ? "down"
                      : stonk.direction,
                };
              }
              return stonk;
            });
          } else {
            return [
              ...current,
              {
                ...next,
                direction: "",
              },
            ];
          }
        });
      };
    });
  }, []);

  return (
    <>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <select
          className="custom-select"
          onChange={(e) => {
            setRange(e.target.value);
          }}
        >
          <option value="1d">1 day</option>
          <option value="5d">5 day</option>
        </select>
      </div>

      <br />
      {/* <div className="symbol"> */}
      <Grid
        container
        spacing={4}
        className={classes.gridContainer}
        justify="center"
      >
        {stonks.map((stonk) => (
          <div
            className="stonk"
            key={stonk.id}
            onClick={(e) => {
              navigate(`/forex/${"frx" + stonk.id.replace("=X", "")}`);
            }}
          >
            <img
              src={`https://etoro-cdn.etorostatic.com/market-avatars/${data[
                stonk.id
              ]
                .toLowerCase()
                .replace("/", "-")}/70x70.png`}
              alt={stonk.id}
            />
            <h2>{data[stonk.id]}</h2>
            <br />
            <h2 className={stonk.direction} style={{ textAlign: "center" }}>
              {formatPrice(stonk.price, 5)}
              {`  (${formatPercentageChange(stonk.changePercent)})`}
              {emoji[stonk.direction]}
            </h2>
            <div className="chart" style={{ align: "center" }}>
              <StaticChart
                className={stonk.direction}
                symbol={stonk.id}
                interval={dropdown[range]}
                range={range}
                direction={stonk.direction}
              />
            </div>
          </div>
        ))}
        {/* </div> */}
      </Grid>
    </>
  );
}

export default ForexPage;
