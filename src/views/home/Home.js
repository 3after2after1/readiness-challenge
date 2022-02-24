import React from "react";
import "./Home.css";
import CardFilter from "../../components/card-filter";
import ForexCard from "../../components/card";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//apply CSS styling to material-ui components 
const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingBottom: '50px'
  },
  filterContainer:{
    paddingRight: '50px',
  }
});

function Home() {
  const classes = useStyles();

  return (
    <div className="main-container">
      <div className="header">
        <p className="title"> title here </p>
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
      </div>

      <div className="news">
        <p>footer info</p>
      </div>

      <div className="footer">
        <p>footer info</p>
      </div>
    </div>
  );
}

export default Home;
