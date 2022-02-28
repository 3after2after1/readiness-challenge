import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    borderRadius: 300,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function ForexCard() {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo"></Avatar>}
        action={
          <IconButton aria-label="add to watchlist">
            <StarBorderIcon />
          </IconButton>
        }
        title="What forex"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Insert chart"
      />
    </Card>
  );
}
