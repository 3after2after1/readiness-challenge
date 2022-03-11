import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../config/cryptoApi";
// import "../App.css";

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins());
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "30%",
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "black",
      textDecoration: "none",
      backgroundColor: "white",
      paddingTop: "0.4rem",
      boxShadow:
        "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      margin: "1rem",
      borderRadius: "5px",
      paddingBottom: "0.4rem",
    },
  }));
  const classes = useStyles();
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <div className={classes.carouselItem}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          &nbsp;
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              fontFamily: "Bree Serif",
            }}
          >
            {coin.name}
          </span>
          &nbsp;
          <span
            style={{
              paddingLeft: "0.5rem",
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontSize: "1.2rem",
              fontWeight: "500",
              textAlign: "center",
              fontFamily: "Bree Serif",
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 1,
    },
    390: {
      items: 2,
    },
    730: {
      items: 3,
    },
    1024: {
      items: 4,
    },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
