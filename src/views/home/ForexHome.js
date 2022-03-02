import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { Box } from "@mui/system";
import "./Home.css";
import SearchBar from "../../components/searchbar";
import ForexSearchBar from "../../components/ForexSearchBar";
import CardFilter from "../../components/card-filter";
import ForexCard from "../../components/card";
import News from "../../components/news-slider";
import Box from "@mui/material/Box";
import MiniDrawer from "../../components/sidebar";

// import Data from "../../components/Data.json";

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

function Home() {
  const classes = useStyles();

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1 }} style={{ overflow: "auto" }}>
        <div className="main-container">
          <div className="header">
            <p className="title">TRex</p>
            <div
              className="search"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <ForexSearchBar />
            </div>
          </div>
          <div className="sidebar"></div>
          <div className="content">
            <div className="content-title">
              <div className="content-title left">
                <p>Forex</p>
              </div>
              <div className="content-title right">
                <CardFilter />
              </div>
            </div>

            <Grid
              container
              spacing={4}
              className={classes.gridContainer}
              justify="center"
            >
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
                <ForexCard />
                <ForexCard />
                <ForexCard />
                <ForexCard />
                <ForexCard />
                <ForexCard />
                <ForexCard />
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={4}
              className={classes.gridContainer}
              justify="center"
            >
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={4}
              className={classes.gridContainer}
              justify="center"
            >
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ForexCard />
              </Grid>
            </Grid>

            <div className="news-slider">
              <News />
            </div>
          </div>

          <div className="footer">
            <p>Footer info</p>
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default Home;
