import React from "react";
import "./Details.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DetailsPage from "../../components/card-details";
import CardDetailsAdd from "../../components/card-details-add";
import { Box } from "@mui/system";
import DetailsComment from "../../components/card-details-comment";
import DetailsStats from "../../components/card-details-stats";

//apply CSS styling to material-ui components
const useStyles = makeStyles({
  gridContainer: {
    // paddingLeft: "10px",
    // paddingRight: "20px",
    // paddingBottom: "50px",
    display:"flex",
   
  },
  filterContainer: {
    paddingRight: "50px",
  },
});

function Details() {
  const classes = useStyles();

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
    
    <Box>
    <div className="main-container">
      
      <div className="header">
        <p className="title"> T-REX </p>
      </div>
      <div className="sidebar"></div>

      <div className="content">
        <div className="content-title">
          <div className="content-title-left">
            <div className="icon-company" id="icon-company">Image</div>
            <div className="company-box">
              <column>
              <row>
              <div id="company-name" className="company-name">AAPL | APPLE</div>
              </row>
              <row>
                <div className="company-box">
                  <span className="currency-price" id="currency-price">188.99</span>
                  <span className="currency" id="currency">USD </span>
                  <span className="currency-volatality" id="currency-volatality"> 0.24(0.14%)</span>
                </div>
              </row>
              </column>
              </div>
          </div>

          <div className="content-title right">
          <CardDetailsAdd />
          </div>
          
        </div>

        <Grid
          container
          spacing={3}
          className={classes.gridContainer}
          justify="center"
        >
          <Grid item xs={10} md={7}>
            <DetailsPage />
          </Grid>
          <Grid item xs={10} md={3}>
            <DetailsComment />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={4}
          className={classes.gridContainer}
          justify="center"
        >
          <Grid item xs={10}sm={10} md={7}>
            <DetailsComment />
          </Grid>
          <Grid item sm={10}xs={6} md={3}>
            <DetailsStats />
          </Grid>
         
        </Grid>
      </div>
      <div className="footer">
        <p>footer info</p>
      </div>
    </div>
    </Box>
    </ div>
  );
}

export default Details;
