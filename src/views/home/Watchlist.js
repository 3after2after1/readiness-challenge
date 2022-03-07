import React from "react";
import "./Home.css";
import CardFilter from "../../components/card-filter";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WatchlistCard from "../../components/card-watchlist";

//apply CSS styling to material-ui components
const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingBottom: "50px",
  },
  filterContainer: {
    paddingRight: "50px",
  },
});

function Watchlist() {
  const classes = useStyles();

  return (
    <div className="main-container">
      <div className="header">
        <p className="title"> TREX </p>
      </div>
      <div className="sidebar"></div>

      <div className="content">
        <div className="content-title">
          <div className="content-title left">
            <p>Watchlist</p>
          </div>
          <div className="content-title right">
           
          </div>
        </div>

        <Grid
          container
          spacing={4}
          className={classes.gridContainer}
          justify="center"
        >
          <Grid item xs={12} sm={6} md={2}>
            <WatchlistCard />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <WatchlistCard />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <WatchlistCard />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <WatchlistCard />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <WatchlistCard />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={4}
          className={classes.gridContainer}
          justify="center"
        >
          <Grid item xs={12} sm={6} md={2}>
            <WatchlistCard />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <WatchlistCard />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <WatchlistCard />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <WatchlistCard />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <WatchlistCard />
          </Grid>
        </Grid>
      </div>

      
    </div>
  );
}

export default Watchlist;
