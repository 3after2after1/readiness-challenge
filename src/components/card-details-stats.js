import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default function CardDetailsStats({ description }) {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardMedia
        component="img"
        height="100"
        image="/static/images/cards/paella.jpg"
        alt="Insert stats details"
      />
      <p>{description ? description : "loading..."}</p>
    </Card>
  );
}
