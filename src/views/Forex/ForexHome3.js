import React from "react";
import "./Home.css";
import { makeStyles } from "@material-ui/core/styles";
import CardFilter from "./card-filter";
import ForexSearchBar from "./ForexSearchBar";
import Card from "./Card";
const useStyles = makeStyles({
  root: {
    minWidth: 300,
    borderRadius: 300,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});

function Home() {
  const classes = useStyles();

  return (
    <div className="main-container">
      <div className="content">
        <div className="content-title">
          <div className="content-title left">
            <ForexSearchBar />
          </div>
          <div className="content-title right">
            <CardFilter />
          </div>
        </div>

        <div className="card-content">
          <div
            id="forex-box"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <div style={{ height: "400px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
