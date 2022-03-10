import React from "react";
import Carousel from "../component/Carousel";
import CoinTable from "../component/CoinTable";
import NewsPage from "./NewsPage";

import { Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: 250,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

const CryptoPage = () => {
  const classes = useStyles();
  return (
    <div style={{ overflowX: "hidden" }}>
      <Container style={{ marginTop: "1rem" }}>
        <Carousel />
      </Container>
      <CoinTable />
      {/* <Container style={{ marginTop: "1rem" }}> */}
      <div>
        <NewsPage market={"crypto"} />
      </div>
      {/* </Container> */}
    </div>
  );
};

export default CryptoPage;
