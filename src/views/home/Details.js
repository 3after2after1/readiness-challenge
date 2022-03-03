import React, { useEffect, useState } from "react";
import "./Details.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DetailsPage from "../../components/card-details";
import CardDetailsAdd from "../../components/card-details-add";
import { Box } from "@mui/system";
import DetailsComment from "../../components/card-details-comment";
import DetailsStats from "../../components/card-details-stats";
import DetailsStatsContent from "../../components/details-stats-details";
import Footer from "../../components/Footer";
import { getForexInfo } from "../../utils/scrape-forex-info";

//apply CSS styling to material-ui components
const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "1rem",
    paddingRight: "6rem",
    // paddingBottom: "50px",
    // display:"flex",
  },
  // filterContainer: {
  //   paddingRight: "50px",
  // },
});

function Details() {
  const classes = useStyles();
  const [instrumentInfo, setInstrumentInfo] = useState({});

  useEffect(() => {
    // TODO: set if market is forex !
    getForexInfo("gbp", "usd").then((data) => {
      console.log("hi", data);
      setInstrumentInfo(data);
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Box>
        <div className="main-container-details">
          <div className="header">Trex</div>

          <div className="content">
            <div className="content-title-details">
              <div className="content-title-left">
                <div className="icon-company" id="icon-company">
                  Image
                </div>
                <div className="company-box">
                  <column>
                    <row>
                      <div id="company-name" className="company-name">
                        AAPL | APPLE
                      </div>
                    </row>
                    <row>
                      <div className="company-box">
                        <span className="currency-price" id="currency-price">
                          188.99
                        </span>
                        <span className="currency" id="currency">
                          USD{" "}
                        </span>
                        <span
                          className="currency-volatality"
                          id="currency-volatality"
                        >
                          {" "}
                          0.24(0.14%)
                        </span>
                      </div>
                    </row>
                  </column>
                </div>
              </div>

              <div className="content-title-right-icon">
                <CardDetailsAdd />
              </div>
            </div>

            <Grid
              container
              spacing={3}
              className={classes.gridContainer}
              justify="center"
            >
              <Grid item xs={10} sm={10} md={8}>
                <DetailsPage />
              </Grid>
              <Grid item sm={10} xs={10} md={3}>
                <DetailsComment />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={3}
              className={classes.gridContainer}
              justify="center"
            >
              <Grid item xs={10} sm={10} md={8}>
                <DetailsStatsContent />
              </Grid>
              <Grid item sm={10} xs={10} md={3}>
                <DetailsStats />
              </Grid>
            </Grid>
          </div>

          <div classname="footer-content">
            <Footer />
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Details;
