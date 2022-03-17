import React from "react";
import "./Home.css";
import { makeStyles } from "@material-ui/core/styles";
import CardFilter from "./card-filter";
import ForexSearchBar from "./ForexSearchBar";
import Card from "./Card";
import { Box } from "@mui/material";
// const useStyles = makeStyles({
//   root: {
//     minWidth: 300,
//     borderRadius: 300,
//   },
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   title: {
//     fontSize: 20,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

function Home() {
  // const classes = useStyles();

  return (
    // <div className="main-container">
    <Box id="main-container-forexHome" style={{ backgroundColor: "#f9f7f7" }}>
      {/* <div className="content-title">
        <div className="content-title left">
          <ForexSearchBar />
        </div>
        <div className="content-title right">
          <CardFilter />
        </div>
      </div> */}
      <Box
        id="searchandfilterForex"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            id="searchForexHome"
            style={{
              padding: "20px 10px 20px 10px",
              width: "300px",
            }}
          >
            <ForexSearchBar />
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            id="filterForexHome"
            style={{
              padding: "0px 10px 20px 10px",
              display: "flex",
              justifyContent: "end",
              width: "300px",
            }}
          >
            <CardFilter />
          </Box>
        </Box>
      </Box>

      <Box id="contentForexHome">
        <Box
          id="forex-content"
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
        </Box>
      </Box>
    </Box>
    // </div>
  );
}

export default Home;
