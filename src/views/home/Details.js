import React from "react";
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
import Container from "@mui/material/Box";

//apply CSS styling to material-ui components

function Details() {
 

  return (
    <div className="main-container-details">

      <div className="content">
        <div className="content-title-details">
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

          <div className="content-title-right-icon">
          <CardDetailsAdd />
          </div>
        </div>

        <Container>
          <DetailsPage />
        </Container>

        <Container>
          <DetailsStats />
        </Container>
      </div>
    </div>
    
    
  );
}

export default Details;
