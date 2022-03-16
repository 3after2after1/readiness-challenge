import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import Avatar from "@mui/material/Avatar";
import StaticChart3 from "./StaticChart3";
import IconButton from "@mui/material/IconButton";

const CardHolder = () => {
  return (
    <Card
      id="forex-card-box"
      sx={{
        width: 350,
        height: 600,
        margin: "2px 0 0 0 ",
      }}
    >
      <CardHeader title="AUD/CAD" />
      <img src="https://etoro-cdn.etorostatic.com/market-avatars/aud-cad/70x70.png" />
      <StaticChart3 />
    </Card>
  );
};

export default CardHolder;
