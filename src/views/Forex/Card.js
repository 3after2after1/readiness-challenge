import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import Avatar from "@mui/material/Avatar";
import StaticChart3 from "./StaticChart3";
import IconButton from "@mui/material/IconButton";
import { Box, Typography } from "@mui/material";

const CardHolder = () => {
  return (
    <Card
      id="forex-card-box"
      sx={{
        width: 300,
        height: 400,
        margin: "10px 0 10px 0 ",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      }}
    >
      <Box
        style={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
          backgroundColor: "#023020",
        }}
      >
        <Box style={{ paddingRight: "20px" }}>
          <img src="https://etoro-cdn.etorostatic.com/market-avatars/aud-cad/70x70.png" />
        </Box>
        <Typography
          id=""
          variant="h4"
          // component="div"
          sx={{
            fontFamily: "Bree Serif",
            color: "white",
            fontWeight: "",
          }}
        >
          AUD/CAD
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#023020",
          padding: "20px 10px 20px 10px",
        }}
      >
        <Typography
          id=""
          variant="h4"
          // component="div"
          sx={{
            fontFamily: "Bree Serif",
            color: "white",
            fontWeight: "",
          }}
        >
          $10.00
        </Typography>
      </Box>
      <StaticChart3 />
    </Card>
  );
};

export default CardHolder;
